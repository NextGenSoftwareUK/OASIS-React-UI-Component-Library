import { useState } from 'react';

const SECTIONS = [
  { icon: '🔔', label: 'Notifications', options: [
    { key: 'notifications', name: 'Enable Notifications', desc: 'Receive alerts for karma, messages and quests.', type: 'toggle' },
    { key: 'sound', name: 'Sound Effects', desc: 'Play sounds for OASIS events.', type: 'toggle' },
  ]},
  { icon: '🎨', label: 'Appearance', options: [
    { key: 'darkMode', name: 'Dark Mode', desc: 'Use the dark space theme.', type: 'toggle' },
    { key: 'theme', name: 'Theme', desc: 'Select your OASIS visual theme.', type: 'select', choices: ['Dark Space', 'Neon City', 'Forest Realm'] },
  ]},
  { icon: '🌐', label: 'Language & Region', options: [
    { key: 'language', name: 'Language', desc: 'Select your preferred language.', type: 'select', choices: ['English', 'Spanish', 'French', 'German', 'Japanese'] },
    { key: 'currency', name: 'Display Currency', desc: 'Currency for prices.', type: 'select', choices: ['ETH', 'SOL', 'USD', 'GBP', 'EUR'] },
  ]},
  { icon: '💾', label: 'Data', options: [
    { key: 'autoSave', name: 'Auto-save Progress', desc: 'Automatically save your OASIS progress.', type: 'toggle' },
  ]},
];

export function Settings() {
  const [open, setOpen] = useState('');
  const [prefs, setPrefs] = useState({ notifications: true, darkMode: true, sound: false, autoSave: true, language: 'English', theme: 'Dark Space', currency: 'ETH' });
  const [saved, setSaved] = useState(false);
  function togglePref(k) { setPrefs(p => ({ ...p, [k]: !p[k] })); }
  function setPref(k, v) { setPrefs(p => ({ ...p, [k]: v })); }
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>⚙️ Settings</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Manage your OASIS account and preferences.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SECTIONS.map(sec => (
          <div key={sec.label} style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${open === sec.label ? 'rgba(0,200,255,.3)' : 'rgba(0,200,255,.12)'}`, borderRadius: 10, overflow: 'hidden' }}>
            <div onClick={() => setOpen(o => o === sec.label ? '' : sec.label)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ fontSize: 18 }}>{sec.icon}</span>
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff', flex: 1 }}>{sec.label}</span>
              <span style={{ fontSize: 10, color: '#7a9bbf' }}>{open === sec.label ? '▲' : '▼'}</span>
            </div>
            {open === sec.label && (
              <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {sec.options.map(opt => (
                  <div key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#e0f0ff' }}>{opt.name}</div>
                      <div style={{ fontSize: 11, color: '#4a6a88', marginTop: 2 }}>{opt.desc}</div>
                    </div>
                    {opt.type === 'toggle' && (
                      <div onClick={() => togglePref(opt.key)} style={{ width: 44, height: 24, borderRadius: 999, background: prefs[opt.key] ? 'linear-gradient(135deg,#00c8ff,#0080ff)' : 'rgba(255,255,255,.1)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', top: 3, left: prefs[opt.key] ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
                      </div>
                    )}
                    {opt.type === 'select' && (
                      <select value={prefs[opt.key]} onChange={e => setPref(opt.key, e.target.value)} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 7, color: '#fff', fontSize: 12, padding: '6px 10px', outline: 'none' }}>
                        {opt.choices.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={save} style={{ background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '.08em', padding: 12, cursor: 'pointer' }}>{saved ? '✅ Saved!' : 'Save Settings'}</button>
    </div>
  );
}
