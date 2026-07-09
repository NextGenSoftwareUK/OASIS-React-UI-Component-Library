import { useState } from 'react';

const STATUS_COLORS = { available: '#7a9bbf', active: '#00c8ff', complete: '#48dc82' };
const INITIAL = [
  { id: '1', title: 'First Contact', description: 'Log into OASIS for the first time and explore the hub.', reward: 100, status: 'complete' },
  { id: '2', title: 'Karma Cultivator', description: 'Earn 500 karma through positive actions in the OASIS.', reward: 250, status: 'active' },
  { id: '3', title: 'NFT Hunter', description: 'Acquire your first rare NFT from the marketplace.', reward: 400, status: 'available' },
  { id: '4', title: 'Seed Planter', description: 'Plant 3 seeds and nurture them to full growth.', reward: 150, status: 'available' },
];
function statusLabel(s) { return s === 'available' ? 'Available' : s === 'active' ? 'In Progress' : 'Complete'; }

export function Mission() {
  const [missions, setMissions] = useState(INITIAL);
  function accept(id) { setMissions(l => l.map(x => x.id === id ? { ...x, status: 'active' } : x)); }
  function complete(id) { setMissions(l => l.map(x => x.id === id ? { ...x, status: 'complete' } : x)); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🎯 Missions</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Complete missions to earn karma and unlock rewards.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {missions.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: m.status === 'active' ? 'rgba(0,200,255,.05)' : m.status === 'complete' ? 'rgba(72,220,130,.04)' : 'rgba(255,255,255,.04)', border: `1px solid ${m.status === 'active' ? 'rgba(0,200,255,.35)' : m.status === 'complete' ? 'rgba(72,220,130,.25)' : 'rgba(0,200,255,.12)'}`, borderRadius: 12, padding: 16, opacity: m.status === 'complete' ? .7 : 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff', marginBottom: 4 }}>{m.title}</div>
              <div style={{ fontSize: 12, color: '#7a9bbf', lineHeight: 1.5 }}>{m.description}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: '#48dc82', fontWeight: 600 }}>+{m.reward} karma</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px', border: `1px solid ${STATUS_COLORS[m.status]}44`, color: STATUS_COLORS[m.status] }}>{statusLabel(m.status)}</div>
              {m.status === 'available' && <button onClick={() => accept(m.id)} style={{ background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, padding: '7px 16px', cursor: 'pointer' }}>Accept</button>}
              {m.status === 'active' && <button onClick={() => complete(m.id)} style={{ background: 'linear-gradient(135deg,#48dc82,#00aa55)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, padding: '7px 16px', cursor: 'pointer' }}>Complete</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
