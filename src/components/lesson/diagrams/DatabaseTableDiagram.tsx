"use client";

const columns = ["id", "name", "type", "sprite_url"];
const rows = [
  { id: 25, name: "pikachu", type: "electric", sprite_url: "…/pikachu.png" },
  { id: 6, name: "charizard", type: "fire/flying", sprite_url: "…/charizard.png" },
  { id: 150, name: "mewtwo", type: "psychic", sprite_url: "…/mewtwo.png" },
];

const typeColors: Record<string, string> = {
  electric: "#f59e0b",
  "fire/flying": "#ef4444",
  psychic: "#a855f7",
};

export default function DatabaseTableDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10 overflow-x-auto"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Table: saved_pokemon
        </p>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-4 py-2.5 text-xs font-semibold font-mono border-b"
                style={{
                  color: "var(--accent)",
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-tertiary)",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              style={{
                backgroundColor: i % 2 === 0 ? "transparent" : "var(--bg-tertiary)",
              }}
            >
              <td className="px-4 py-2.5 font-mono text-xs border-b" style={{ color: "var(--text-tertiary)", borderColor: "var(--border)" }}>
                {row.id}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs font-medium border-b" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>
                {row.name}
              </td>
              <td className="px-4 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${typeColors[row.type]}22`,
                    color: typeColors[row.type] ?? "var(--text-secondary)",
                  }}
                >
                  {row.type}
                </span>
              </td>
              <td className="px-4 py-2.5 font-mono text-xs border-b" style={{ color: "var(--text-tertiary)", borderColor: "var(--border)" }}>
                {row.sprite_url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs mt-3" style={{ color: "var(--text-tertiary)" }}>
        Each <strong style={{ color: "var(--text-secondary)" }}>row</strong> is a record. Each{" "}
        <strong style={{ color: "var(--text-secondary)" }}>column</strong> is a field. Together they form a{" "}
        <strong style={{ color: "var(--accent)" }}>table</strong>.
      </p>
    </div>
  );
}
