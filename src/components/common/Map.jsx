import { useState } from 'react';

const LOC_ICONS = { Hub: '🏛️', City: '🏙️', Nature: '🌲', 'Quest Zone': '⚔️' };
const LOCATIONS = [
  { id: '1', name: 'OASIS Hub Alpha', type: 'Hub', x: 20, y: 30, description: 'Central hub for OASIS operations and avatar registration.' },
  { id: '2', name: 'Neon City', type: 'City', x: 55, y: 20, description: 'A sprawling cyberpunk metropolis in the OASIS.' },
  { id: '3', name: 'Enchanted Forest', type: 'Nature', x: 75, y: 60, description: 'Ancient woodland teeming with rare seeds and creatures.' },
  { id: '4', name: 'Battle Grounds', type: 'Quest Zone', x: 35, y: 70, description: 'Arena for quests, challenges, and PvP competitions.' },
  { id: '5', name: 'Crystal Spire', type: 'Hub', x: 85, y: 35, description: 'Trading post and NFT marketplace in the sky.' },
];
const LEGEND = [{ icon: '🏙️', label: 'City' }, { icon: '🌲', label: 'Nature' }, { icon: '⚔️', label: 'Quest Zone' }, { icon: '🏛️', label: 'Hub' }];

export function Map() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🗺️ OASIS Map</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Explore the OASIS Omniverse.</p>
      </div>
      <div style={{ position: 'relative', height: 300, background: '#030d1a', border: '1px solid rgba(0,200,255,.2)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,200,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,.05) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {LOCATIONS.map(loc => (
          <div key={loc.id} onClick={() => setSelected(loc)} title={loc.name} style={{ position: 'absolute', left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)', cursor: 'pointer', fontSize: 22, outline: selected?.id === loc.id ? '2px solid #00c8ff' : undefined, outlineOffset: selected?.id === loc.id ? 3 : undefined, borderRadius: '50%' }}>
            {LOC_ICONS[loc.type] ?? '📍'}
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff' }}>{selected.name}</div>
          <div style={{ fontSize: 11, color: '#5ba8ff', textTransform: 'uppercase', letterSpacing: '.06em' }}>{selected.type}</div>
          <div style={{ fontSize: 12, color: '#7a9bbf', flex: 1 }}>{selected.description}</div>
          <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: '1px solid rgba(0,200,255,.3)', borderRadius: 7, color: '#00c8ff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, padding: '6px 14px', cursor: 'pointer' }}>Close</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {LEGEND.map(t => <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7a9bbf' }}><span>{t.icon}</span><span>{t.label}</span></div>)}
      </div>
    </div>
  );
}
