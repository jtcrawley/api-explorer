"use client";

const PATTERNS = [
  {
    name: "REST",
    tagline: "The standard",
    color: "#22c55e",
    how: "Fixed URLs, HTTP methods",
    request: 'GET /pokemon/25',
    response: '{ id, name, types, stats, moves, ... }',
    responseNote: "Full object — always",
    bestFor: ["Most products", "Public APIs", "Standard CRUD"],
    tradeoff: "Over-fetches data — you always get the full object",
    designNote: "Most APIs you'll encounter. Predictable, well-documented.",
  },
  {
    name: "GraphQL",
    tagline: "Ask for exactly what you need",
    color: "#e040fb",
    how: "Single endpoint, query language",
    request: 'query { pokemon(name:"pikachu") { name sprite types } }',
    response: '{ name, sprite, types }',
    responseNote: "Only what you asked for",
    bestFor: ["Mobile apps", "Complex data", "Fast-moving teams"],
    tradeoff: "Complex setup, harder to cache",
    designNote: "Faster on mobile. Frontend teams can move without waiting for new endpoints.",
  },
  {
    name: "Webhooks",
    tagline: "The server calls you",
    color: "#f59e0b",
    how: "Server pushes events to your URL",
    request: '← POST /your-webhook-url',
    response: '{ event: "battle.started", data: {...} }',
    responseNote: "Server initiates — no request needed",
    bestFor: ["Real-time events", "Notifications", "Payment confirmations"],
    tradeoff: "You need a public URL; harder to test locally",
    designNote: "Design for latency — the event arrives asynchronously. Needs a received/processing state.",
  },
];

const ROW_LABELS = ["How it works", "Request", "Response", "Best for", "Tradeoff", "Design note"];

export default function APIPatternsDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10 overflow-x-auto"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
        Three API Patterns
      </p>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-3 mb-1" style={{ minWidth: 520 }}>
        {PATTERNS.map((p) => (
          <div
            key={p.name}
            className="rounded-xl px-4 py-3 text-center"
            style={{ backgroundColor: `${p.color}12`, border: `1px solid ${p.color}40` }}
          >
            <p className="text-base font-bold font-mono" style={{ color: p.color }}>{p.name}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>{p.tagline}</p>
          </div>
        ))}
      </div>

      {/* Data rows */}
      {(["how", "request", "response", "bestFor", "tradeoff", "designNote"] as const).map((key, i) => (
        <div
          key={key}
          className="grid gap-3 py-2.5"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            minWidth: 520,
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* Label — show in first column as a caption above each cell on mobile */}
          {PATTERNS.map((p, pi) => {
            const val = key === "bestFor"
              ? (p.bestFor as string[]).join(", ")
              : (p as Record<string, string | string[]>)[key] as string;
            return (
              <div key={p.name}>
                {pi === 0 && (
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                    {ROW_LABELS[i]}
                  </p>
                )}
                {pi !== 0 && <div className="h-[18px]" />}
                {key === "request" || key === "response" ? (
                  <code
                    className="text-[10px] leading-snug block px-2 py-1.5 rounded-lg break-all"
                    style={{ backgroundColor: "var(--bg-code)", color: p.color }}
                  >
                    {val}
                    {key === "response" && (
                      <span className="block mt-1 text-[9px]" style={{ color: "var(--text-tertiary)" }}>
                        {p.responseNote}
                      </span>
                    )}
                  </code>
                ) : key === "tradeoff" ? (
                  <p className="text-[11px] leading-snug px-2 py-1.5 rounded-lg" style={{ backgroundColor: `${p.color}10`, color: p.color }}>
                    {val}
                  </p>
                ) : key === "designNote" ? (
                  <p className="text-[11px] leading-snug italic" style={{ color: "var(--text-secondary)" }}>
                    {val}
                  </p>
                ) : (
                  <p className="text-[11px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                    {val}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
