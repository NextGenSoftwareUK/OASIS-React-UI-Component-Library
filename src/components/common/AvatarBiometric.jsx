import React, { useState, useRef } from 'react';

const API_URL = 'https://api.web4.oasisomniverse.one';
const RECORD_MS = 5000;

const s = {
  root: { fontFamily: 'inherit', color: '#e0eeff', fontSize: 13 },
  card: { background: 'rgba(0,200,255,.07)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 12, padding: '16px 18px' },
  label: { fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7a9bbf', marginBottom: 8 },
  btn: (accent = '#00c8ff', disabled) => ({
    background: disabled ? 'rgba(255,255,255,.05)' : `linear-gradient(135deg,${accent},${accent}99)`,
    border: disabled ? '1px solid rgba(255,255,255,.1)' : 'none',
    borderRadius: 8, color: disabled ? '#4a6a8a' : '#fff',
    fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700,
    letterSpacing: '.06em', padding: '9px 18px', cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  progress: (pct) => ({
    height: 4, background: `rgba(0,200,255,.15)`, borderRadius: 2, marginTop: 10, overflow: 'hidden',
    position: 'relative',
  }),
  progressFill: (pct) => ({
    height: '100%', width: `${pct}%`,
    background: 'linear-gradient(90deg,#00c8ff,#0060ff)',
    borderRadius: 2, transition: 'width .1s linear',
  }),
  tabs: { display: 'flex', gap: 8, marginBottom: 14 },
  tab: (active) => ({
    background: active ? 'rgba(0,200,255,.15)' : 'none',
    border: active ? '1px solid rgba(0,200,255,.3)' : '1px solid rgba(0,200,255,.1)',
    borderRadius: 8, color: active ? '#00c8ff' : '#5a7a9a',
    fontSize: 11, fontWeight: active ? 700 : 400,
    padding: '5px 12px', cursor: 'pointer', letterSpacing: '.04em',
  }),
  err: { background: 'rgba(255,80,80,.12)', border: '1px solid rgba(255,80,80,.3)', color: '#ff8080', borderRadius: 8, padding: '9px 13px', fontSize: 12, marginTop: 10 },
  ok: { background: 'rgba(0,200,100,.1)', border: '1px solid rgba(0,200,100,.3)', color: '#40e080', borderRadius: 8, padding: '9px 13px', fontSize: 12, marginTop: 10 },
  hint: { fontSize: 11, color: '#4a6a8a', marginTop: 8 },
};

/**
 * AvatarBiometric — voice biometric enrolment and verification.
 *
 * Records 5 seconds of audio from the microphone using MediaRecorder, converts it
 * to base64 and sends it to the OASIS voice biometric endpoint.
 *
 * Standalone mode: pass `session` (with `jwtToken`) — the component calls the API directly.
 * Override mode: pass `onEnroll` / `onVerify` callbacks (e.g. to route through Cloud Functions).
 *
 * Props:
 *   session       { jwtToken } — from AvatarConnect (standalone mode)
 *   apiUrl        base URL override
 *   enrolled      boolean — whether the avatar already has a voice print enrolled
 *   onEnroll      async (audioBase64) => void — override enrol (Cloud Function pattern)
 *   onVerify      async (audioBase64) => { verified: boolean } — override verify
 *   onEnrolled    () => void — called after successful enrolment
 */
export function AvatarBiometric({ session, apiUrl = API_URL, enrolled: enrolledProp, onEnroll, onVerify, onEnrolled }) {
  const [mode,       setMode]       = useState('enroll'); // 'enroll' | 'verify'
  const [recording,  setRecording]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [busy,       setBusy]       = useState(false);
  const [error,      setError]      = useState(null);
  const [result,     setResult]     = useState(null); // null | 'enrolled' | 'verified' | 'failed'
  const [enrolled,   setEnrolled]   = useState(enrolledProp ?? false);

  const recRef    = useRef(null);
  const chunksRef = useRef([]);
  const timerRef  = useRef(null);

  const cleanup = () => {
    clearInterval(timerRef.current);
    if (recRef.current?.state === 'recording') recRef.current.stop();
  };

  const recordAudio = () => new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const rec = new MediaRecorder(stream);
      recRef.current = rec;
      chunksRef.current = [];

      rec.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // base64
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      };
      rec.onerror = reject;

      let elapsed = 0;
      setProgress(0); setRecording(true);
      timerRef.current = setInterval(() => {
        elapsed += 100;
        setProgress(Math.min(100, (elapsed / RECORD_MS) * 100));
        if (elapsed >= RECORD_MS) { clearInterval(timerRef.current); rec.stop(); }
      }, 100);
      rec.start();
    }).catch(reject);
  });

  const handleAction = async () => {
    setError(null); setResult(null);
    let audioBase64;
    try {
      audioBase64 = await recordAudio();
    } catch (e) {
      setRecording(false);
      setError(e.message?.includes('Permission') ? 'Microphone permission denied.' : `Microphone error: ${e.message}`);
      return;
    }
    setRecording(false); setBusy(true);
    try {
      if (mode === 'enroll') {
        if (onEnroll) {
          await onEnroll(audioBase64);
        } else {
          const { OASISClient } = await import('@oasisomniverse/web4-api');
          const c = new OASISClient({ baseUrl: apiUrl });
          if (session?.jwtToken) c.setToken(session.jwtToken);
          const form = new FormData();
          form.append('audio', new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/webm' }), 'voice.webm');
          const res = await c.http.request('POST', 'api/biometric/voice/enroll', { body: form });
          if (res.isError) throw new Error(res.message ?? 'Enrolment failed.');
        }
        setEnrolled(true); setResult('enrolled');
        onEnrolled?.();
      } else {
        let verified;
        if (onVerify) {
          const res = await onVerify(audioBase64);
          verified = res?.verified ?? false;
        } else {
          const { OASISClient } = await import('@oasisomniverse/web4-api');
          const c = new OASISClient({ baseUrl: apiUrl });
          if (session?.jwtToken) c.setToken(session.jwtToken);
          const form = new FormData();
          form.append('audio', new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/webm' }), 'voice.webm');
          const res = await c.http.request('POST', 'api/biometric/voice/verify', { body: form });
          verified = !res.isError && Boolean(res.result?.verified ?? !res.isError);
        }
        setResult(verified ? 'verified' : 'failed');
      }
    } catch (e) { setError(e.message); }
    finally { setBusy(false); setProgress(0); }
  };

  const isEnrolled = enrolled || enrolledProp;
  const disabled   = recording || busy;

  return (
    <div style={s.root}>
      <div style={s.card}>
        <div style={s.label}>Voice Biometric</div>

        {/* Mode tabs */}
        <div style={s.tabs}>
          <button style={s.tab(mode === 'enroll')} onClick={() => { setMode('enroll'); setResult(null); setError(null); }}>
            Enrol
          </button>
          <button style={s.tab(mode === 'verify')} onClick={() => { setMode('verify'); setResult(null); setError(null); }}>
            Verify
          </button>
        </div>

        {mode === 'enroll' && isEnrolled && (
          <p style={{ fontSize: 12, color: '#40a060', marginBottom: 12 }}>
            ✓ Voice print enrolled. Record again to re-enrol.
          </p>
        )}
        {mode === 'verify' && !isEnrolled && (
          <p style={{ fontSize: 12, color: '#c88040', marginBottom: 12 }}>
            Enrol a voice print first before verifying.
          </p>
        )}

        <button
          onClick={handleAction}
          disabled={disabled || (mode === 'verify' && !isEnrolled)}
          style={s.btn('#00c8ff', disabled || (mode === 'verify' && !isEnrolled))}
        >
          {recording ? `Recording… ${Math.round(progress)}%` : busy ? 'Processing…' : mode === 'enroll' ? '🎙 Record & Enrol (5s)' : '🎙 Record & Verify (5s)'}
        </button>

        {(recording || busy) && (
          <div style={s.progress(progress)}>
            <div style={s.progressFill(recording ? progress : 100)} />
          </div>
        )}

        {recording && <p style={s.hint}>Speak naturally for 5 seconds…</p>}
        {busy      && <p style={s.hint}>Sending to OASIS biometric engine…</p>}
      </div>

      {error && <div style={s.err}>{error}</div>}
      {result === 'enrolled'  && <div style={s.ok}>✓ Voice print enrolled successfully.</div>}
      {result === 'verified'  && <div style={s.ok}>✓ Identity verified.</div>}
      {result === 'failed'    && <div style={s.err}>✗ Voice did not match. Please try again.</div>}
    </div>
  );
}

export default AvatarBiometric;
