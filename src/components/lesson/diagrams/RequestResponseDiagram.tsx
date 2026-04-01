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

      <p className="text-[11px] font-bold uppercase tracking-widest text-center mb-6" style={{ color: "var(--accent)" }}>
        The Request–Response Cycle
      </p>

      {/* ── Mobile: vertical stack ── */}
      <div className="flex sm:hidden flex-col items-center gap-0">
        <Node icon={<MonitorIcon />} label="Your Browser" sub="The customer" />
        <VerticalArrows forwardLabel="↓ Request" backLabel="↑ Response" forwardColor="var(--http-get)" backColor="var(--success)" />
        <Node icon={<ZapIcon />} label="API" sub="The waiter" highlight />
        <VerticalArrows forwardLabel="↓" backLabel="↑" forwardColor="var(--http-get)" backColor="var(--success)" />
        <Node icon={<ServerIcon />} label="Server" sub="The kitchen" />
      </div>

      {/* ── Desktop: horizontal row ── */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        <Node icon={<MonitorIcon />} label="Your Browser" sub="The customer" />
        <HorizontalArrows forwardLabel="Request →" backLabel="← Response" forwardColor="var(--http-get)" backColor="var(--success)" />
        <Node icon={<ZapIcon />} label="API" sub="The waiter" highlight />
        <HorizontalArrows forwardLabel="→" backLabel="←" forwardColor="var(--http-get)" backColor="var(--success)" />
        <Node icon={<ServerIcon />} label="Server" sub="The kitchen" />
      </div>
    </div>
  );
}

function Node({ icon, label, sub, highlight }: { icon: React.ReactNode; label: string; sub: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2.5 px-5 py-4 rounded-xl" style={{ minWidth: 96 }}>
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: highlight ? "var(--accent-light)" : "var(--bg-tertiary)",
          color: highlight ? "var(--accent)" : "var(--text-secondary)",
        }}
      >
        {icon}
      </span>
      <div className="text-center">
        <div className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{label}</div>
        <div className="text-xs whitespace-nowrap" style={{ color: "var(--text-tertiary)" }}>{sub}</div>
      </div>
    </div>
  );
}

function HorizontalArrows({ forwardLabel, backLabel, forwardColor, backColor }: {
  forwardLabel: string; backLabel: string; forwardColor: string; backColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-2" style={{ minWidth: 110 }}>
      <div className="flow-right text-xs font-medium" style={{ color: forwardColor }}>{forwardLabel}</div>
      <div className="w-full h-px" style={{ backgroundColor: "var(--border)" }} />
      <div className="flow-left text-xs font-medium" style={{ color: backColor }}>{backLabel}</div>
    </div>
  );
}

function VerticalArrows({ forwardLabel, backLabel, forwardColor, backColor }: {
  forwardLabel: string; backLabel: string; forwardColor: string; backColor: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flow-down text-xs font-medium" style={{ color: forwardColor }}>{forwardLabel}</div>
      <div className="h-8 w-px" style={{ backgroundColor: "var(--border)" }} />
      <div className="flow-up text-xs font-medium" style={{ color: backColor }}>{backLabel}</div>
    </div>
  );
}

function MonitorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2} />
      <path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}
