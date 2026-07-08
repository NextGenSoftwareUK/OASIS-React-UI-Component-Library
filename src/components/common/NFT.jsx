import { useState } from 'react';

const RARITY_COLORS = { Common: '#7a9bbf', Rare: '#5ba8ff', Epic: '#b87fff', Legendary: '#ffb43c' };
const TABS = ['All', 'Avatar', 'Land', 'Item', 'Art'];
const NFTS = [
  { id: '1', name: 'Cosmic Warrior', rarity: 'Legendary', type: 'Avatar', karma: 500, image: '⚔️' },
  { id: '2', name: 'Forest Realm', rarity: 'Epic', type: 'Land', karma: 250, image: '🌲' },
  { id: '3', name: 'Quantum Blade', rarity: 'Rare', type: 'Item', karma: 100, image: '🗡️' },
  { id: '4', name: 'Nebula Portrait', rarity: 'Common', type: 'Art', karma: 30, image: '🎨' },
  { id: '5', name: 'Light Keeper', rarity: 'Epic', type: 'Avatar', karma: 200, image: '🌟' },
  { id: '6', name: 'Sky Citadel', rarity: 'Rare', type: 'Land', karma: 120, image: '🏰' },
];

export function NFT() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? NFTS : NFTS.filter(n => n.type === tab);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🖼️ NFTs</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Your OASIS non-fungible token collection.</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? 'rgba(0,200,255,.15)' : 'rgba(255,255,255,.05)', border: `1px solid ${tab === t ? '#00c8ff' : 'rgba(0,200,255,.2)'}`, borderRadius: 8, color: tab === t ? '#00c8ff' : '#7a9bbf', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', padding: '7px 16px', cursor: 'pointer' }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 14 }}>
        {filtered.map(n => (
          <div key={n.id} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.12)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 44 }}>{n.image}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px', border: `1px solid ${RARITY_COLORS[n.rarity]}44`, color: RARITY_COLORS[n.rarity] }}>{n.rarity}</div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, color: '#fff', textAlign: 'center' }}>{n.name}</div>
            <div style={{ fontSize: 11, color: '#7a9bbf' }}>{n.type}</div>
            <div style={{ fontSize: 12, color: '#48dc82', fontWeight: 600 }}>+{n.karma} karma</div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#4a6a88', padding: 32, fontSize: 14 }}>No NFTs in this category.</div>}
      </div>
    </div>
  );
}
