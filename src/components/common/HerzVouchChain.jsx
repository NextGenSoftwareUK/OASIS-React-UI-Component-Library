import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.web4.oasisomniverse.one';

const TIER_LABELS = {
  1: 'Explorer', 2: 'Wanderer', 3: 'Tribe Member', 4: 'Contributor',
  5: 'Ally', 6: 'Guardian', 7: 'Elder', 8: 'Flame Keeper', 9: 'Sovereign',
};
const tierLabel = (level) => TIER_LABELS[level] ?? `L${level}`;

const s = {
  root: { fontFamily: 'inherit', color: '#e0eeff', fontSize: 13 },
  input: { flex: 1, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(0,200,255,.2)', borderRadius: 8, padding: '9px 13px', color: '#fff', fontSize: 12, fontFamily: "'Courier New',monospace", outline: 'none' },
  btn: { background: 'linear-gradient(135deg,#a060ff,#6030cc)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: "'Orbitron',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', padding: '9px 16px', cursor: 'pointer', whiteSpace: 'nowrap' },
  card: { background: 'rgba(160,100,255,.1)', border: '1px solid rgba(160,100,255,.3)', borderRadius: 12, padding: '16px 18px', marginTop: 14 },
  herzId: { fontFamily: "'Courier New',monospace", fontSize: 17, fontWeight: 700, color: '#c8aaff', letterSpacing: '.04em' },
  label: { fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7a9bbf', marginBottom: 4 },
  meta: { fontSize: 11, color: '#5a7a9a', marginTop: 3 },
  stat: { fontSize: 12, color: '#8a7abf' },
  chainTitle: { fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7a9bbf', margin: '14px 0 8px' },
  chainLine: { display: 'flex', alignItems: 'baseline', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(160,100,255,.1)' },
  dot: { width: 8, height: 8, borderRadius: '50%', background: '#a060ff', flexShrink: 0, marginTop: 2 },
  err: { background: 'rgba(255,80,80,.12)', border: '1px solid rgba(255,80,80,.3)', color: '#ff8080', borderRadius: 8, padding: '9px 13px', fontSize: 12, marginTop: 10 },
};

/**
 * HerzVouchChain — public lookup tool for any HerzID.
 *
 * Shows profile card + vouch lineage tree. No authentication needed.
 * Useful as a standalone "verify an ID" widget OR embedded next to HerzIdPanel.
 *
 * Standalone mode: just render it — uses @oasisomniverse/web4-api directly.
 * Override mode: supply `onLookup(herzId)` => { profile, chain } for custom backends.
 *
 * Props:
 *   initialHerzId  pre-fill the search field and auto-lookup on mount
 *   apiUrl         base URL override
 *   onLookup       async (herzId) => { profile, chain } — override fetch
 */
export function HerzVouchChain({ initialHerzId, apiUrl = API_URL, onLookup }) {
  const [query,   setQuery]   = useState(initialHerzId ?? '');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [profile, setProfile] = useState(null);
  const [chain,   setChain]   = useState(null);

  const lookup = async (q) => {
    const hz = q.trim();
    if (!hz) return;
    setLoading(true); setError(null); setProfile(null); setChain(null);
    try {
      if (onLookup) {
        const res = await onLookup(hz);
        setProfile(res.profile); setChain(res.chain ?? []);
      } else {
        const { OASISClient } = await import('@oasisomniverse/web4-api');
        const c = new OASISClient({ baseUrl: apiUrl });
        const [verRes, chainRes] = await Promise.all([
          c.herzId.verify({ herzId: hz }),
          c.herzId.vouchChain({ herzId: hz }).catch(() => null),
        ]);
        if (verRes.isError || !verRes.result) throw new Error(verRes.message ?? 'HerzID not found or seal invalid.');
        setProfile(verRes.result);
        setChain(chainRes?.result ?? []);
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  // Auto-lookup when initialHerzId is provided
  useEffect(() => { if (initialHerzId) lookup(initialHerzId); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => { e.preventDefault(); lookup(query); };

  return (
    <div style={s.root}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter a HerzID e.g. 052·0·000·000·001·R"
          style={s.input}
        />
        <button type="submit" disabled={loading} style={{ ...s.btn, opacity: loading ? .6 : 1 }}>
          {loading ? '…' : 'Look up'}
        </button>
      </form>

      {error && <div style={s.err}>{error}</div>}

      {profile && (
        <>
          {/* Profile card */}
          <div style={s.card}>
            <div style={s.label}>HerzID</div>
            <div style={s.herzId}>{profile.herzId}</div>
            <div style={{ ...s.meta, color: '#a080ff', marginTop: 4 }}>
              {tierLabel(profile.clearanceLevel)} · Clearance {profile.clearanceLevel}
            </div>
            <div style={s.meta}>Country {profile.countryCode} · Joined {new Date(profile.joinedAt).toLocaleDateString()}</div>
            {(profile.totalVouched != null || profile.vouchesRemaining != null) && (
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                {profile.totalVouched      != null && <span style={s.stat}>Vouched <strong style={{ color: '#c8aaff' }}>{profile.totalVouched}</strong></span>}
                {profile.vouchesRemaining  != null && <span style={s.stat}>Remaining <strong style={{ color: '#c8aaff' }}>{profile.vouchesRemaining}</strong></span>}
              </div>
            )}
          </div>

          {/* Vouch chain */}
          {chain && chain.length > 0 && (
            <>
              <div style={s.chainTitle}>Vouch lineage ({chain.length})</div>
              <div style={{ borderLeft: '2px solid rgba(160,100,255,.3)', paddingLeft: 12 }}>
                {chain.map((node, i) => (
                  <div key={i} style={s.chainLine}>
                    <div style={s.dot} />
                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: '#c8aaff' }}>
                      {node.herzId}
                    </span>
                    {node.clearanceLevel != null && (
                      <span style={{ fontSize: 11, color: '#7a5abf' }}>
                        {tierLabel(node.clearanceLevel)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {chain && chain.length === 0 && (
            <p style={{ fontSize: 12, color: '#5a7a9a', marginTop: 10 }}>
              No vouch chain — Founder or root member.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default HerzVouchChain;
