import { useState } from 'react';

const DIFF_COLORS = { Easy: '#48dc82', Medium: '#ffb43c', Hard: '#ff6b6b', Legendary: '#b87fff' };
const INITIAL = [
  { id: '1', title: 'Avatar Awakening', description: 'Complete your avatar profile and connect your first provider.', reward: 200, difficulty: 'Easy', accepted: true, completed: true },
  { id: '2', title: 'Karma Seeker', description: 'Earn 1000 karma through good deeds and OASIS contributions.', reward: 500, difficulty: 'Medium', accepted: true, completed: false },
  { id: '3', title: 'The NFT Collector', description: 'Acquire 5 unique NFTs across different categories.', reward: 1000, difficulty: 'Hard', accepted: false, completed: false },
  { id: '4', title: 'Omniverse Explorer', description: 'Visit every major hub location on the OASIS map.', reward: 2500, difficulty: 'Legendary', accepted: false, completed: false },
];

export function Quest() {
  const [quests, setQuests] = useState(INITIAL);
  function accept(id) { setQuests(l => l.map(x => x.id === id ? { ...x, accepted: true } : x)); }
  function complete(id) { setQuests(l => l.map(x => x.id === id ? { ...x, completed: true } : x)); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>⚔️ Quests</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Embark on quests to gain karma and rare rewards.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {quests.map(q => (
          <div key={q.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(255,255,255,.04)', border: `1px solid ${q.completed ? 'rgba(72,220,130,.2)' : q.accepted ? 'rgba(0,200,255,.4)' : 'rgba(0,200,255,.12)'}`, borderRadius: 12, padding: 16, opacity: q.completed ? .6 : 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 999, padding: '4px 10px', border: `1px solid ${DIFF_COLORS[q.difficulty]}44`, color: DIFF_COLORS[q.difficulty], whiteSpace: 'nowrap', flexShrink: 0 }}>{q.difficulty}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff', marginBottom: 4 }}>{q.title}</div>
              <div style={{ fontSize: 12, color: '#7a9bbf', lineHeight: 1.5, marginBottom: 6 }}>{q.description}</div>
              <div style={{ fontSize: 12, color: '#48dc82', fontWeight: 600 }}>+{q.reward} karma</div>
            </div>
            <div style={{ flexShrink: 0 }}>
              {q.completed ? <div style={{ fontSize: 13, color: '#48dc82', fontWeight: 600 }}>✅ Done</div>
                : !q.accepted ? <button onClick={() => accept(q.id)} style={{ background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, padding: '8px 16px', cursor: 'pointer' }}>Accept Quest</button>
                : <button onClick={() => complete(q.id)} style={{ background: 'linear-gradient(135deg,#48dc82,#00aa55)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, padding: '8px 16px', cursor: 'pointer' }}>Finish</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
