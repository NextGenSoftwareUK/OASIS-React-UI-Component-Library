import { useState } from 'react';

const METRICS = [{ label: 'CPU', value: '18%' }, { label: 'RAM', value: '2.1 GB' }, { label: 'Storage', value: '47 GB' }, { label: 'Blocks', value: '12,450' }];
const LOGS = [
  { time: '09:42:01', level: 'info', message: 'ONODE started. Connecting to ONET…' },
  { time: '09:42:02', level: 'info', message: 'Connected to 12 peers.' },
  { time: '09:42:05', level: 'info', message: 'Block #12450 validated.' },
  { time: '09:42:08', level: 'warn', message: 'Peer ONODE-77 latency high: 340ms.' },
  { time: '09:42:12', level: 'info', message: 'Data sync complete. 100% coverage.' },
];
const LOG_COLORS = { info: '#00c8ff', warn: '#ffb43c', error: '#ff6b6b' };

export function ONODE() {
  const [running, setRunning] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>🖥️ ONODE</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Your personal OASIS node. Store, validate, and relay data.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,.04)', border: `1px solid ${running ? 'rgba(72,220,130,.3)' : 'rgba(255,80,80,.2)'}`, borderRadius: 8, padding: '10px 14px', fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: running ? '#48dc82' : '#ff6b6b' }}>{running ? '● Running' : '○ Stopped'}</div>
        <button onClick={() => setRunning(r => !r)} style={{ background: running ? 'rgba(255,80,80,.2)' : 'linear-gradient(135deg,#00c8ff,#0080ff)', border: running ? '1px solid rgba(255,80,80,.35)' : 'none', borderRadius: 8, color: running ? '#ff6b6b' : '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: '10px 20px', cursor: 'pointer' }}>{running ? 'Stop Node' : 'Start Node'}</button>
      </div>
      {running && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {METRICS.map(m => (
              <div key={m.label} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.1)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 16, color: '#00c8ff', fontWeight: 600 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: '#7a9bbf', marginTop: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, color: '#7a9bbf', letterSpacing: '.06em', textTransform: 'uppercase' }}>Node Logs</div>
          <div style={{ background: '#020a14', border: '1px solid rgba(0,200,255,.1)', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 160, overflowY: 'auto', fontFamily: "'Share Tech Mono',monospace" }}>
            {LOGS.map(l => (
              <div key={l.time} style={{ display: 'flex', gap: 10, fontSize: 11 }}>
                <span style={{ color: '#4a6a88', flexShrink: 0 }}>{l.time}</span>
                <span style={{ color: LOG_COLORS[l.level] }}>[{l.level.toUpperCase()}]</span>
                <span style={{ color: '#7a9bbf' }}>{l.message}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
