import React, { useState, useCallback } from 'react';

let _show = null;

export function showKarmaToast({ message, amount, duration = 4000 }) {
  _show?.({ message, amount, duration });
}

export default function KarmaToast() {
  const [toast, setToast] = useState(null);
  const timerRef = React.useRef(null);

  _show = useCallback(({ message, amount, duration }) => {
    clearTimeout(timerRef.current);
    setToast({ message, amount });
    timerRef.current = setTimeout(() => setToast(null), duration);
  }, []);

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 10000,
      display: 'flex', alignItems: 'center', gap: 12,
      background: '#0d1829', border: '1px solid rgba(0,200,255,.25)',
      borderRadius: 12, padding: '14px 18px', boxShadow: '0 8px 32px rgba(0,0,0,.5)',
      animation: 'oasisSlideUp .35s ease',
    }}>
      <span style={{ fontSize: 22 }}>⚡</span>
      <div>
        <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 15, fontWeight: 700, color: '#00c8ff' }}>
          +{toast.amount} Karma
        </div>
        <div style={{ fontSize: 12, color: '#7a9bbf', marginTop: 2 }}>{toast.message}</div>
      </div>
    </div>
  );
}
