"use client";

import { modules } from "@/content/modules";

const MODULE_ICONS = [
  <svg key="1" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="2" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="3" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2}/><path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  <svg key="4" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="5" y="11" width="14" height="10" rx="2" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 018 0v4" /></svg>,
  <svg key="5" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
];

const SKILLS = [
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    title: "Design what's buildable",
    desc: "Know what requires backend work before you've spent a week in Figma.",
  },
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>,
    title: "Have real conversations",
    desc: "Ask informed questions. Catch edge cases before they become bugs.",
  },
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: "Read a ticket",
    desc: "Endpoints, payloads, schemas, status codes. No longer noise.",
  },
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
    title: "Unblock yourself",
    desc: "Call an API, read a JSON response, decode a 401. Literacy, not engineering.",
  },
];

const AGENT_FLOW = [
  {
    label: "User",
    sub: '"Book a flight"',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    label: "AI Agent",
    sub: "Interprets intent",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  },
  {
    label: "API Calls",
    sub: "Flights · Payments",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    label: "Database",
    sub: "Saves the trip",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2}/><path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  },
  {
    label: "Response",
    sub: "Confirms to user",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

const DESIGNER_TOUCHPOINTS = [
  "permissions screen",
  "loading state",
  "error message",
  "confirmation flow",
  "trust signal",
  "retry behaviour",
];

const Chevron = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--text-tertiary)" }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function WelcomeDiagram() {
  return (
    <div className="mb-10 space-y-8">

      {/* ── 1. Skills grid ── */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          What you&apos;ll walk away with
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              className="flex gap-3 p-4 rounded-xl border"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
              >
                {skill.icon}
              </span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                  {skill.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {skill.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Agentic Design — text + flow merged ── */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          The age of Agentic Design
        </p>
        <div
          className="rounded-xl border p-5"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          {/* Lead text */}
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
            AI agents don&apos;t just generate text. They call APIs, query databases, chain tools together, and take real actions in the world. Someone has to design every moment where a human and that system interact. That someone is you.
          </p>

          {/* Nodes */}
          <div className="flex items-start gap-1.5 overflow-x-auto pb-1">
            {AGENT_FLOW.map((node, i) => (
              <div key={node.label} className="flex items-start gap-1.5 flex-shrink-0">
                <div className="flex flex-col items-center gap-1.5 w-[72px]">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                  >
                    {node.icon}
                  </span>
                  <span className="text-[11px] font-semibold text-center leading-tight" style={{ color: "var(--text-primary)" }}>
                    {node.label}
                  </span>
                  <span className="text-[9px] text-center leading-tight" style={{ color: "var(--text-tertiary)" }}>
                    {node.sub}
                  </span>
                </div>
                {i < AGENT_FLOW.length - 1 && (
                  <div className="mt-[10px]">
                    <Chevron />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Designer touchpoints */}
          <div className="mt-5 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "var(--accent)" }}>
              You design these moments
            </p>
            <div className="flex flex-wrap gap-2">
              {DESIGNER_TOUCHPOINTS.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full border font-medium"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)", backgroundColor: "var(--accent-light)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Module roadmap — vertical timeline ── */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          Your journey — 5 modules
        </p>
        <div className="flex flex-col">
          {modules.map((mod, i) => (
            <div key={mod.id} className="flex gap-4">
              {/* Timeline spine */}
              <div className="flex flex-col items-center flex-shrink-0" style={{ width: "28px" }}>
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 z-10"
                  style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {MODULE_ICONS[i]}
                </span>
                {i < modules.length - 1 && (
                  <div
                    className="w-px flex-1 my-1"
                    style={{ backgroundColor: "var(--border)", minHeight: "20px" }}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`flex items-start justify-between gap-3 w-full ${i < modules.length - 1 ? "pb-5" : ""}`}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ color: "var(--accent)" }}>
                    Module {mod.id}
                  </p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                    {mod.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                    {mod.description}
                  </p>
                </div>
                <span
                  className="text-[10px] font-semibold flex-shrink-0 px-2 py-0.5 rounded-full mt-0.5"
                  style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-tertiary)" }}
                >
                  {mod.chapters.length} ch
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
