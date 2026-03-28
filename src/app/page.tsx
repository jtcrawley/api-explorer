"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { modules, getTotalChapters } from "@/content/modules";
import { getCompletedCount } from "@/lib/progress";
import { useTheme, type PokemonTheme } from "@/components/ui/ThemeProvider";
import { POKEMON_OPTIONS } from "@/components/ui/ThemePicker";
import { EVOLUTION_LINES, EVOLUTION_NAMES, spriteUrl } from "@/lib/evolution";

const STARTERS: {
  id: PokemonTheme;
  type: string;
  typeColor: string;
  typeBg: string;
  typeDarkColor: string;
  typeDarkBg: string;
  tagline: string;
  description: string;
}[] = [
  {
    id: "bulbasaur",
    type: "Grass",
    typeColor: "#15803d",
    typeBg: "#dcfce7",
    typeDarkColor: "#4ade80",
    typeDarkBg: "#14532d",
    tagline: "Patient & methodical",
    description: "Takes a steady approach, growing stronger with every chapter.",
  },
  {
    id: "squirtle",
    type: "Water",
    typeColor: "#0369a1",
    typeBg: "#e0f2fe",
    typeDarkColor: "#38bdf8",
    typeDarkBg: "#0c4a6e",
    tagline: "Curious & adaptable",
    description: "Dives deep into every concept, flowing through complexity with ease.",
  },
  {
    id: "charmander",
    type: "Fire",
    typeColor: "#c2410c",
    typeBg: "#ffedd5",
    typeDarkColor: "#fb923c",
    typeDarkBg: "#7c2d12",
    tagline: "Bold & ambitious",
    description: "Charges through challenges, burning brighter with every milestone.",
  },
];

const moduleIcons = [
  <svg key="zap" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="code" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="db" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2}/><path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  <svg key="lock" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="5" y="11" width="14" height="10" rx="2" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 018 0v4" /></svg>,
  <svg key="star" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
];

