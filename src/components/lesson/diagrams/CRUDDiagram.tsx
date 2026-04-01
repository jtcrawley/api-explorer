"use client";

const OPERATIONS = [
  {
    op: "Create",
    letter: "C",
    color: "#22c55e",
    http: "POST",
    dbOp: "INSERT",
    uiTriggers: ["Save button", "Form submit", "Sign up", "Add to team"],
    screens: ["Success confirmation", "Error state", "Loading state"],
    example: '"Save to Team" → new row in team_pokemon',
  },
  {
    op: "Read",
    letter: "R",
    color: "#3b82f6",
    http: "GET",
    dbOp: "SELECT",
    uiTriggers: ["Page load", "Search", "Filter", "Profile view"],
    screens: ["Loading skeleton", "Populated list", "Empty state", "Error state"],
    example: "Team page loads → SELECT from team_pokemon WHERE trainer_id = …",
  },
  {
    op: "Update",
    letter: "U",
    color: "#f59e0b",
    http: "PUT / PATCH",
    dbOp: "UPDATE",
    uiTriggers: ["Edit form", "Toggle", "Rename", "Drag reorder"],
    screens: ["Edit screen", "Optimistic update", "Save confirmation"],
    example: 'Rename Pikachu → UPDATE team_pokemon SET nickname = "Sparky"',
  },
  {
    op: "Delete",
    letter: "D",
    color: "#ef4444",
    http: "DELETE",
    dbOp: "DELETE",
    uiTriggers: ["Remove button", "Delete account", "Archive", "Disconnect"],
    screens: ["Confirmation dialog", "Undo toast", "Empty state after"],
    example: '"Release Pokémon" → DELETE FROM team_pokemon WHERE id = …',
  },
];

export default function CRUDDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
        CRUD — UI Action → Database Operation
      </p>
      <div className="space-y-3">
        {OPERATIONS.map((op) => (
          <div
            key={op.op}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${op.color}30` }}
          >
            <div
              className="flex items-center gap-3 px-4 py-2.5"
              style={{ backgroundColor: `${op.color}10` }}
            >
              {/* Letter badge */}
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ backgroundColor: op.color, color: "#fff" }}
              >
                {op.letter}
              </span>
              <span className="text-sm font-bold" style={{ color: op.color }}>{op.op}</span>
              {/* HTTP + DB tags */}
              <div className="flex items-center gap-1.5 ml-auto">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "var(--bg-code)", color: "var(--text-secondary)" }}
                >
                  {op.http}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded font-mono"
                  style={{ backgroundColor: `${op.color}20`, color: op.color }}
                >
                  {op.dbOp}
                </span>
              </div>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderTop: "1px solid var(--border)",
                // @ts-expect-error CSS variable
                "--tw-divide-opacity": 1,
                borderColor: "var(--border)",
              }}
            >
              {/* UI triggers */}
              <div className="px-4 py-3" style={{ borderColor: "var(--border)" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-tertiary)" }}>
                  UI triggers
                </p>
                <div className="flex flex-wrap gap-1">
                  {op.uiTriggers.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Screens to design */}
              <div className="px-4 py-3" style={{ borderLeft: "1px solid var(--border)" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-tertiary)" }}>
                  Screens to design
                </p>
                <div className="space-y-0.5">
                  {op.screens.map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: op.color }} />
                      <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Example */}
              <div className="px-4 py-3" style={{ borderLeft: "1px solid var(--border)" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-tertiary)" }}>
                  Pokémon app example
                </p>
                <p className="text-[11px] italic leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {op.example}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
