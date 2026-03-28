"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import StarterCard from "@/components/home/StarterCard";
import ModuleCard from "@/components/home/ModuleCard";
import { modules, getTotalChapters, getFlatChapterList } from "@/content/modules";
import { getCompletedCount, getCompletedChapterIds } from "@/lib/progress";
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
  const [continueUrl, setContinueUrl] = useState("/learn/1/1-1");
  const [hasExplicitlyChosen, setHasExplicitlyChosen] = useState(false);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedCount(getCompletedCount());
    setHasExplicitlyChosen(localStorage.getItem("theme-pokemon") !== null);
    const completedIds = getCompletedChapterIds();
    const next = getFlatChapterList().find((c) => !completedIds.includes(c.chapter.id));
    if (next) setContinueUrl(`/learn/${next.moduleId}/${next.chapter.id}`);
  }, []);

  const hasStarted = completedCount > 0;
  const evoLine = EVOLUTION_LINES[pokemon];
  const evoNames = EVOLUTION_NAMES[pokemon];

  // Derive type color from the selected starter
  const currentStarter = STARTERS.find((s) => s.id === pokemon)!;
  const typeColor  = mode === "dark" ? currentStarter.typeDarkColor : currentStarter.typeColor;
  const typeBg     = mode === "dark" ? currentStarter.typeDarkBg   : currentStarter.typeBg;

  // Silhouette opacity — more visible in dark mode
  const silhouetteOpacity = mode === "dark" ? 0.45 : 0.28;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Header */}
      <header
        className="flex items-center justify-between px-4 sm:px-8 py-4 border-b"
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
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-8 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
        >
          For Product Designers
        </div>
        <h1
          className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Learn APIs &<br />Databases
        </h1>
        <p
          className="text-base sm:text-xl max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A story-driven journey from &quot;What&apos;s an API?&quot; to building
          real features with Pokémon data.
        </p>
      </section>

      {/* ── Starter selection ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-10">
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
            Earn XP by completing chapters and watch your Pokémon evolve over time.
          </p>
        </div>

        {/* Starter cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          {STARTERS.map((starter) => {
            const option = POKEMON_OPTIONS.find((p) => p.id === starter.id)!;
            return (
              <StarterCard
                key={starter.id}
                starter={starter}
                option={option}
                isActive={pokemon === starter.id}
                mode={mode}
                onClick={() => {
                  setPokemon(starter.id);
                  setHasExplicitlyChosen(true);
                }}
              />
            );
          })}
        </div>

        {/* Evolution preview strip — TCG card treatment */}
        <div
          key={`evo-card-${pokemon}`}
          className="rounded-2xl border-2 overflow-hidden evo-strip-enter"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: `${typeColor}40`,
          }}
        >
          {/* ── TCG Header strip ── */}
          <div
            className="flex items-center justify-between px-3 sm:px-5 pt-2.5 pb-2"
            style={{ borderBottom: `1px solid ${typeColor}22` }}
          >
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-widest"
              style={{ color: typeColor }}
            >
              Evolution Line
            </span>
            <span
              className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none"
              style={{ backgroundColor: typeBg, color: typeColor }}
            >
              {currentStarter.type}
            </span>
          </div>

          {/* ── Sprite row ── */}
          <div className="px-3 sm:px-5 py-5">
            <div key={pokemon} className="flex items-center justify-center gap-0 evo-strip-enter">

              {/* Stage 0 — base form artwork window */}
              <div className="flex flex-col items-center gap-2 w-16 sm:w-[84px]">
                <div
                  className="relative flex items-center justify-center w-16 h-16 sm:w-[84px] sm:h-[84px] rounded-xl overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 35%, ${typeColor}30 0%, ${typeColor}12 55%, transparent 80%)`,
                    border: `1px solid ${typeColor}40`,
                  }}
                >
                  {/* Corner brackets */}
                  <span className="absolute top-1 left-1 w-2.5 h-2.5 pointer-events-none" style={{ borderTop: `1.5px solid ${typeColor}45`, borderLeft: `1.5px solid ${typeColor}45`, borderRadius: "2px 0 0 0" }} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 pointer-events-none" style={{ borderTop: `1.5px solid ${typeColor}45`, borderRight: `1.5px solid ${typeColor}45`, borderRadius: "0 2px 0 0" }} />
                  <span className="absolute bottom-1 left-1 w-2.5 h-2.5 pointer-events-none" style={{ borderBottom: `1.5px solid ${typeColor}45`, borderLeft: `1.5px solid ${typeColor}45`, borderRadius: "0 0 0 2px" }} />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 pointer-events-none" style={{ borderBottom: `1.5px solid ${typeColor}45`, borderRight: `1.5px solid ${typeColor}45`, borderRadius: "0 0 2px 0" }} />
                  <img
                    src={spriteUrl(evoLine[0])}
                    alt={evoNames[0]}
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-[60px] sm:h-[60px]"
                    style={{
                      imageRendering: "auto",
                      objectFit: "contain",
                      filter: `drop-shadow(0 2px 6px ${typeColor}55)`,
                    }}
                  />
                </div>
                <div className="h-[18px] flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-semibold text-center" style={{ color: typeColor }}>
                    {evoNames[0]}
                  </span>
                </div>
              </div>

              {/* Connector 1 */}
              <div className="flex flex-col items-center gap-1.5 px-2 sm:px-3 w-12 sm:w-[80px] mb-[18px]">
                <span className="text-[9px] sm:text-[10px] font-medium text-center" style={{ color: "var(--text-secondary)" }}>
                  Level up
                </span>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                  <div className="h-full rounded-full evo-xp-bar" style={{ backgroundColor: typeColor }} />
                </div>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: typeColor, opacity: 0.6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Stage 1 — silhouette artwork window */}
              <div className="flex flex-col items-center gap-2 w-16 sm:w-[84px]">
                <div
                  className="relative flex items-center justify-center w-16 h-16 sm:w-[84px] sm:h-[84px] rounded-xl overflow-hidden"
                  style={{
                    background: `${typeColor}08`,
                    border: `1px solid ${typeColor}20`,
                  }}
                >
                  <span className="absolute top-1 left-1 w-2.5 h-2.5 pointer-events-none" style={{ borderTop: `1.5px solid ${typeColor}25`, borderLeft: `1.5px solid ${typeColor}25`, borderRadius: "2px 0 0 0" }} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 pointer-events-none" style={{ borderTop: `1.5px solid ${typeColor}25`, borderRight: `1.5px solid ${typeColor}25`, borderRadius: "0 2px 0 0" }} />
                  <span className="absolute bottom-1 left-1 w-2.5 h-2.5 pointer-events-none" style={{ borderBottom: `1.5px solid ${typeColor}25`, borderLeft: `1.5px solid ${typeColor}25`, borderRadius: "0 0 0 2px" }} />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 pointer-events-none" style={{ borderBottom: `1.5px solid ${typeColor}25`, borderRight: `1.5px solid ${typeColor}25`, borderRadius: "0 0 2px 0" }} />
                  <img
                    src={spriteUrl(evoLine[1])}
                    alt="???"
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-[60px] sm:h-[60px] evo-silhouette-1"
                    style={{ imageRendering: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className="h-[18px] flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>???</span>
                </div>
              </div>

              {/* Connector 2 */}
              <div className="flex flex-col items-center gap-1.5 px-2 sm:px-3 w-12 sm:w-[80px] mb-[18px]">
                <span className="text-[9px] sm:text-[10px] font-medium text-center" style={{ color: "var(--text-secondary)" }}>
                  Level up
                </span>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                  <div className="h-full rounded-full evo-xp-bar-delayed" style={{ backgroundColor: typeColor }} />
                </div>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: typeColor, opacity: 0.6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Stage 2 — silhouette artwork window */}
              <div className="flex flex-col items-center gap-2 w-16 sm:w-[84px]">
                <div
                  className="relative flex items-center justify-center w-16 h-16 sm:w-[84px] sm:h-[84px] rounded-xl overflow-hidden"
                  style={{
                    background: `${typeColor}08`,
                    border: `1px solid ${typeColor}20`,
                  }}
                >
                  <span className="absolute top-1 left-1 w-2.5 h-2.5 pointer-events-none" style={{ borderTop: `1.5px solid ${typeColor}25`, borderLeft: `1.5px solid ${typeColor}25`, borderRadius: "2px 0 0 0" }} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 pointer-events-none" style={{ borderTop: `1.5px solid ${typeColor}25`, borderRight: `1.5px solid ${typeColor}25`, borderRadius: "0 2px 0 0" }} />
                  <span className="absolute bottom-1 left-1 w-2.5 h-2.5 pointer-events-none" style={{ borderBottom: `1.5px solid ${typeColor}25`, borderLeft: `1.5px solid ${typeColor}25`, borderRadius: "0 0 0 2px" }} />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 pointer-events-none" style={{ borderBottom: `1.5px solid ${typeColor}25`, borderRight: `1.5px solid ${typeColor}25`, borderRadius: "0 0 2px 0" }} />
                  <img
                    src={spriteUrl(evoLine[2])}
                    alt="???"
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-[60px] sm:h-[60px] evo-silhouette-2"
                    style={{ imageRendering: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className="h-[18px] flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>???</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── TCG footer strip ── */}
          <div
            className="px-3 sm:px-5 py-2.5 flex items-center justify-center"
            style={{ borderTop: `1px solid ${typeColor}18` }}
          >
            <p className="text-[10px] sm:text-xs text-center" style={{ color: "var(--text-secondary)" }}>
              Complete chapters to unlock evolved forms
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-16 flex items-center justify-center gap-4">
        <Button size="lg" onClick={() => router.push(continueUrl)}>
          {hasStarted ? "Continue your journey" : "Begin your journey"} →
        </Button>
      </section>

      {/* Modules overview */}
      <section
        className="max-w-4xl mx-auto px-4 sm:px-8 pb-20 border-t pt-12"
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
            <ModuleCard
              key={module.id}
              moduleId={module.id}
              title={module.title}
              description={module.description}
              chapterCount={module.chapters.length}
              icon={moduleIcons[i]}
              onClick={() =>
                router.push(`/learn/${module.id}/${module.chapters[0].id}`)
              }
            />
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
