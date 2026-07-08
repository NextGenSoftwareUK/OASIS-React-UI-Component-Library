import { useState } from 'react';

const METRICS = [{ label: 'Throughput', value: '4.2 TB/s' }, { label: 'Latency', value: '0.3ms' }, { label: 'Uptime', value: '99.98%' }];
const NODES = [
  { id: '1', name: 'ONODE Alpha — US East', status: 'active', latency: 12 },
  { id: '2', name: 'ONODE Beta — EU West', status: 'active', latency: 28 },
  { id: '3', name: 'ONODE Gamma — Asia Pacific', status: 'idle', latency: 55 },
];

export function HyperDrive() {
  const [active, setActive] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🚀 HyperDrive</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Quantum-speed data layer for the OASIS Omniverse.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: active ? 'rgba(0,200,255,.05)' : 'rgba(255,255,255,.04)', border: `1px solid ${active ? 'rgba(0,200,255,.4)' : 'rgba(0,200,255,.12)'}`, borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 28 }}>{active ? '⚡' : '💤'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#7a9bbf', textTransform: 'uppercase', letterSpacing: '.06em' }}>HyperDrive Status</div>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 16, color: active ? '#00c8ff' : '#7a9bbf', marginTop: 2 }}>{active ? 'ACTIVE' : 'OFFLINE'}</div>
        </div>
        <button onClick={() => setActive(a => !a)} style={{ background: active ? 'rgba(255,80,80,.2)' : 'linear-gradient(135deg,#00c8ff,#0080ff)', border: active ? '1px solid rgba(255,80,80,.35)' : 'none', borderRadius: 8, color: active ? '#ff6b6b' : '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: '10px 20px', cursor: 'pointer' }}>{active ? 'Disengage' : 'Engage'}</button>
      </div>
      {active && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {METRICS.map(m => (
              <div key={m.label} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.1)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 20, color: '#00c8ff', fontWeight: 600 }}>{m.value}</div>
                <div style={{ fontSize: 11, color: '#7a9bbf', marginTop: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, color: '#7a9bbf', letterSpacing: '.06em', textTransform: 'uppercase' }}>Connected Nodes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NODES.map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(0,200,255,.07)', borderRadius: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.status === 'active' ? '#48dc82' : '#7a9bbf', boxShadow: n.status === 'active' ? '0 0 6px #48dc82' : undefined, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, color: '#e0f0ff' }}>{n.name}</div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: '#7a9bbf' }}>{n.latency}ms</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
