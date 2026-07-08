import { useState } from 'react';

const styles = {
  shell: { fontFamily: "'Rajdhani', sans-serif", display: 'flex', flexDirection: 'column', gap: 18 },
  header: { padding: '14px 18px', background: 'rgba(0,200,255,.07)', borderBottom: '1px solid rgba(0,200,255,.12)', display: 'flex', alignItems: 'center', gap: 12 },
  title: { fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, flex: 1 },
  closebtn: { background: 'none', border: 'none', color: '#7a9bbf', fontSize: 18, cursor: 'pointer', lineHeight: 1 },
  body: { padding: '18px', display: 'flex', flexDirection: 'column', gap: 12 },
  icon: { fontSize: 44, textAlign: 'center' },
  msg: { fontSize: 14, color: '#a8bfd8', lineHeight: 1.65, textAlign: 'center' },
  actions: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 4 },
  btn: { background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: '9px 22px', cursor: 'pointer' },
  btnGhost: { background: 'transparent', border: '1px solid rgba(0,200,255,.3)', borderRadius: 8, color: '#00c8ff', fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.08em', padding: '9px 22px', cursor: 'pointer' },
  badge: { display: 'inline-block', background: 'rgba(0,200,255,.12)', border: '1px solid rgba(0,200,255,.3)', color: '#00c8ff', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', padding: '3px 12px', textTransform: 'uppercase', textAlign: 'center' },
};

/**
 * MenuMessage — a dismissable banner/message panel for menu-level notices.
 * Props:
 *   title        string  — header title
 *   message      string  — body copy
 *   icon         string  — emoji icon
 *   type         'info' | 'success' | 'warning' | 'error'
 *   badge        string  — optional badge text
 *   actions      Array<{ label, onClick }> — action buttons
 *   onDismiss    fn      — called when closed
 */
export function MenuMessage({
  title = 'Notice',
  message = '',
  icon = 'ℹ️',
  type = 'info',
  badge,
  actions = [],
  onDismiss,
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const typeColors = {
    info:    { border: 'rgba(0,200,255,.25)', bg: 'rgba(0,200,255,.05)' },
    success: { border: 'rgba(72,220,130,.25)', bg: 'rgba(72,220,130,.05)' },
    warning: { border: 'rgba(255,180,60,.25)', bg: 'rgba(255,180,60,.05)' },
    error:   { border: 'rgba(255,80,80,.25)', bg: 'rgba(255,80,80,.05)' },
  };
  const colors = typeColors[type] || typeColors.info;

  function dismiss() { setVisible(false); onDismiss?.(); }

  return (
    <div style={{ ...styles.shell, border: `1px solid ${colors.border}`, borderRadius: 12, background: colors.bg, overflow: 'hidden' }}>
      <div style={styles.header}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={styles.title}>{title}</span>
        {badge && <span style={styles.badge}>{badge}</span>}
        <button style={styles.closebtn} onClick={dismiss} aria-label="Dismiss">✕</button>
      </div>
      <div style={styles.body}>
        {message && <p style={styles.msg}>{message}</p>}
        {actions.length > 0 && (
          <div style={styles.actions}>
            {actions.map((a, i) => (
              <button key={i} style={i === 0 ? styles.btn : styles.btnGhost} onClick={a.onClick}>{a.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
