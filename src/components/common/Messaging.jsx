import { useState } from 'react';

const s = {
  shell: { display: 'grid', gridTemplateColumns: '260px 1fr', height: 480, border: '1px solid rgba(0,200,255,.15)', borderRadius: 12, overflow: 'hidden' },
  sidebar: { borderRight: '1px solid rgba(0,200,255,.1)', display: 'flex', flexDirection: 'column' },
  searchWrap: { padding: 12, borderBottom: '1px solid rgba(0,200,255,.1)' },
  search: { width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box' },
  list: { flex: 1, overflowY: 'auto' },
  item: { padding: '12px 14px', borderBottom: '1px solid rgba(0,200,255,.07)', cursor: 'pointer' },
  from: { fontSize: 13, color: '#e0f0ff', marginBottom: 3 },
  preview: { fontSize: 12, color: '#7a9bbf', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  time: { fontSize: 11, color: '#4a6a88', marginTop: 4 },
  main: { display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,.2)' },
  placeholder: { display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#4a6a88', fontSize: 14 },
  detailHeader: { display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(0,200,255,.1)' },
  detailFrom: { fontFamily: "'Orbitron',sans-serif", fontSize: 14, color: '#fff' },
  detailTime: { fontSize: 12, color: '#4a6a88' },
  body: { flex: 1, padding: 20, fontSize: 14, color: '#a8bfd8', lineHeight: 1.7, overflowY: 'auto' },
  replyWrap: { padding: 16, borderTop: '1px solid rgba(0,200,255,.1)', display: 'flex', flexDirection: 'column', gap: 10 },
  replyInput: { width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  btn: { alignSelf: 'flex-end', background: 'linear-gradient(135deg,#00c8ff,#0080ff)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 12, fontWeight: 700, padding: '9px 24px', cursor: 'pointer' },
  empty: { padding: 24, textAlign: 'center', color: '#4a6a88', fontSize: 13 },
};

const INITIAL = [
  { id: '1', from: 'OASIS Team', preview: 'Welcome to the OASIS network!', time: 'Just now', read: false, body: 'Welcome to the OASIS Omniverse! Your avatar is now connected to the network. Explore NFTs, karma, quests and more.' },
  { id: '2', from: 'System', preview: 'Your karma level has increased.', time: '2h ago', read: true, body: 'Congratulations! Your karma level has increased. Keep contributing to the community to unlock new features and NFTs.' },
];

export function Messaging() {
  const [messages, setMessages] = useState(INITIAL);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [reply, setReply] = useState('');

  const filtered = messages.filter(m => m.from.toLowerCase().includes(search.toLowerCase()) || m.preview.toLowerCase().includes(search.toLowerCase()));

  function open(m) {
    setMessages(ms => ms.map(x => x.id === m.id ? { ...x, read: true } : x));
    setSelected(m); setReply('');
  }

  return (
    <div style={s.shell}>
      <div style={s.sidebar}>
        <div style={s.searchWrap}><input style={s.search} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages…" /></div>
        <div style={s.list}>
          {filtered.map(m => (
            <div key={m.id} style={{ ...s.item, background: selected?.id === m.id ? 'rgba(0,200,255,.1)' : undefined, borderLeft: selected?.id === m.id ? '3px solid #00c8ff' : undefined }} onClick={() => open(m)}>
              <div style={{ ...s.from, fontWeight: m.read ? undefined : 700 }}>{m.from}</div>
              <div style={s.preview}>{m.preview}</div>
              <div style={s.time}>{m.time}</div>
            </div>
          ))}
          {filtered.length === 0 && <div style={s.empty}>No messages found.</div>}
        </div>
      </div>
      <div style={s.main}>
        {selected ? (
          <>
            <div style={s.detailHeader}><div style={s.detailFrom}>{selected.from}</div><div style={s.detailTime}>{selected.time}</div></div>
            <div style={s.body}>{selected.body}</div>
            <div style={s.replyWrap}>
              <textarea style={s.replyInput} value={reply} onChange={e => setReply(e.target.value)} placeholder="Write a reply…" rows={3} />
              <button style={{ ...s.btn, opacity: reply.trim() ? 1 : .4 }} disabled={!reply.trim()} onClick={() => setReply('')}>Send</button>
            </div>
          </>
        ) : (
          <div style={s.placeholder}>📬 Select a message to read it</div>
        )}
      </div>
    </div>
  );
}
