"use client";

const STEPS = [
  {
    num: 1,
    method: "GET",
    methodColor: "#3b82f6",
    path: "/type/fire",
    result: "JSON list of Pokémon by type",
  },
  {
    num: 2,
    method: "GET",
    methodColor: "#3b82f6",
    path: "/pokemon/charizard",
    result: "JSON stats, sprite, moves",
  },
  {
    num: 3,
    method: "POST",
    methodColor: "#22c55e",
    path: "Save to Supabase",
    result: "Row saved with timestamp",
  },
  {
    num: 4,
    method: "SELECT",
    methodColor: "var(--accent)",
    path: "Fetch collection",
    result: "Your saved Pokémon cards appear",
  },
];

const LEGEND = [
  { label: "Browser / UI",   icon: BrowserIcon },
  { label: "PokeAPI",        icon: ApiIcon },
  { label: "Supabase DB",    icon: DatabaseIcon },
  { label: "My Collection",  icon: CollectionIcon },
];

export default function CapstoneArchitectureDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-center mb-5" style={{ color: "var(--accent)" }}>
        Full System Architecture
      </p>

      <div className="space-y-2.5">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="flex items-center gap-2.5 px-3 py-3 rounded-xl min-w-0"
            style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}
          >
            {/* Step number */}
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{ backgroundColor: step.methodColor, color: "white" }}
            >
              {step.num}
            </span>

            {/* Method badge */}
            <span
              className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded font-mono flex-shrink-0"
              style={{ backgroundColor: step.methodColor, color: "white" }}
            >
              {step.method}
            </span>

            {/* Path */}
            <code
              className="hidden sm:block text-xs flex-shrink-0"
              style={{ color: "var(--accent)", background: "transparent" }}
            >
              {step.path}
            </code>

            {/* Arrow */}
            <span className="text-xs flex-shrink-0" style={{ color: step.methodColor }}>→</span>

            {/* Result */}
            <span className="text-xs min-w-0 truncate" style={{ color: "var(--text-tertiary)" }}>
              {step.result}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
        {LEGEND.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
            >
              <Icon />
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2} />
      <path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function CollectionIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}
