const BALANCES = [
  { icon: '⟠', currency: 'Ethereum', network: 'Mainnet', amount: '0.4821', symbol: 'ETH' },
  { icon: '◎', currency: 'Solana', network: 'Mainnet', amount: '12.305', symbol: 'SOL' },
  { icon: '⬡', currency: 'Polygon', network: 'Mainnet', amount: '245.00', symbol: 'MATIC' },
];
const TXS = [
  { id: '1', type: 'in', amount: 0.05, currency: 'ETH', description: 'NFT Sale — Cosmic Warrior', date: '2 hours ago' },
  { id: '2', type: 'out', amount: 12, currency: 'SOL', description: 'Quest Reward Conversion', date: '1 day ago' },
  { id: '3', type: 'in', amount: 100, currency: 'MATIC', description: 'Karma Reward Payout', date: '3 days ago' },
];

export function Wallet() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, color: '#fff', margin: '0 0 6px' }}>💰 Wallet</h2>
        <p style={{ fontSize: 13, color: '#7a9bbf', margin: 0 }}>Your OASIS multi-chain wallet.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BALANCES.map(b => (
          <div key={b.currency} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(0,200,255,.12)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 24 }}>{b.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: '#fff' }}>{b.currency}</div><div style={{ fontSize: 11, color: '#7a9bbf', marginTop: 2 }}>{b.network}</div></div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 16, color: '#00c8ff', fontWeight: 600 }}>{b.amount} <span style={{ fontSize: 12, color: '#7a9bbf' }}>{b.symbol}</span></div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {['📤 Send', '📥 Receive', '🔄 Swap'].map(a => (
          <button key={a} style={{ flex: 1, background: 'rgba(0,200,255,.08)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, color: '#00c8ff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', padding: 10, cursor: 'pointer' }}>{a}</button>
        ))}
      </div>
      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 12, color: '#7a9bbf', letterSpacing: '.06em', textTransform: 'uppercase' }}>Recent Transactions</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TXS.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(0,200,255,.08)', borderRadius: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0, background: t.type === 'in' ? 'rgba(72,220,130,.15)' : 'rgba(255,107,107,.15)', color: t.type === 'in' ? '#48dc82' : '#ff6b6b' }}>{t.type === 'in' ? '↓' : '↑'}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: '#e0f0ff' }}>{t.description}</div><div style={{ fontSize: 11, color: '#4a6a88', marginTop: 2 }}>{t.date}</div></div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 13, fontWeight: 600, color: t.type === 'in' ? '#48dc82' : '#ff6b6b' }}>{t.type === 'in' ? '+' : '-'}{t.amount} {t.currency}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
