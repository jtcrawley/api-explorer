"use client";

const methods = [
  {
    verb: "GET",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.3)",
    label: "Read / Fetch",
    example: "GET /pokemon/pikachu",
    desc: "Retrieve data. Nothing changes on the server.",
    icon: "📥",
  },
  {
    verb: "POST",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.3)",
    label: "Create",
    example: "POST /saved-pokemon",
    desc: "Send new data to create something on the server.",
    icon: "✏️",
  },
  {
    verb: "PUT",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
    label: "Update / Replace",
    example: "PUT /pokemon/25",
    desc: "Replace an existing resource entirely.",
    icon: "🔄",
  },
  {
    verb: "DELETE",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.3)",
    label: "Remove",
    example: "DELETE /saved-pokemon/42",
    desc: "Remove a resource from the server.",
    icon: "🗑️",
  },
];

export default function HttpMethodsDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-center mb-5" style={{ color: "var(--text-tertiary)" }}>
        The 4 HTTP Methods
      </p>
      <div className="grid grid-cols-2 gap-3">
        {methods.map((m) => (
          <div
            key={m.verb}
            className="rounded-xl p-4"
            style={{ backgroundColor: m.bg, border: `1px solid ${m.border}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-md font-mono"
                style={{ backgroundColor: m.color, color: "white" }}
              >
                {m.verb}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {m.label}
              </span>
            </div>
            <p className="text-xs mb-2" style={{ color: "var(--text-tertiary)" }}>{m.desc}</p>
            <code
              className="text-[10px] px-2 py-1 rounded block font-mono"
              style={{ backgroundColor: "var(--bg-code)", color: m.color }}
            >
              {m.example}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
