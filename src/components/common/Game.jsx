import { useState } from 'react';

const INITIAL = [
  { id: '1', name: 'Karma Wars', genre: 'Strategy', description: 'Battle other avatars for karma dominance in real-time.', players: 12450, karma: 50, icon: '⚔️', playing: false },
  { id: '2', name: 'Seed Garden', genre: 'Simulation', description: 'Grow and cultivate a virtual garden to earn seeds and karma.', players: 8900, karma: 30, icon: '🌱', playing: false },
  { id: '3', name: 'OASIS Racer', genre: 'Racing', description: 'Race across virtual worlds and earn speed karma.', players: 5600, karma: 40, icon: '🏎️', playing: false },
  { id: '4', name: 'NFT Quest', genre: 'RPG', description: 'An epic RPG adventure to discover legendary NFTs.', players: 22000, karma: 80, icon: '🗡️', playing: false },
];

export function Game() {
  const [games, setGames] = useState(INITIAL);
  function toggle(id) { setGames(l => l.map(x => x.id === id ? { ...x, playing: !x.playing } : x)); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🎮 Games</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Play games in the OASIS to earn karma and rewards.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
        {games.map(g => (
          <div key={g.id} style={{ background: g.playing ? 'rgba(0,200,255,.05)' : 'rgba(255,255,255,.04)', border: `1px solid ${g.playing ? 'rgba(0,200,255,.5)' : 'rgba(0,200,255,.12)'}`, borderRadius: 12, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 40 }}>{g.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#5ba8ff' }}>{g.genre}</div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff' }}>{g.name}</div>
            <div style={{ fontSize: 12, color: '#7a9bbf', lineHeight: 1.5, flex: 1 }}>{g.description}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11, color: '#7a9bbf' }}>👥 {g.players.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#48dc82', fontWeight: 600 }}>+{g.karma} karma/hr</div>
            </div>
            <button onClick={() => toggle(g.id)} style={{ background: g.playing ? 'rgba(255,80,80,.2)' : 'linear-gradient(135deg,#00c8ff,#0080ff)', border: g.playing ? '1px solid rgba(255,80,80,.35)' : 'none', borderRadius: 8, color: g.playing ? '#ff6b6b' : '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: 9, cursor: 'pointer', marginTop: 4 }}>{g.playing ? '⏹ Stop' : '▶ Play'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
