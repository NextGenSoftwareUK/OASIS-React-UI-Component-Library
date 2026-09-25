import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://api.web4.oasisomniverse.one';

const TIER_LABELS = {
  1: 'Explorer', 2: 'Wanderer', 3: 'Tribe Member', 4: 'Contributor',
  5: 'Ally', 6: 'Guardian', 7: 'Elder', 8: 'Flame Keeper', 9: 'Sovereign / Founder',
};
const tierLabel = (level) => TIER_LABELS[level] ?? `Level ${level}`;

// ── Styles ──────────────────────────────────────────────────────────────────────────────
const s = {
  root: { fontFamily: 'inherit', color: '#e0eeff', fontSize: 13 },
  card: { background: 'rgba(0,200,255,.07)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 12, padding: '16px 18px', marginBottom: 12 },
  herzCard: { background: 'rgba(160,100,255,.1)', border: '1px solid rgba(160,100,255,.3)', borderRadius: 12, padding: '16px 18px', marginBottom: 12 },
  label: { fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7a9bbf', marginBottom: 4 },
  herzId: { fontFamily: "'Courier New',monospace", fontSize: 18, fontWeight: 700, color: '#c8aaff', letterSpacing: '.04em' },
  tier: { fontSize: 12, color: '#a080ff', marginTop: 4 },
  karma: { fontFamily: "'Orbitron',sans-serif", fontSize: 13, fontWeight: 700, color: '#00c8ff' },
  input: { width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '9px 13px', color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box' },
  btn: (accent = '#00c8ff') => ({ background: `linear-gradient(135deg,${accent},${accent}99)`, border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', padding: '8px 16px', cursor: 'pointer' }),
  btnGhost: { background: 'none', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, color: '#7a9bbf', fontSize: 11, padding: '6px 12px', cursor: 'pointer' },
  err: { background: 'rgba(255,80,80,.12)', border: '1px solid rgba(255,80,80,.3)', color: '#ff8080', borderRadius: 8, padding: '9px 13px', fontSize: 12, marginBottom: 10 },
  ok: { background: 'rgba(0,200,100,.1)', border: '1px solid rgba(0,200,100,.3)', color: '#40e080', borderRadius: 8, padding: '9px 13px', fontSize: 12, marginBottom: 10 },
  row: { display: 'flex', alignItems: 'center', gap: 8 },
  divider: { borderTop: '1px solid rgba(160,100,255,.2)', marginTop: 12, paddingTop: 12 },
};

/**
 * HerzIdPanel — displays and manages the HerzID for a connected OASIS Avatar.
 *
 * Standalone mode: pass `session` (from AvatarConnect) and the component handles
 * everything via the OASIS API directly.
 *
 * Override mode (e.g. lightseed Cloud Functions): pass `herzId`, `karmaScore`, etc.
 * as display props and supply `onRegister`, `onKarmaSync`, `onVouch` callbacks.
 * The component owns UI state; the host owns the API calls.
 *
 * Props:
 *   session       { avatarId, jwtToken, username } — from AvatarConnect (standalone mode)
 *   apiUrl        base URL override
 *   herzId        current HerzID string (display / override mode)
 *   clearanceLevel current clearance level (display / override mode)
 *   countryCode   current country code (display / override mode)
 *   joinedAt      ISO date string (display / override mode)
 *   karmaScore    number (display / override mode)
 *   karmaSyncedAt ISO string (display / override mode)
 *   onRegister    async ({ countryCode, voucherHerzId }) — override registration
 *   onKarmaSync   async () => { karmaScore } — override karma sync
 *   onVouch       async (targetHerzId) — override vouch
 *   onUnlink      () => void — called after unlink (standalone clears local state; override handles externally)
 */
export function HerzIdPanel({
  session,
  apiUrl = API_URL,
  herzId: herzIdProp,
  clearanceLevel: clearanceProp,
  countryCode: countryProp,
  joinedAt: joinedProp,
  karmaScore: karmaProp,
  karmaSyncedAt: karmaSyncProp,
  onRegister,
  onKarmaSync,
  onVouch,
  onUnlink,
}) {
  // Local state — seeded from props, updated by API calls in standalone mode
  const [herzId,       setHerzId]       = useState(herzIdProp ?? null);
  const [clearance,    setClearance]    = useState(clearanceProp ?? null);
  const [country,      setCountry]      = useState(countryProp ?? null);
  const [joinedAt,     setJoinedAt]     = useState(joinedProp ?? null);
  const [karmaScore,   setKarmaScore]   = useState(karmaProp ?? null);
  const [karmaSynced,  setKarmaSynced]  = useState(karmaSyncProp ?? null);

  // Keep in sync with prop changes (override mode)
  useEffect(() => { if (herzIdProp     !== undefined) setHerzId(herzIdProp); },       [herzIdProp]);
  useEffect(() => { if (clearanceProp  !== undefined) setClearance(clearanceProp); },  [clearanceProp]);
  useEffect(() => { if (karmaProp      !== undefined) setKarmaScore(karmaProp); },     [karmaProp]);
  useEffect(() => { if (karmaSyncProp  !== undefined) setKarmaSynced(karmaSyncProp); },[karmaSyncProp]);

  const [busy,       setBusy]       = useState(false);
  const [error,      setError]      = useState(null);
  const [notice,     setNotice]     = useState(null);
  // Forms
  const [showRegForm,  setShowRegForm]  = useState(false);
  const [regCountry,   setRegCountry]   = useState('');
  const [regVoucher,   setRegVoucher]   = useState('');
  const [showVouch,    setShowVouch]    = useState(false);
  const [vouchTarget,  setVouchTarget]  = useState('');
  const [vouchDone,    setVouchDone]    = useState(false);

  const flash = (msg, isError = false) => {
    if (isError) setError(msg); else setNotice(msg);
    setTimeout(() => { setError(null); setNotice(null); }, 4000);
  };

  // ── Standalone helpers ──────────────────────────────────────────────────────────────
  const getClient = useCallback(async () => {
    const { OASISClient } = await import('@oasisomniverse/web4-api');
    const c = new OASISClient({ baseUrl: apiUrl });
    if (session?.jwtToken) c.setToken(session.jwtToken);
    return c;
  }, [apiUrl, session]);

  // Fetch HerzID profile on mount in standalone mode (no props provided)
  useEffect(() => {
    if (!session?.jwtToken || herzIdProp !== undefined) return;
    getClient().then(async c => {
      try {
        const res = await c.herzId.profile();
        if (!res.isError && res.result) {
          setHerzId(res.result.herzId);
          setClearance(res.result.clearanceLevel);
          setCountry(res.result.countryCode);
          setJoinedAt(res.result.joinedAt);
        }
        const kr = await c.karma.getKarmaForAvatar({ avatarId: session.avatarId });
        if (!kr.isError) setKarmaScore(kr.result?.karmaScore ?? null);
      } catch { /* best-effort */ }
    });
  }, [session, herzIdProp, getClient]);

  // ── Actions ────────────────────────────────────────────────────────────────────────
  const handleKarmaSync = async () => {
    setBusy(true); setError(null);
    try {
      if (onKarmaSync) {
        const res = await onKarmaSync();
        if (res?.karmaScore != null) { setKarmaScore(res.karmaScore); setKarmaSynced(new Date().toISOString()); }
      } else {
        const c = await getClient();
        const kr = await c.karma.getKarmaForAvatar({ avatarId: session?.avatarId });
        if (kr.isError) throw new Error(kr.message ?? 'Karma sync failed.');
        setKarmaScore(kr.result?.karmaScore); setKarmaSynced(new Date().toISOString());
      }
      flash('Karma synced.');
    } catch (e) { flash(e.message, true); }
    finally { setBusy(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      if (onRegister) {
        const res = await onRegister({ countryCode: regCountry.trim(), voucherHerzId: regVoucher.trim() || undefined });
        if (res) { setHerzId(res.herzId); setClearance(res.clearanceLevel); setCountry(res.countryCode); setJoinedAt(res.joinedAt); }
      } else {
        const c = await getClient();
        const res = await c.herzId.register({ countryCode: regCountry.trim(), voucherHerzId: regVoucher.trim() || undefined });
        if (res.isError || !res.result) throw new Error(res.message ?? 'Registration failed.');
        setHerzId(res.result.herzId); setClearance(res.result.clearanceLevel);
        setCountry(res.result.countryCode); setJoinedAt(res.result.joinedAt);
      }
      setShowRegForm(false); setRegCountry(''); setRegVoucher('');
      flash('HerzID registered.');
    } catch (e) { flash(e.message, true); }
    finally { setBusy(false); }
  };

  const handleVouch = async (e) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      if (onVouch) {
        await onVouch(vouchTarget.trim());
      } else {
        const c = await getClient();
        const res = await c.herzId.vouch({ herzId: vouchTarget.trim() });
        if (res.isError) throw new Error(res.message ?? 'Vouch failed.');
      }
      setVouchDone(true); setVouchTarget('');
      setTimeout(() => { setVouchDone(false); setShowVouch(false); }, 3000);
    } catch (e) { flash(e.message, true); }
    finally { setBusy(false); }
  };

  return (
    <div style={s.root}>
      {error  && <div style={s.err}>{error}</div>}
      {notice && <div style={s.ok}>{notice}</div>}

      {/* ── Karma row ────────────────────────────────────────────────────────────── */}
      {karmaScore != null && (
        <div style={{ ...s.row, marginBottom: 12 }}>
          <span style={s.karma}>⚡ {karmaScore.toLocaleString()} karma</span>
          <button onClick={handleKarmaSync} disabled={busy} style={s.btnGhost}>
            {busy ? '…' : 'sync'}
          </button>
          {karmaSynced && (
            <span style={{ fontSize: 11, color: '#4a6a8a' }}>
              {new Date(karmaSynced).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      {/* ── HerzID card ──────────────────────────────────────────────────────────── */}
      {herzId ? (
        <div style={s.herzCard}>
          <div style={s.label}>HerzID</div>
          <div style={s.herzId}>{herzId}</div>
          {clearance != null && <div style={s.tier}>{tierLabel(clearance)} ({clearance})</div>}
          {joinedAt && <div style={{ fontSize: 11, color: '#5a7a9a', marginTop: 6 }}>Joined {new Date(joinedAt).toLocaleDateString()}</div>}

          {/* Vouch section */}
          <div style={s.divider}>
            <button onClick={() => { setShowVouch(v => !v); setVouchDone(false); }} style={s.btnGhost}>
              {showVouch ? 'Cancel' : '+ Vouch for someone'}
            </button>
            {showVouch && !vouchDone && (
              <form onSubmit={handleVouch} style={{ ...s.row, marginTop: 10 }}>
                <input
                  value={vouchTarget}
                  onChange={e => setVouchTarget(e.target.value)}
                  placeholder="Their HerzID"
                  required
                  style={{ ...s.input, fontFamily: "'Courier New',monospace", fontSize: 12 }}
                />
                <button type="submit" disabled={busy} style={s.btn('#a060ff')}>
                  {busy ? '…' : 'Vouch'}
                </button>
              </form>
            )}
            {vouchDone && <p style={{ ...s.ok, marginTop: 8, marginBottom: 0 }}>✓ Vouch sent.</p>}
          </div>
        </div>
      ) : (
        /* ── Register form ──────────────────────────────────────────────────────── */
        <div style={s.card}>
          <div style={s.label}>HerzID</div>
          <p style={{ color: '#7a9bbf', fontSize: 12, margin: '6px 0 10px' }}>
            Register a HerzID to join the Enlightened Nations identity network.
            A voucher is required unless you are a Founder.
          </p>
          <button onClick={() => setShowRegForm(v => !v)} style={s.btnGhost}>
            {showRegForm ? 'Cancel' : '+ Register HerzID'}
          </button>
          {showRegForm && (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              <div>
                <div style={s.label}>Country code</div>
                <input value={regCountry} onChange={e => setRegCountry(e.target.value)}
                  placeholder="e.g. 052" required maxLength={3} style={s.input} />
              </div>
              <div>
                <div style={s.label}>Voucher HerzID <span style={{ textTransform: 'none', fontWeight: 400 }}>(optional for Founders)</span></div>
                <input value={regVoucher} onChange={e => setRegVoucher(e.target.value)}
                  placeholder="052·0·000·000·001·R" style={{ ...s.input, fontFamily: "'Courier New',monospace", fontSize: 12 }} />
              </div>
              <button type="submit" disabled={busy} style={s.btn('#a060ff')}>
                {busy ? 'Registering…' : 'Register HerzID'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default HerzIdPanel;
