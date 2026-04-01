"use client";

const PARTS = [
  {
    key: "story",
    label: "User Story",
    color: "#3b82f6",
    value: "As a user, I can view my saved Pokémon team.",
    designQuestion: "What does 'view' mean? List? Grid? Detail screen?",
  },
  {
    key: "endpoint",
    label: "Endpoint + Method",
    color: "#22c55e",
    value: "GET /api/teams/{userId}",
    designQuestion: "Is this the only call? Or does the page need multiple endpoints?",
  },
  {
    key: "response",
    label: "Response Shape",
    color: "#a855f7",
    value: '{ "trainer_id": "abc123", "pokemon": [ { "id": 25, "name": "pikachu", "sprite": "https://..." } ] }',
    designQuestion: "Does this include every field your design shows? Check for missing data.",
  },
  {
    key: "criteria",
    label: "Acceptance Criteria",
    color: "#f59e0b",
    value: "Returns saved Pokémon. Returns 404 if user doesn't exist.",
    designQuestion: "Are loading, empty, and error states mentioned? If not — flag it.",
  },
];

const CHECKLIST = [
  { label: "Response includes all fields my design shows", color: "#22c55e" },
  { label: "Empty state is specified (what if pokemon[] is empty?)", color: "#22c55e" },
  { label: "Loading state is accounted for", color: "#f59e0b" },
  { label: "Error states are specified (404, 500, network failure)", color: "#f59e0b" },
  { label: "No N+1 calls hidden in the design", color: "#ef4444" },
];

export default function TicketAnatomyDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10 space-y-5"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
        Anatomy of an API Ticket — Designer&apos;s View
      </p>

      {/* Ticket parts */}
      <div className="space-y-2.5">
        {PARTS.map((part) => (
          <div
            key={part.key}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${part.color}30` }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5"
              style={{ backgroundColor: `${part.color}12`, borderBottom: `1px solid ${part.color}20` }}
            >
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                style={{ backgroundColor: `${part.color}25`, color: part.color }}
              >
                {part.label}
              </span>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0"
              style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}
            >
              <div className="px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                  What the ticket says
                </p>
                <code
                  className="text-xs leading-snug block break-all"
                  style={{ color: part.color, fontFamily: "var(--font-mono, monospace)" }}
                >
                  {part.value}
                </code>
              </div>
              <div
                className="px-3 py-2.5"
                style={{ borderLeft: "1px solid var(--border)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                  Designer question
                </p>
                <p className="text-[11px] leading-snug italic" style={{ color: "var(--text-secondary)" }}>
                  {part.designQuestion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          Review checklist before sprint
        </p>
        <div className="space-y-1.5">
          {CHECKLIST.map((item) => (
            <div key={item.label} className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: item.color }}
              >
                <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={2} />
              </svg>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
