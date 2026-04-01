"use client";

const POKEMON = [
  { name: "id", tag: "PK" },
  { name: "name", tag: null },
  { name: "sprite_url", tag: null },
];

const POKEMON_MOVES = [
  { name: "id", tag: "PK" },
  { name: "pokemon_id", tag: "FK" },
  { name: "move_id", tag: "FK" },
];

const MOVES = [
  { name: "id", tag: "PK" },
  { name: "name", tag: null },
  { name: "power", tag: null },
  { name: "type", tag: null },
];

const TRAINERS = [
  { name: "id", tag: "PK" },
  { name: "username", tag: null },
  { name: "avatar_url", tag: null },
];

const TEAM_POKEMON = [
  { name: "id", tag: "PK" },
  { name: "trainer_id", tag: "FK" },
  { name: "pokemon_id", tag: null },
  { name: "nickname", tag: null },
  { name: "position", tag: null },
];

function Table({
  title,
  rows,
  accent,
}: {
  title: string;
  rows: { name: string; tag: string | null }[];
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden flex-shrink-0"
      style={{
        border: accent ? "1px solid var(--accent)" : "1px solid var(--border)",
        minWidth: 160,
      }}
    >
      <div
        className="px-3 py-2 text-xs font-bold font-mono tracking-wide"
        style={{
          backgroundColor: accent ? "var(--accent-light)" : "var(--bg-tertiary)",
          color: accent ? "var(--accent)" : "var(--text-secondary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {title}
      </div>
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
                  backgroundColor:
                    row.tag === "PK"
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "color-mix(in srgb, #f59e0b 15%, transparent)",
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

function HArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-shrink-0 px-1">
      <div className="flex items-center" style={{ color: "var(--text-tertiary)" }}>
        {/* crow's foot left */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="14" y1="7" x2="4" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="3" x2="0" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="11" x2="0" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="3" x2="4" y2="11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="w-6 h-px" style={{ backgroundColor: "var(--border)" }} />
        {/* crow's foot right */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="0" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="3" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="11" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="3" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      {label && (
        <span className="text-[9px] mt-1 font-medium" style={{ color: "var(--text-tertiary)" }}>
          {label}
        </span>
      )}
    </div>
  );
}

function OneToManyArrow() {
  return (
    <div className="flex items-center flex-shrink-0 px-1" style={{ color: "var(--text-tertiary)" }}>
      {/* single line — "one" side */}
      <div className="w-4 h-px" style={{ backgroundColor: "var(--border)" }} />
      <svg width="6" height="14" viewBox="0 0 6 14" fill="none">
        <line x1="3" y1="0" x2="3" y2="14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="w-4 h-px" style={{ backgroundColor: "var(--border)" }} />
      {/* crow's foot — "many" side */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="0" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="3" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="11" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="3" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function RelationshipsDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10 space-y-6"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      {/* One-to-many */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          One-to-Many — trainer has many Pokémon slots
        </p>
        <div className="flex items-center gap-0 overflow-x-auto pb-1">
          <Table title="trainers" rows={TRAINERS} />
          <OneToManyArrow />
          <Table title="team_pokemon" rows={TEAM_POKEMON} />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
          One trainer → many team_pokemon rows. Each team_pokemon row has a <span className="font-mono" style={{ color: "#f59e0b" }}>trainer_id FK</span> pointing back.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* Many-to-many */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          Many-to-Many — Pokémon can know many moves; moves belong to many Pokémon
        </p>
        <div className="flex items-center gap-0 overflow-x-auto pb-1">
          <Table title="pokemon" rows={POKEMON} />
          <HArrow />
          <Table title="pokemon_moves" rows={POKEMON_MOVES} accent />
          <HArrow />
          <Table title="moves" rows={MOVES} />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
          The <span style={{ color: "var(--accent)" }}>junction table</span> sits between the two — it holds one FK for each side, creating the link without duplicating data.
        </p>
      </div>
    </div>
  );
}
