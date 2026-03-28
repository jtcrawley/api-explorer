"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import StarterCard from "@/components/home/StarterCard";
import { getTotalChapters, getFlatChapterList } from "@/content/modules";
import { getCompletedCount, getCompletedChapterIds } from "@/lib/progress";
import { useTheme, type PokemonTheme } from "@/components/ui/ThemeProvider";
import { POKEMON_OPTIONS } from "@/components/ui/ThemePicker";
import {
  EVOLUTION_LINES,
  EVOLUTION_NAMES,
  spriteUrl,
  getEvolutionStage,
  getStageProgress,
} from "@/lib/evolution";

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


export default function HomePage() {
  const router = useRouter();
  const { pokemon, mode, setPokemon } = useTheme();
  const [completedCount,     setCompletedCount]     = useState(0);
  const [continueUrl,        setContinueUrl]        = useState("/learn/1/1-0");
  const [hasExplicitlyChosen, setHasExplicitlyChosen] = useState(false);
  const [isLoaded,           setIsLoaded]           = useState(false);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedCount(getCompletedCount());
    setHasExplicitlyChosen(localStorage.getItem("theme-pokemon") !== null);
    const completedIds = getCompletedChapterIds();
    const next = getFlatChapterList().find((c) => !completedIds.includes(c.chapter.id));
    if (next) setContinueUrl(`/learn/${next.moduleId}/${next.chapter.id}`);
    setIsLoaded(true);
  }, []);

  const hasStarted = completedCount > 0;
  const evoLine    = EVOLUTION_LINES[pokemon];
  const evoNames   = EVOLUTION_NAMES[pokemon];

  // Evolution stage based on progress
  const progressPercent  = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;
  const stage            = getEvolutionStage(progressPercent);
  const stageProgress    = getStageProgress(progressPercent);
  const evolvedSprite    = spriteUrl(evoLine[stage]);
  const evolvedName      = evoNames[stage];
  const nextStageName    = stage < 2 ? evoNames[stage + 1] : null;

  // Derive type color from the selected starter
  const currentStarter = STARTERS.find((s) => s.id === pokemon)!;
  const typeColor  = mode === "dark" ? currentStarter.typeDarkColor : currentStarter.typeColor;
  const typeBg     = mode === "dark" ? currentStarter.typeDarkBg   : currentStarter.typeBg;

  // Silhouette opacity — pure black, kept low to stay mysterious
  const silhouetteOpacity = mode === "dark" ? 0.18 : 0.13;

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
      <section className="relative overflow-hidden">
        {/* ── Dot grid background ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.35 }}
        >
          <defs>
            <pattern id="hero-dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1" fill="var(--accent)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
        </svg>

        {/* Accent bloom — radial glow behind the heading */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: "90%", maxWidth: 700, height: 420,
            background: "radial-gradient(ellipse at 50% 35%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 65%)",
          }}
        />

        {/* Fade grid out toward bottom so starters section reads cleanly */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, transparent 35%, var(--bg-primary) 100%)" }}
        />

        {/* Content */}
        <div
          className="relative max-w-3xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-10 text-center"
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          {/* ── Returning user: personalised trainer status ── */}
          {hasStarted ? (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-8" style={{ color: "var(--accent)" }}>
                Welcome back, Trainer
              </p>

              {/* Trainer status card */}
              <div
                className="inline-flex items-center gap-5 sm:gap-6 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl border mb-8 text-left"
                style={{
                  borderColor: "var(--accent)30",
                  backgroundColor: "color-mix(in srgb, var(--bg-secondary) 80%, transparent)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 40px -12px color-mix(in srgb, var(--accent) 25%, transparent)",
                }}
              >
                {/* Sprite */}
                <div
                  className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center"
                  style={{
                    background: `radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 70%)`,
                    border: "1px solid var(--accent)30",
                  }}
                >
                  <img
                    src={evolvedSprite}
                    alt={evolvedName}
                    width={64} height={64}
                    style={{ imageRendering: "auto", objectFit: "contain", width: 52, height: 52, filter: "drop-shadow(0 2px 8px var(--accent)55)" }}
                  />
                </div>

                {/* Stats */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base sm:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {evolvedName}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>
                      Stage {stage + 1}
                    </span>
                  </div>

                  {/* XP bar */}
                  <div className="w-44 sm:w-56 h-1.5 rounded-full overflow-hidden mb-1.5" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.round(stageProgress * 100)}%`, backgroundColor: "var(--accent)" }}
                    />
                  </div>

                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {completedCount} of {totalChapters} chapters
                    {nextStageName && <span> · evolves into {nextStageName}</span>}
                  </p>
                </div>
              </div>

              <div>
                <Button size="lg" onClick={() => router.push(continueUrl)}>
                  Continue your journey →
                </Button>
              </div>
            </>
          ) : (
            /* ── First visit: editorial heading ── */
            <>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
              >
                For Product Designers
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
                Learn<br />
                <span style={{ color: "var(--accent)" }}>APIs & Databases</span>
              </h1>
              <p className="text-base sm:text-xl max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                A story-driven journey from &quot;What&apos;s an API?&quot; to building real features with Pokémon data.
              </p>
            </>
          )}
        </div>
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

      {/* CTA — only shown on first visit; returning users have the button in the hero */}
      {!hasStarted && (
        <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-16 flex items-center justify-center">
          <Button size="lg" onClick={() => router.push(continueUrl)}>
            Begin your journey →
          </Button>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center py-8 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs mb-2" style={{ color: "var(--text-tertiary)" }}>
          Built for designers who want to speak the language of APIs.
        </p>
        <p className="text-[10px]" style={{ color: "var(--text-tertiary)", opacity: 0.55 }}>
          Fan project — not affiliated with Nintendo, Game Freak, or The Pokémon Company.
          Pokémon and all related names are trademarks of their respective owners.
        </p>
      </footer>
    </div>
  );
}
