import { useState, useEffect } from 'react';

const styles = {
  nav: (scrolled) => ({ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled ? '12px 32px' : '18px 32px', background: 'rgba(3,7,20,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,200,255,.1)', transition: 'padding .3s', fontFamily: "'Rajdhani',sans-serif", boxSizing: 'border-box' }),
  brand: { fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.16em', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' },
  brandIcon: { color: '#00c8ff', fontSize: 16 },
  links: { display: 'flex', gap: 16, listStyle: 'none', margin: 0, padding: 0 },
  link: { fontFamily: "'Share Tech Mono',monospace", fontSize: 11, letterSpacing: '.08em', color: '#a8bfd8', textDecoration: 'none', textTransform: 'uppercase' },
  loginBtn: { background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 7, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.08em', padding: '8px 16px', cursor: 'pointer', whiteSpace: 'nowrap' },
};

/**
 * NavBar — sticky responsive navigation bar.
 * Props:
 *   brand        string        — brand name text
 *   brandIcon    string        — icon/emoji before brand name
 *   links        Array<{label, href}> — nav links
 *   loginLabel   string        — login button label (pass null to hide)
 *   onLogin      fn            — login button click handler
 */
export function NavBar({
  brand = 'OASIS',
  brandIcon = '✦',
  links = [],
  loginLabel = 'Login',
  onLogin,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={styles.nav(scrolled)}>
      <a style={styles.brand} href="#">
        <span style={styles.brandIcon}>{brandIcon}</span>
        <span>{brand}</span>
      </a>
      <ul style={styles.links}>
        {links.map((l, i) => (
          <li key={i}><a style={styles.link} href={l.href || '#'}>{l.label}</a></li>
        ))}
      </ul>
      {onLogin && (
        <button style={styles.loginBtn} onClick={onLogin}>{loginLabel}</button>
      )}
    </nav>
  );
}
