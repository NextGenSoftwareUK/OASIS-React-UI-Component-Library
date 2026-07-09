import React, { useEffect } from 'react';
import './OasisModal.css';

export default function OasisModal({ open, onClose, title, accentColor = '#00c8ff', children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="oasis-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="oasis-modal-box" role="dialog" aria-modal="true">
        <div className="oasis-modal-header" style={{ borderBottomColor: accentColor + '33' }}>
          <span className="oasis-modal-title" style={{ color: accentColor }}>{title}</span>
          <button className="oasis-modal-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>
        <div className="oasis-modal-body">{children}</div>
      </div>
    </div>
  );
}
