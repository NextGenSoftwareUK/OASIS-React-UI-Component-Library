import { useState, useEffect, useRef } from 'react';

const PROVIDERS = [
  { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: '#627eea' },
  { id: 'solana', name: 'Solana', icon: '◎', color: '#9945ff' },
  { id: 'polygon', name: 'Polygon', icon: '⬡', color: '#8247e5' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: '#2d9cdb' },
  { id: 'eosio', name: 'EOSIO', icon: '🔮', color: '#443f54' },
  { id: 'holochain', name: 'Holochain', icon: '⬡', color: '#00e5be' },
  { id: 'thegraph', name: 'The Graph', icon: '📊', color: '#6f4cff' },
];

/**
 * ProviderDropdown — blockchain provider selector.
 * Props:
 *   defaultProvider  string  — id of default provider
 *   onChange         fn      — called with selected provider object
 */
export function ProviderDropdown({ defaultProvider = 'ethereum', onChange }) {
  const [selected, setSelected] = useState(() => PROVIDERS.find(p => p.id === defaultProvider) || PROVIDERS[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function select(p) { setSelected(p); setOpen(false); onChange?.(p); }

  return (
    <div ref={ref} style={{ position: 'relative', fontFamily: "'Rajdhani',sans-serif" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.05)', border: `1px solid ${open ? 'rgba(0,200,255,.5)' : 'rgba(0,200,255,.25)'}`, borderRadius: 10, padding: '10px 14px', cursor: 'pointer', color: '#fff', transition: 'border-color .2s' }}
      >
        <span style={{ fontSize: 20, width: 28, textAlign: 'center', color: selected.color }}>{selected.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, fontWeight: 700 }}>{selected.name}</div>
          <div style={{ fontSize: 11, color: '#7a9bbf', marginTop: 2 }}>Active Provider</div>
        </div>
        <span style={{ fontSize: 10, color: '#7a9bbf', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-block' }}>▼</span>
      </div>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#0d1b2e', border: '1px solid rgba(0,200,255,.2)', borderRadius: 10, overflow: 'hidden', zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,.5)' }}>
          {PROVIDERS.map(p => (
            <div
              key={p.id}
              onClick={() => select(p)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', color: '#e0f0ff', background: p.id === selected.id ? 'rgba(0,200,255,.12)' : 'transparent', borderLeft: p.id === selected.id ? '3px solid #00c8ff' : '3px solid transparent', transition: 'background .15s' }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center', color: p.color }}>{p.icon}</span>
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700 }}>{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
