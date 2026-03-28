"use client";

const steps = [
  { num: 1, from: "🧑‍💻 You", to: "📱 App", label: "Click 'Sign in with GitHub'", color: "var(--accent)", dir: "right" },
  { num: 2, from: "📱 App", to: "🐙 GitHub", label: "Redirect to GitHub login", color: "#238636", dir: "right" },
  { num: 3, from: "🧑‍💻 You", to: "🐙 GitHub", label: "Enter credentials & approve", color: "#238636", dir: "right" },
  { num: 4, from: "🐙 GitHub", to: "📱 App", label: "Return an auth code", color: "var(--warning)", dir: "left" },
  { num: 5, from: "📱 App", to: "🐙 GitHub", label: "Exchange code for access token", color: "var(--warning)", dir: "right" },
  { num: 6, from: "📱 App", to: "🧑‍💻 You", label: "You're in. App stores token for API calls.", color: "var(--success)", dir: "left" },
];

export default function OAuthFlowDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-center mb-5" style={{ color: "var(--text-tertiary)" }}>
        OAuth Flow: How "Sign in with GitHub" Works
      </p>
      <div className="space-y-2.5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-center gap-2 px-3 py-3 rounded-xl min-w-0"
            style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}
          >
            {/* Step number */}
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{ backgroundColor: step.color, color: "white" }}
            >
              {step.num}
            </span>
            {/* Actor labels hidden on smallest screens to save space */}
            <span className="text-xs font-medium flex-shrink-0 hidden sm:inline" style={{ color: "var(--text-secondary)" }}>
              {step.from}
            </span>
            <span className="text-xs flex-shrink-0" style={{ color: step.color }}>
              {step.dir === "right" ? "→" : "←"}
            </span>
            <span className="text-xs font-medium flex-shrink-0 hidden sm:inline" style={{ color: "var(--text-secondary)" }}>
              {step.to}
            </span>
            {/* Label truncates on mobile rather than overflowing */}
            <span className="text-xs min-w-0 truncate" style={{ color: "var(--text-tertiary)" }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
