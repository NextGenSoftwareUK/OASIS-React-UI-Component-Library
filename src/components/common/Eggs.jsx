import { useState } from 'react';

const RARITY_COLORS = { Common: '#7a9bbf', Rare: '#5ba8ff', Epic: '#b87fff', Legendary: '#ffb43c' };
const INITIAL = [
  { id: '1', name: 'Cosmic Egg', rarity: 'Legendary', hatchProgress: 75, hatched: false, reward: '+500 Karma Companion' },
  { id: '2', name: 'Forest Egg', rarity: 'Common', hatchProgress: 100, hatched: true, reward: 'Woodland Sprite' },
  { id: '3', name: 'Astral Egg', rarity: 'Epic', hatchProgress: 30, hatched: false, reward: '+200 Karma Companion' },
  { id: '4', name: 'Ocean Egg', rarity: 'Rare', hatchProgress: 55, hatched: false, reward: 'Sea Guardian' },
];

export function Eggs() {
  const [eggs, setEggs] = useState(INITIAL);
  function incubate(id) {
    setEggs(es => es.map(e => {
      if (e.id !== id) return e;
      const next = Math.min(100, e.hatchProgress + 25);
      return { ...e, hatchProgress: next, hatched: next >= 100 };
    }));
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🥚 Eggs</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Hatch eggs to discover rare OASIS companions and rewards.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16 }}>
        {eggs.map(e => (
          <div key={e.id} style={{ background: e.hatched ? 'rgba(255,180,60,.04)' : 'rgba(255,255,255,.04)', border: `1px solid ${e.hatched ? 'rgba(255,180,60,.3)' : 'rgba(0,200,255,.15)'}`, borderRadius: 12, padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px', border: `1px solid ${RARITY_COLORS[e.rarity]}44`, color: RARITY_COLORS[e.rarity] }}>{e.rarity}</div>
            <div style={{ fontSize: 40 }}>{e.hatched ? '🐣' : '🥚'}</div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, color: '#fff', textAlign: 'center' }}>{e.name}</div>
            {!e.hatched ? (
              <>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                  <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,.1)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${e.hatchProgress}%`, background: 'linear-gradient(90deg,#00c8ff,#0080ff)', borderRadius: 999, transition: 'width .4s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#7a9bbf' }}>{e.hatchProgress}%</div>
                </div>
                <button style={{ width: '100%', background: 'linear-gradient(135deg,#ffb43c,#ff8c00)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.08em', padding: 8, cursor: 'pointer' }} onClick={() => incubate(e.id)}>Incubate</button>
              </>
            ) : (
              <div style={{ fontSize: 12, color: '#ffb43c', fontWeight: 600, textAlign: 'center' }}>✨ {e.reward}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
