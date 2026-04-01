"use client";

const STATES = [
  {
    id: "loading",
    label: "Loading",
    color: "#3b82f6",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    summary: "Request sent, waiting for response",
    designs: ["Skeleton screens", "Spinner / progress bar", "Disabled buttons"],
    warning: "Don't show a blank screen — set layout expectations with a skeleton.",
  },
  {
    id: "success",
    label: "Success",
    color: "#22c55e",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    summary: "Data returned, all good",
    designs: ["Happy path with real data", "Edge cases: long names, missing fields", "Max item counts"],
    warning: "Design the happy path last — it's the easiest state.",
  },
  {
    id: "empty",
    label: "Empty",
    color: "#a855f7",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    summary: "Request succeeded — zero results",
    designs: ["Explain why it's empty", "CTA to fill the empty state", "No dead ends"],
    warning: "Empty ≠ Error. Different cause, different message, different action.",
  },
  {
    id: "error",
    label: "Error",
    color: "#ef4444",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    summary: "Network failure, 4xx, 5xx, timeout",
    designs: ["Human-readable message", "Retry action", "Context-specific copy"],
    warning: "Never show raw error codes to users — translate them.",
  },
];

export default function DataStatesDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
        The Four States Every API Screen Needs
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STATES.map((s) => (
          <div
            key={s.id}
            className="rounded-xl p-4"
            style={{ backgroundColor: "var(--bg-primary)", border: `1px solid ${s.color}30` }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                {s.icon}
              </span>
              <div>
                <p className="text-sm font-bold leading-none" style={{ color: s.color }}>
                  {s.label}
                </p>
                <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "var(--text-tertiary)" }}>
                  {s.summary}
                </p>
              </div>
            </div>
            {/* Design list */}
            <div className="space-y-1 mb-3">
              {s.designs.map((d) => (
                <div key={d} className="flex items-start gap-1.5">
                  <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <p className="text-[11px] leading-tight" style={{ color: "var(--text-secondary)" }}>{d}</p>
                </div>
              ))}
            </div>
            {/* Warning */}
            <p
              className="text-[10px] leading-snug px-2.5 py-1.5 rounded-lg"
              style={{ backgroundColor: `${s.color}10`, color: s.color }}
            >
              {s.warning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
