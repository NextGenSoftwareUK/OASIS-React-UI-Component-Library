import { useState } from 'react';

const INITIAL = [
  { id: '1', name: 'Ethereum', icon: '⟠', color: '#627eea', type: 'Blockchain', description: 'Connect your Ethereum wallet (MetaMask, WalletConnect).', connected: false },
  { id: '2', name: 'Solana', icon: '◎', color: '#9945ff', type: 'Blockchain', description: 'Connect your Solana wallet (Phantom, Solflare).', connected: false },
  { id: '3', name: 'EOSIO', icon: '🔮', color: '#443f54', type: 'Blockchain', description: 'Connect via EOSIO for high-speed transactions.', connected: false },
  { id: '4', name: 'Holochain', icon: '⬡', color: '#00e5be', type: 'P2P Network', description: 'Peer-to-peer data storage on Holochain.', connected: false },
  { id: '5', name: 'The Graph', icon: '📊', color: '#6f4cff', type: 'Indexer', description: 'Query blockchain data with The Graph protocol.', connected: false },
];

export function Providers() {
  const [providers, setProviders] = useState(INITIAL);
  function toggle(id) { setProviders(l => l.map(x => x.id === id ? { ...x, connected: !x.connected } : x)); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🔗 Providers</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Connect blockchain providers to your OASIS avatar.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {providers.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, background: p.connected ? 'rgba(72,220,130,.03)' : 'rgba(255,255,255,.04)', border: `1px solid ${p.connected ? 'rgba(72,220,130,.3)' : 'rgba(0,200,255,.12)'}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 26, flexShrink: 0, color: p.color }}>{p.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff', marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: '#5ba8ff', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{p.type}</div>
              <div style={{ fontSize: 12, color: '#7a9bbf' }}>{p.description}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.connected ? '#48dc82' : '#4a6a88', boxShadow: p.connected ? '0 0 6px #48dc82' : undefined }} />
              <button onClick={() => toggle(p.id)} style={{ background: p.connected ? 'rgba(255,80,80,.15)' : 'linear-gradient(135deg,#00c8ff,#0080ff)', border: p.connected ? '1px solid rgba(255,80,80,.3)' : 'none', borderRadius: 7, color: p.connected ? '#ff6b6b' : '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.06em', padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{p.connected ? 'Disconnect' : 'Connect'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
