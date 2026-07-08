import React, { useState, useCallback } from 'react';
import OasisModal from './OasisModal';

const API_URL = 'https://api.web4.oasisomniverse.one';
const SESSION_KEY = 'oasis_session';

function loadSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; }
}

export default function AvatarConnect({ onLogin, onLogout, sessionKey = SESSION_KEY, apiUrl = API_URL }) {
  const [session, setSession] = useState(loadSession);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const doLogin = useCallback(async () => {
    if (!username || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true); setError('');
    try {
      const { OASISClient } = await import('@oasisomniverse/web4-api');
      const oasis = new OASISClient({ baseUrl: apiUrl });
      const result = await oasis.auth.login({ username, password });
      const karma = await oasis.karma.getKarmaForAvatar({ avatarId: result.avatarId });
      const sess = { avatarId: result.avatarId, username, karma: karma.total ?? 0 };
      sessionStorage.setItem(sessionKey, JSON.stringify(sess));
      setSession(sess); setOpen(false);
      onLogin?.(sess);
    } catch (e) {
      setError(e?.message ?? 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }, [username, password, apiUrl, sessionKey, onLogin]);

  const doLogout = useCallback(() => {
    sessionStorage.removeItem(sessionKey);
    setSession(null);
    onLogout?.();
  }, [sessionKey, onLogout]);

  if (session) {
    return (
      <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(0,200,255,.08)', border:'1px solid rgba(0,200,255,.2)', borderRadius:999, padding:'6px 14px 6px 10px', fontSize:13 }}>
        <span style={{ fontSize:18 }}>👤</span>
        <span style={{ color:'#fff', fontWeight:600 }}>{session.username}</span>
        <span style={{ color:'#00c8ff', fontFamily:"'Orbitron',sans-serif", fontSize:11 }}>⚡ {session.karma ?? 0}</span>
        <button onClick={doLogout} style={{ background:'none', border:'1px solid rgba(255,100,100,.3)', color:'#ff8080', borderRadius:6, fontSize:11, padding:'3px 8px', cursor:'pointer', marginLeft:4 }}>Logout</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ background:'linear-gradient(135deg,#00c8ff,#0080ff)', border:'none', borderRadius:8, color:'#fff', fontFamily:"'Orbitron',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'.08em', padding:'9px 18px', cursor:'pointer' }}>
        Beam In
      </button>

      <OasisModal open={open} onClose={() => setOpen(false)} title="Beam In">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {error && <div style={{ background:'rgba(255,80,80,.12)', border:'1px solid rgba(255,80,80,.3)', color:'#ff6b6b', borderRadius:8, padding:'10px 14px', fontSize:13 }}>{error}</div>}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:11, fontWeight:600, letterSpacing:'.06em', color:'#7a9bbf', textTransform:'uppercase' }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="yourusername" autoComplete="username"
              style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(0,200,255,.2)', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:14, outline:'none' }} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:11, fontWeight:600, letterSpacing:'.06em', color:'#7a9bbf', textTransform:'uppercase' }}>Password</label>
            <div style={{ position:'relative' }}>
              <input value={password} onChange={e => setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password"
                onKeyDown={e => e.key === 'Enter' && doLogin()}
                style={{ width:'100%', background:'rgba(255,255,255,.05)', border:'1px solid rgba(0,200,255,.2)', borderRadius:8, padding:'10px 44px 10px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }} />
              <button onClick={() => setShowPwd(v => !v)} type="button" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, padding:0, lineHeight:1 }}>
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button onClick={doLogin} disabled={loading}
            style={{ background:'linear-gradient(135deg,#00c8ff,#0080ff)', border:'none', borderRadius:8, color:'#fff', fontFamily:"'Orbitron',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'.08em', padding:12, cursor:'pointer', opacity: loading ? .5 : 1 }}>
            {loading ? 'Connecting…' : 'Beam In'}
          </button>
        </div>
      </OasisModal>
    </>
  );
}
