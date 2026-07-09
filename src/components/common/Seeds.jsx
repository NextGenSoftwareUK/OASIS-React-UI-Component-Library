import { useState } from 'react';

const RARITY_COLORS = { Common: '#7a9bbf', Rare: '#5ba8ff', Epic: '#b87fff', Legendary: '#ffb43c' };
const ICONS = { Spiritual: '✨', Health: '💚', Community: '🤝', Knowledge: '📖' };
const INITIAL = [
  { id: '1', name: 'Wisdom Seed', type: 'Spiritual', rarity: 'Rare', karma: 50, planted: false },
  { id: '2', name: 'Healing Seed', type: 'Health', rarity: 'Common', karma: 20, planted: false },
  { id: '3', name: 'Unity Seed', type: 'Community', rarity: 'Epic', karma: 150, planted: false },
  { id: '4', name: 'Truth Seed', type: 'Knowledge', rarity: 'Legendary', karma: 500, planted: false },
  { id: '5', name: 'Love Seed', type: 'Spiritual', rarity: 'Common', karma: 30, planted: false },
  { id: '6', name: 'Peace Seed', type: 'Community', rarity: 'Rare', karma: 75, planted: false },
];

export function Seeds() {
  const [seeds, setSeeds] = useState(INITIAL);
  function plant(id) { setSeeds(s => s.map(x => x.id === id ? { ...x, planted: true } : x)); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🌱 Seeds</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Plant seeds to grow your OASIS avatar and earn karma.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16 }}>
        {seeds.map(s => (
          <div key={s.id} style={{ background: s.planted ? 'rgba(72,220,130,.04)' : 'rgba(255,255,255,.04)', border: `1px solid ${s.planted ? 'rgba(72,220,130,.3)' : 'rgba(0,200,255,.15)'}`, borderRadius: 12, padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px', border: `1px solid ${RARITY_COLORS[s.rarity]}44`, color: RARITY_COLORS[s.rarity] }}>{s.rarity}</div>
            <div style={{ fontSize: 36 }}>{ICONS[s.type] ?? '🌱'}</div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff', textAlign: 'center' }}>{s.name}</div>
            <div style={{ fontSize: 11, color: '#7a9bbf' }}>{s.type}</div>
            <div style={{ fontSize: 12, color: '#48dc82', fontWeight: 600 }}>+{s.karma} Karma</div>
            {s.planted
              ? <div style={{ fontSize: 12, color: '#48dc82', fontWeight: 600 }}>🌿 Growing…</div>
              : <button style={{ width: '100%', background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.08em', padding: 8, cursor: 'pointer' }} onClick={() => plant(s.id)}>Plant Seed</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
