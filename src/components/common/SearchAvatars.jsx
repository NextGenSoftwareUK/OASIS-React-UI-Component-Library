import { useState } from 'react';
import { OASISClient } from '@oasisomniverse/web4-api';

export function SearchAvatars() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  async function search() {
    if (!query.trim()) return;
    setLoading(true); setError(''); setResults([]); setSearched(false);
    try {
      const oasis = new OASISClient({ baseUrl: 'https://api.web4.oasisomniverse.one' });
      const res = await oasis.avatar?.searchAvatars?.({ searchQuery: query });
      setResults(Array.isArray(res?.result) ? res.result : []);
      setSearched(true);
    } catch (e) { setError(e?.message ?? 'Search failed.'); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🔍 Search Avatars</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Find other OASIS avatars by username or name.</p>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input style={{ flex: 1, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none' }} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} placeholder="Search by username…" />
        <button onClick={search} disabled={loading || !query.trim()} style={{ background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: '10px 20px', cursor: 'pointer', opacity: loading || !query.trim() ? .4 : 1 }}>{loading ? '…' : 'Search'}</button>
      </div>
      {error && <div style={{ background: 'rgba(255,80,80,.12)', border: '1px solid rgba(255,80,80,.3)', color: '#ff6b6b', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>{error}</div>}
      {results.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.12)', borderRadius: 10 }}>
              <div style={{ fontSize: 28 }}>👤</div>
              <div style={{ flex: 1 }}><div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff' }}>{a.username}</div><div style={{ fontSize: 12, color: '#7a9bbf', marginTop: 2 }}>{a.firstName} {a.lastName}</div></div>
              <div style={{ fontSize: 12, color: '#48dc82', fontWeight: 600, whiteSpace: 'nowrap' }}>{a.karma} karma</div>
            </div>
          ))}
        </div>
      ) : searched && !loading ? (
        <div style={{ textAlign: 'center', color: '#4a6a88', fontSize: 14, padding: 24 }}>No avatars found for "{query}".</div>
      ) : null}
    </div>
  );
}
