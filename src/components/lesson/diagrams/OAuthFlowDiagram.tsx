"use client";

const steps = [
  { num: 1, from: "You", to: "App", label: "Click 'Sign in with GitHub'", color: "var(--accent)", dir: "right" },
  { num: 2, from: "App", to: "GitHub", label: "Redirect to GitHub login", color: "#238636", dir: "right" },
  { num: 3, from: "You", to: "GitHub", label: "Enter credentials & approve", color: "#238636", dir: "right" },
  { num: 4, from: "GitHub", to: "App", label: "Return an auth code", color: "var(--warning)", dir: "left" },
  { num: 5, from: "App", to: "GitHub", label: "Exchange code for access token", color: "var(--warning)", dir: "right" },
  { num: 6, from: "App", to: "You", label: "You're in. App stores token for API calls.", color: "var(--success)", dir: "left" },
];

function UserIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function AppIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const ACTOR_ICONS: Record<string, React.ReactNode> = {
  You: <UserIcon />,
  App: <AppIcon />,
  GitHub: <GitHubIcon />,
};

export default function OAuthFlowDiagram() {
  return (
    <div
      className="rounded-2xl p-6 mb-10"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-center mb-5" style={{ color: "var(--accent)" }}>
        OAuth Flow: How &ldquo;Sign in with GitHub&rdquo; Works
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

            {/* From actor */}
            <span
              className="hidden sm:flex items-center gap-1 text-xs font-medium flex-shrink-0"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
              >
                {ACTOR_ICONS[step.from]}
              </span>
              {step.from}
            </span>

            {/* Arrow */}
            <span className="text-xs flex-shrink-0" style={{ color: step.color }}>
              {step.dir === "right" ? "→" : "←"}
            </span>

            {/* To actor */}
            <span
              className="hidden sm:flex items-center gap-1 text-xs font-medium flex-shrink-0"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
              >
                {ACTOR_ICONS[step.to]}
              </span>
              {step.to}
            </span>

            {/* Label */}
            <span className="text-xs min-w-0 truncate" style={{ color: "var(--text-tertiary)" }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
