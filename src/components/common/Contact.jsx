import { useState } from 'react';

const s = {
  shell: { display: 'flex', flexDirection: 'column', gap: 18 },
  header: { textAlign: 'center' },
  title: { fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' },
  sub: { fontSize: 13, color: '#7a9bbf', margin: 0 },
  error: { background: 'rgba(255,80,80,.12)', border: '1px solid rgba(255,80,80,.3)', color: '#ff6b6b', borderRadius: 8, padding: '10px 14px', fontSize: 13 },
  success: { background: 'rgba(72,220,130,.12)', border: '1px solid rgba(72,220,130,.3)', color: '#48dc82', borderRadius: 8, padding: '10px 14px', fontSize: 13 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: '.06em', color: '#7a9bbf', textTransform: 'uppercase' },
  input: { width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  textarea: { width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', minHeight: 100 },
  btn: { background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '.08em', padding: 12, cursor: 'pointer' },
  btnDisabled: { opacity: .5, cursor: 'not-allowed' },
};

export function Contact() {
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function set(k) { return e => setFields(f => ({ ...f, [k]: e.target.value })); }

  async function submit() {
    if (!fields.email || !fields.message) { setError('Please fill in your email and message.'); return; }
    setLoading(true); setError('');
    try {
      await fetch('https://formsubmit.co/ajax/davidellams@hotmail.com', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      setSent(true);
    } catch (e) { setError(e?.message ?? 'Send failed. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <div style={s.shell}>
      <div style={s.header}><h2 style={s.title}>Contact Us</h2><p style={s.sub}>Get in touch with the OASIS team.</p></div>
      {sent ? (
        <div style={s.success}>✅ Message sent! We'll be in touch soon.</div>
      ) : (
        <>
          {error && <div style={s.error}>{error}</div>}
          <div style={s.grid2}>
            <div style={s.field}><label style={s.label}>First Name</label><input style={s.input} value={fields.firstName} onChange={set('firstName')} placeholder="John" /></div>
            <div style={s.field}><label style={s.label}>Last Name</label><input style={s.input} value={fields.lastName} onChange={set('lastName')} placeholder="Doe" /></div>
          </div>
          <div style={s.field}><label style={s.label}>Email</label><input style={s.input} type="email" value={fields.email} onChange={set('email')} placeholder="name@example.com" /></div>
          <div style={s.field}><label style={s.label}>Subject</label><input style={s.input} value={fields.subject} onChange={set('subject')} placeholder="How can we help?" /></div>
          <div style={s.field}><label style={s.label}>Message</label><textarea style={s.textarea} value={fields.message} onChange={set('message')} placeholder="Your message…" rows={4} /></div>
          <button style={{ ...s.btn, ...(loading ? s.btnDisabled : {}) }} disabled={loading} onClick={submit}>{loading ? 'Sending…' : 'Send Message'}</button>
        </>
      )}
    </div>
  );
}
