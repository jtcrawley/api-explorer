"use client";

export default function RequestResponseDiagram() {
  return (
    <div
      className="rounded-2xl p-8 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <style>{`
        @keyframes flowRight {
          0% { opacity: 0; transform: translateX(-8px); }
          30% { opacity: 1; transform: translateX(0); }
          70% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(8px); }
        }
        @keyframes flowLeft {
          0% { opacity: 0; transform: translateX(8px); }
          30% { opacity: 1; transform: translateX(0); }
          70% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-8px); }
        }
        .flow-right { animation: flowRight 2.4s ease-in-out infinite; }
        .flow-left { animation: flowLeft 2.4s ease-in-out infinite 1.2s; }
      `}</style>

      <p className="text-xs font-medium uppercase tracking-wider text-center mb-6" style={{ color: "var(--text-tertiary)" }}>
        The Request–Response Cycle
      </p>

      {/* overflow-x-auto so the diagram scrolls on narrow screens
          instead of breaking the page layout */}
      <div style={{ overflowX: "auto", margin: "0 -8px", padding: "0 8px" }}>
      <div className="flex items-center justify-center gap-0" style={{ minWidth: 480 }}>
        {/* Client */}
        <Node icon="💻" label="Client" sub="Your browser" />

        {/* Arrows Client ↔ API */}
        <Arrows
          forwardLabel="Request →"
          backLabel="← Response"
          forwardColor="var(--accent)"
          backColor="var(--success)"
        />

        {/* API */}
        <Node icon="⚡" label="API" sub="The waiter" highlight />

        {/* Arrows API ↔ Server */}
        <Arrows
          forwardLabel="→"
          backLabel="←"
          forwardColor="var(--text-tertiary)"
          backColor="var(--success)"
        />

        {/* Server */}
        <Node icon="🗄️" label="Server" sub="The kitchen" />
      </div>
      </div>
    </div>
  );
}

function Node({ icon, label, sub, highlight }: { icon: string; label: string; sub: string; highlight?: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl"
      style={{
        backgroundColor: highlight ? "var(--bg-tertiary)" : "transparent",
        border: highlight ? "1px solid var(--border)" : "1px solid transparent",
        minWidth: 100,
      }}
    >
      <span className="text-3xl">{icon}</span>
      <div className="text-center">
        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</div>
        <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{sub}</div>
      </div>
    </div>
  );
}

function Arrows({ forwardLabel, backLabel, forwardColor, backColor }: {
  forwardLabel: string;
  backLabel: string;
  forwardColor: string;
  backColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-2" style={{ minWidth: 120 }}>
      <div className="flow-right text-xs font-medium" style={{ color: forwardColor }}>
        {forwardLabel}
      </div>
      <div className="w-full h-px" style={{ backgroundColor: "var(--border)" }} />
      <div className="flow-left text-xs font-medium" style={{ color: backColor }}>
        {backLabel}
      </div>
    </div>
  );
}
