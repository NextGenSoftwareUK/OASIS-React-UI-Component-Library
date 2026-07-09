import { useState } from 'react';

const INITIAL = [
  { id: '1', name: 'OLAND', description: 'Virtual land management and terraforming in the OASIS.', category: 'Metaverse', icon: '🌍', karma: 200, launched: false },
  { id: '2', name: 'OMARKET', description: 'Decentralised marketplace for NFTs and digital goods.', category: 'Commerce', icon: '🛒', karma: 150, launched: false },
  { id: '3', name: 'OCHAT', description: 'Encrypted peer-to-peer messaging on the ONET.', category: 'Social', icon: '💬', karma: 80, launched: false },
  { id: '4', name: 'OQUESTS', description: 'Daily quests and challenges for karma rewards.', category: 'Gaming', icon: '⚔️', karma: 300, launched: false },
];

export function OApp() {
  const [oapps, setOapps] = useState(INITIAL);
  const [search, setSearch] = useState('');
  const filtered = oapps.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()));
  function toggle(id) { setOapps(l => l.map(x => x.id === id ? { ...x, launched: !x.launched } : x)); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>📱 OApps</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Decentralised apps built on the OASIS network.</p>
      </div>
      <input style={{ width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search OApps…" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(a => (
          <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.12)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff', marginBottom: 3 }}>{a.name}</div>
              <div style={{ fontSize: 11, color: '#5ba8ff', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>{a.category}</div>
              <div style={{ fontSize: 12, color: '#7a9bbf', lineHeight: 1.5 }}>{a.description}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: '#48dc82', fontWeight: 600 }}>+{a.karma} karma</div>
              <button onClick={() => toggle(a.id)} style={{ background: a.launched ? 'rgba(255,80,80,.2)' : 'linear-gradient(135deg,#00c8ff,#0080ff)', border: a.launched ? '1px solid rgba(255,80,80,.4)' : 'none', borderRadius: 7, color: a.launched ? '#ff6b6b' : '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.08em', padding: '7px 16px', cursor: 'pointer' }}>{a.launched ? 'Quit' : 'Launch'}</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', color: '#4a6a88', fontSize: 14, padding: 32 }}>No OApps found.</div>}
      </div>
    </div>
  );
}
