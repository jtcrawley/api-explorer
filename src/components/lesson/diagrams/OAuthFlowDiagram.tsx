"use client";

const steps = [
  { num: 1, from: "🧑‍💻 You", to: "📱 App", label: "Click 'Sign in with Spotify'", color: "var(--accent)", dir: "right" },
  { num: 2, from: "📱 App", to: "🎵 Spotify", label: "Redirect to Spotify login", color: "#1DB954", dir: "right" },
  { num: 3, from: "🧑‍💻 You", to: "🎵 Spotify", label: "Enter credentials & approve", color: "#1DB954", dir: "right" },
  { num: 4, from: "🎵 Spotify", to: "📱 App", label: "Return an auth code", color: "var(--warning)", dir: "left" },
  { num: 5, from: "📱 App", to: "🎵 Spotify", label: "Exchange code for access token", color: "var(--warning)", dir: "right" },
  { num: 6, from: "📱 App", to: "🧑‍💻 You", label: "You're in — app stores token for API calls", color: "var(--success)", dir: "left" },
];

export default function OAuthFlowDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-center mb-5" style={{ color: "var(--text-tertiary)" }}>
        OAuth Flow — How "Sign in with Spotify" Works
      </p>
      <div className="space-y-2.5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: step.color, color: "white" }}
            >
              {step.num}
            </span>
            <span className="text-xs font-medium flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
              {step.from}
            </span>
            <span className="text-xs" style={{ color: step.color }}>
              {step.dir === "right" ? "→" : "←"}
            </span>
            <span className="text-xs font-medium flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
              {step.to}
            </span>
            <span className="text-xs ml-1" style={{ color: "var(--text-tertiary)" }}>
              — {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
