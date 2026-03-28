"use client";

export default function RequestResponseDiagram() {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8 mb-10"
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
        @keyframes flowDown {
          0% { opacity: 0; transform: translateY(-6px); }
          30% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(6px); }
        }
        @keyframes flowUp {
          0% { opacity: 0; transform: translateY(6px); }
          30% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        .flow-right { animation: flowRight 2.4s ease-in-out infinite; }
        .flow-left  { animation: flowLeft  2.4s ease-in-out infinite 1.2s; }
        .flow-down  { animation: flowDown  2.4s ease-in-out infinite; }
        .flow-up    { animation: flowUp    2.4s ease-in-out infinite 1.2s; }
      `}</style>

      <p className="text-xs font-medium uppercase tracking-wider text-center mb-6" style={{ color: "var(--text-tertiary)" }}>
        The Request–Response Cycle
      </p>

      {/* ── Mobile: vertical stack ── */}
      <div className="flex sm:hidden flex-col items-center gap-0">
        <Node icon="💻" label="Client" sub="Your browser" />
        <VerticalArrows
          forwardLabel="↓ Request"
          backLabel="↑ Response"
          forwardColor="var(--accent)"
          backColor="var(--success)"
        />
        <Node icon="⚡" label="API" sub="The waiter" highlight />
        <VerticalArrows
          forwardLabel="↓"
          backLabel="↑"
          forwardColor="var(--text-tertiary)"
          backColor="var(--success)"
        />
        <Node icon="🗄️" label="Server" sub="The kitchen" />
      </div>

      {/* ── Desktop: horizontal row ── */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        <Node icon="💻" label="Client" sub="Your browser" />
        <HorizontalArrows
          forwardLabel="Request →"
          backLabel="← Response"
          forwardColor="var(--accent)"
          backColor="var(--success)"
        />
        <Node icon="⚡" label="API" sub="The waiter" highlight />
        <HorizontalArrows
          forwardLabel="→"
          backLabel="←"
          forwardColor="var(--text-tertiary)"
          backColor="var(--success)"
        />
        <Node icon="🗄️" label="Server" sub="The kitchen" />
      </div>
    </div>
  );
}

function Node({ icon, label, sub, highlight }: { icon: string; label: string; sub: string; highlight?: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl"
      style={{
        backgroundColor: highlight ? "var(--bg-tertiary)" : "transparent",
        border: highlight ? "1px solid var(--border)" : "1px solid transparent",
        minWidth: 96,
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

function HorizontalArrows({ forwardLabel, backLabel, forwardColor, backColor }: {
  forwardLabel: string;
  backLabel: string;
  forwardColor: string;
  backColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-2" style={{ minWidth: 110 }}>
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

function VerticalArrows({ forwardLabel, backLabel, forwardColor, backColor }: {
  forwardLabel: string;
  backLabel: string;
  forwardColor: string;
  backColor: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flow-down text-xs font-medium" style={{ color: forwardColor }}>
        {forwardLabel}
      </div>
      <div className="h-8 w-px" style={{ backgroundColor: "var(--border)" }} />
      <div className="flow-up text-xs font-medium" style={{ color: backColor }}>
        {backLabel}
      </div>
    </div>
  );
}