export default function HomePage() {
  const router = useRouter();
  const { pokemon, mode, setPokemon } = useTheme();
  const [completedCount, setCompletedCount] = useState(0);
  const [hasExplicitlyChosen, setHasExplicitlyChosen] = useState(false);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedCount(getCompletedCount());
    setHasExplicitlyChosen(localStorage.getItem("theme-pokemon") !== null);
  }, []);

  const hasStarted = completedCount > 0;
  const evoLine = EVOLUTION_LINES[pokemon];
  const evoNames = EVOLUTION_NAMES[pokemon];

  // Silhouette opacity — more visible in dark mode
  const silhouetteOpacity = mode === "dark" ? 0.45 : 0.28;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <Logo size={28} />
        {hasStarted && (
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            Dashboard ({completedCount}/{totalChapters})
          </button>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-16 pb-8 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
        >
          For Product Designers
        </div>
        <h1
          className="text-5xl font-bold tracking-tight leading-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Learn APIs &<br />Databases
        </h1>
        <p
          className="text-xl max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A story-driven journey from &quot;What&apos;s an API?&quot; to building
          real features with Pokémon data.
        </p>
      </section>

      {/* ── Starter selection ── */}
      <section className="max-w-3xl mx-auto px-8 pb-10">
        <div className="text-center mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "var(--accent)" }}
          >
            {hasExplicitlyChosen ? "Your starter" : "Step 1"}
          </p>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {hasExplicitlyChosen
              ? "Switch your starter anytime"
              : "Choose your starter Pokémon"}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Your Pokémon earns XP as you complete chapters — and evolves at ⅓ and ⅔ of the course.
          </p>
        </div>

        {/* Starter cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STARTERS.map((starter) => {
            const option = POKEMON_OPTIONS.find((p) => p.id === starter.id)!;
            const isActive = pokemon === starter.id;
            const typeColor = mode === "dark" ? starter.typeDarkColor : starter.typeColor;
            const typeBg = mode === "dark" ? starter.typeDarkBg : starter.typeBg;
            const accentColor = mode === "dark" ? option.accentDark : option.accent;

            return (
              <button
                key={starter.id}
                onClick={() => {
                  setPokemon(starter.id);
                  setHasExplicitlyChosen(true);
                }}
                className="relative flex flex-col items-center gap-3 px-4 py-6 rounded-2xl border-2 transition-colors duration-200 text-center"
                style={{
                  borderColor: isActive ? accentColor : "var(--border)",
                  backgroundColor: isActive ? "var(--accent-light)" : "var(--bg-secondary)",
                }}
              >
                {/* Checkmark — always reserved space so layout doesn't shift */}
                <span
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-opacity duration-200"
                  style={{
                    backgroundColor: accentColor,
                    opacity: isActive ? 1 : 0,
                    pointerEvents: "none",
                  }}
                >
                  ✓
                </span>

                {/* Fixed sprite box — same size for all three */}
                <div className="flex items-center justify-center" style={{ width: 80, height: 80 }}>
                  <img
                    src={option.sprite}
                    alt={option.label}
                    width={80}
                    height={80}
                    style={{ imageRendering: "auto", objectFit: "contain", maxWidth: 80, maxHeight: 80 }}
                  />
                </div>

                <div className="w-full">
                  <p
                    className="text-base font-bold mb-1 transition-colors duration-200"
                    style={{ color: isActive ? accentColor : "var(--text-primary)" }}
                  >
                    {option.label}
                  </p>

                  <span
                    className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                    style={{ backgroundColor: typeBg, color: typeColor }}
                  >
                    {starter.type}
                  </span>

                  <p
                    className="text-xs font-medium mb-1 transition-colors duration-200"
                    style={{ color: isActive ? accentColor : "var(--text-secondary)" }}
                  >
                    {starter.tagline}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {starter.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Evolution preview strip — animated XP bars */}
        <div
          className="px-6 py-6 rounded-2xl border"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          {/* Fixed-height row — nothing moves when Pokémon changes */}
          <div className="flex items-center justify-center gap-0">

            {/* Stage 0 — base form */}
            <div className="flex flex-col items-center gap-2" style={{ width: 80 }}>
              {/* Fixed sprite box */}
              <div className="flex items-center justify-center" style={{ width: 80, height: 72 }}>
                <img
                  src={spriteUrl(evoLine[0])}
                  alt={evoNames[0]}
                  width={64}
                  height={64}
                  style={{ imageRendering: "auto", objectFit: "contain", maxWidth: 64, maxHeight: 64 }}
                />
              </div>
              {/* Fixed-height label */}
              <div style={{ height: 18 }} className="flex items-center justify-center">
                <span className="text-xs font-semibold text-center" style={{ color: "var(--accent)" }}>
                  {evoNames[0]}
                </span>
              </div>
            </div>

            {/* Segment 1 — XP bar connector */}
            <div className="flex flex-col items-center gap-1.5 px-3" style={{ width: 88, marginBottom: 18 }}>
              <span className="text-[10px] font-medium text-center" style={{ color: "var(--text-secondary)" }}>
                Level up
              </span>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                <div className="h-full rounded-full evo-xp-bar" style={{ backgroundColor: "var(--accent)" }} />
              </div>
              <svg className="w-3.5 h-3.5" style={{ color: "var(--text-secondary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Stage 1 — silhouette */}
            <div className="flex flex-col items-center gap-2" style={{ width: 80 }}>
              <div className="flex items-center justify-center" style={{ width: 80, height: 72 }}>
                <img
                  src={spriteUrl(evoLine[1])}
                  alt="???"
                  width={64}
                  height={64}
                  className="evo-silhouette-1"
                  style={{ imageRendering: "auto", objectFit: "contain", maxWidth: 64, maxHeight: 64 }}
                />
              </div>
              <div style={{ height: 18 }} className="flex items-center justify-center">
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>???</span>
              </div>
            </div>

            {/* Segment 2 — XP bar connector (delayed) */}
            <div className="flex flex-col items-center gap-1.5 px-3" style={{ width: 88, marginBottom: 18 }}>
              <span className="text-[10px] font-medium text-center" style={{ color: "var(--text-secondary)" }}>
                Level up
              </span>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                <div className="h-full rounded-full evo-xp-bar-delayed" style={{ backgroundColor: "var(--accent)" }} />
              </div>
              <svg className="w-3.5 h-3.5" style={{ color: "var(--text-secondary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Stage 2 — silhouette */}
            <div className="flex flex-col items-center gap-2" style={{ width: 80 }}>
              <div className="flex items-center justify-center" style={{ width: 80, height: 72 }}>
                <img
                  src={spriteUrl(evoLine[2])}
                  alt="???"
                  width={64}
                  height={64}
                  className="evo-silhouette-2"
                  style={{ imageRendering: "auto", objectFit: "contain", maxWidth: 64, maxHeight: 64 }}
                />
              </div>
              <div style={{ height: 18 }} className="flex items-center justify-center">
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>???</span>
              </div>
            </div>
          </div>

          <p
            className="text-xs text-center mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Complete chapters to unlock evolved forms
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-8 pb-16 flex items-center justify-center gap-4">
        <Button size="lg" onClick={() => router.push("/learn/1/1-1")}>
          {hasStarted ? "Continue your journey" : "Begin your journey"} →
        </Button>
      </section>

      {/* Modules overview */}
      <section
        className="max-w-4xl mx-auto px-8 pb-20 border-t pt-12"
        style={{ borderColor: "var(--border)" }}
      >
        <h3
          className="text-sm font-medium uppercase tracking-wider mb-6 text-center"
          style={{ color: "var(--text-tertiary)" }}
        >
          Your Learning Journey
        </h3>
        <div className="space-y-4">
          {modules.map((module, i) => (
            <Card
              key={module.id}
              hover
              onClick={() =>
                router.push(`/learn/${module.id}/${module.chapters[0].id}`)
              }
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {moduleIcons[i]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
                      Module {module.id}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      {module.chapters.length} chapters
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {module.title}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {module.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-4"
                  style={{ color: "var(--text-tertiary)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          Built for designers who want to speak the language of APIs.
        </p>
      </footer>
    </div>
  );
}
