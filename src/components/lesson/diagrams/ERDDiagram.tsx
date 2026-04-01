"use client";

const TRAINERS = [
  { name: "id", tag: "PK" },
  { name: "username", tag: null },
  { name: "avatar_url", tag: null },
  { name: "created_at", tag: null },
];

const TEAM_POKEMON = [
  { name: "id", tag: "PK" },
  { name: "trainer_id", tag: "FK" },
  { name: "pokemon_id", tag: null },
  { name: "nickname", tag: null },
  { name: "position", tag: null },
  { name: "added_at", tag: null },
];

const BADGES = [
  { name: "id", tag: "PK" },
  { name: "trainer_id", tag: "FK" },
  { name: "gym_name", tag: null },
  { name: "earned_at", tag: null },
];

function Table({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; tag: string | null }[];
}) {
  return (
    <div
      className="rounded-xl overflow-hidden flex-shrink-0"
      style={{ border: "1px solid var(--border)", minWidth: 180 }}
    >
      {/* Table header */}
      <div
        className="px-3 py-2 text-xs font-bold font-mono tracking-wide"
        style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)", borderBottom: "1px solid var(--border)" }}
      >
        {title}
      </div>
      {/* Rows */}
      <div style={{ backgroundColor: "var(--bg-primary)" }}>
        {rows.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs"
            style={{
              borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : undefined,
              backgroundColor: i % 2 === 1 ? "var(--bg-secondary)" : undefined,
            }}
          >
            {row.tag ? (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                style={{
                  backgroundColor: row.tag === "PK" ? "color-mix(in srgb, var(--accent) 15%, transparent)" : "color-mix(in srgb, #f59e0b 15%, transparent)",
                  color: row.tag === "PK" ? "var(--accent)" : "#f59e0b",
                }}
              >
                {row.tag}
              </span>
            ) : (
              <span className="w-[26px] flex-shrink-0" />
            )}
            <span style={{ color: row.tag ? "var(--text-primary)" : "var(--text-secondary)" }}>
              {row.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center flex-shrink-0" style={{ color: "var(--text-tertiary)" }}>
      <div className="w-8 h-px" style={{ backgroundColor: "var(--border)" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {/* crow's foot — many side */}
        <line x1="0" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="3" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="11" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="3" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function VerticalArrow() {
  return (
    <div className="flex flex-col items-center flex-shrink-0 mx-4" style={{ color: "var(--text-tertiary)" }}>
      <div className="h-5 w-px" style={{ backgroundColor: "var(--border)" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="7" y1="0" x2="7" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3" y1="10" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11" y1="10" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function ERDDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
        ERD — Pokémon Companion App
      </p>

      {/* Top row: trainers → team_pokemon */}
      <div className="flex items-start gap-0 mb-2 overflow-x-auto pb-2">
        <Table title="trainers" rows={TRAINERS} />
        <div className="flex items-center mt-[34px]">
          <Arrow />
        </div>
        <Table title="team_pokemon" rows={TEAM_POKEMON} />
      </div>

      {/* Connector label */}
      <div className="flex items-center gap-2 mb-4 ml-2">
        <VerticalArrow />
      </div>

      {/* badges table below trainers */}
      <div className="flex items-start gap-4">
        <Table title="badges" rows={BADGES} />
        <div className="flex flex-col justify-center mt-2 text-xs space-y-2" style={{ color: "var(--text-tertiary)" }}>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}>PK</span>
            <span>Primary Key — unique ID for each row</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "color-mix(in srgb, #f59e0b 15%, transparent)", color: "#f59e0b" }}>FK</span>
            <span>Foreign Key — references another table&apos;s PK</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="24" height="10" viewBox="0 0 24 10" fill="none" style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>
              <line x1="0" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="14" y1="1" x2="20" y2="5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="14" y1="9" x2="20" y2="5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="14" y1="1" x2="14" y2="9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>One trainer → many rows (crow&apos;s foot = &quot;many&quot;)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
