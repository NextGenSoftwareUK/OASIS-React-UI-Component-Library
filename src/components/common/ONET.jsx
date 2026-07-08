import { useState } from 'react';

const STATS = [{ label: 'Peers', value: '2,847' }, { label: 'Speed', value: '1.2 Gb/s' }, { label: 'Encrypted', value: '100%' }];
const PEERS = [
  { id: '1', name: 'AvatarX_7291', location: 'New York, US', ping: 14 },
  { id: '2', name: 'StarKeeper_99', location: 'London, UK', ping: 32 },
  { id: '3', name: 'NeonRider_404', location: 'Tokyo, JP', ping: 67 },
];

export function ONET() {
  const [connected, setConnected] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🌐 ONET</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>The OASIS decentralised internet layer.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.04)', border: `1px solid ${connected ? 'rgba(72,220,130,.3)' : 'rgba(0,200,255,.12)'}`, borderRadius: 12, padding: 16 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: connected ? '#48dc82' : '#4a6a88', boxShadow: connected ? '0 0 10px #48dc82' : undefined, flexShrink: 0, transition: 'all .3s' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#7a9bbf', textTransform: 'uppercase', letterSpacing: '.06em' }}>ONET Connection</div>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 14, color: '#fff', marginTop: 3 }}>{connected ? 'Connected' : 'Disconnected'}</div>
        </div>
        <button onClick={() => setConnected(c => !c)} style={{ background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: '9px 18px', cursor: 'pointer' }}>{connected ? 'Disconnect' : 'Connect'}</button>
      </div>
      {connected && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.1)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 18, color: '#00c8ff', fontWeight: 600 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#7a9bbf', marginTop: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, color: '#7a9bbf', letterSpacing: '.06em', textTransform: 'uppercase' }}>Active Peers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PEERS.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(0,200,255,.07)', borderRadius: 8 }}>
                <div style={{ fontSize: 20 }}>👤</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: '#e0f0ff' }}>{p.name}</div><div style={{ fontSize: 11, color: '#4a6a88', marginTop: 2 }}>{p.location}</div></div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: '#48dc82' }}>{p.ping}ms</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
