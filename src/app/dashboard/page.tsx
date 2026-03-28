"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import { modules, getTotalChapters, getFlatChapterList, type Module } from "@/content/modules";
import { getCompletedChapterIds } from "@/lib/progress";
import { useTheme } from "@/components/ui/ThemeProvider";
import {
  getEvolutionStage,
  EVOLUTION_LINES,
  EVOLUTION_NAMES,
  spriteUrl,
} from "@/lib/evolution";

/* ── Module icons (same set as the home page) ── */
const MODULE_ICONS = [
  <svg key="zap"  className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="code" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="db"   className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2}/><path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  <svg key="lock" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="5" y="11" width="14" height="10" rx="2" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 018 0v4" /></svg>,
  <svg key="star" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
];

/* ── Expandable module card ── */
interface ExpandableCardProps {
  module: Module;
  moduleIndex: number;
  completedIds: string[];
}

function ExpandableModuleCard({ module, moduleIndex, completedIds }: ExpandableCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded]   = useState(false);
  const [isHovered,  setIsHovered]    = useState(false);
  const [mouse,      setMouse]        = useState({ x: 0.5, y: 0.5 });

  const completedInModule = module.chapters.filter((c) => completedIds.includes(c.id)).length;
  const moduleTotal       = module.chapters.length;
  const progressPercent   = moduleTotal > 0 ? (completedInModule / moduleTotal) * 100 : 0;
  const isComplete        = completedInModule === moduleTotal;
  const firstIncomplete   = module.chapters.find((c) => !completedIds.includes(c.id));
  const hasStarted        = completedInModule > 0;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  const handleContinue = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = firstIncomplete
      ? `/learn/${module.id}/${firstIncomplete.id}`
      : `/learn/${module.id}/${module.chapters[0].id}`;
    router.push(target);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded((v) => !v)}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded((v) => !v)}
      className="relative rounded-2xl border-2 overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: isHovered ? "var(--accent)" : isComplete ? "var(--accent)" : "var(--border)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isHovered
          ? "0 16px 40px -12px color-mix(in srgb, var(--accent) 38%, transparent), 0 4px 14px -4px rgba(0,0,0,0.12)"
          : isComplete
          ? "0 4px 16px -6px color-mix(in srgb, var(--accent) 25%, transparent)"
          : "none",
      }}
    >
      {/* Hex texture */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -1,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          maskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.03) 35%, transparent 65%)`,
          WebkitMaskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.03) 35%, transparent 65%)`,
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`dot-dash-${module.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="var(--accent)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dot-dash-${module.id})`} />
      </svg>

      {/* Specular */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.18s ease",
          background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, color-mix(in srgb, var(--accent) 13%, transparent) 0%, color-mix(in srgb, var(--accent) 3%, transparent) 45%, transparent 68%)`,
        }}
      />

      {/* Header strip */}
      <div
        className="flex items-center justify-between px-3 sm:px-4 pt-3 pb-2"
        style={{ borderBottom: "1px solid var(--accent)22" }}
      >
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Module {module.id}
        </span>
        <span
          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none"
          style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
        >
          {isComplete ? "✓ Complete" : `${completedInModule}/${moduleTotal}`}
        </span>
      </div>

      {/* Card body */}
      <div className="flex items-center gap-4 px-3 sm:px-4 py-3 sm:py-4">
        {/* Icon */}
        <div
          className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center"
          style={{
            background: isHovered
              ? `radial-gradient(ellipse at 50% 35%, var(--accent)30 0%, var(--accent)12 55%, transparent 80%)`
              : "var(--accent)10",
            border: `1px solid ${isHovered ? "var(--accent)40" : "var(--accent)20"}`,
            transition: "background 0.3s ease, border-color 0.2s ease",
            color: "var(--accent)",
          }}
        >
          <span className="absolute top-1 left-1 w-2 h-2" style={{ borderTop: "1.5px solid var(--accent)35", borderLeft: "1.5px solid var(--accent)35", borderRadius: "2px 0 0 0" }} />
          <span className="absolute top-1 right-1 w-2 h-2" style={{ borderTop: "1.5px solid var(--accent)35", borderRight: "1.5px solid var(--accent)35", borderRadius: "0 2px 0 0" }} />
          <span className="absolute bottom-1 left-1 w-2 h-2" style={{ borderBottom: "1.5px solid var(--accent)35", borderLeft: "1.5px solid var(--accent)35", borderRadius: "0 0 0 2px" }} />
          <span className="absolute bottom-1 right-1 w-2 h-2" style={{ borderBottom: "1.5px solid var(--accent)35", borderRight: "1.5px solid var(--accent)35", borderRadius: "0 0 2px 0" }} />
          <div style={{ filter: isHovered ? `drop-shadow(0 2px 6px var(--accent)60)` : "none", transition: "filter 0.25s ease" }}>
            {MODULE_ICONS[moduleIndex]}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4
            className="text-base sm:text-lg font-semibold mb-0.5 truncate"
            style={{ color: isHovered ? "var(--accent)" : "var(--text-primary)", transition: "color 0.2s ease" }}
          >
            {module.title}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {module.description}
          </p>
        </div>

        {/* Expand chevron */}
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          style={{
            color: isHovered ? "var(--accent)" : "var(--text-tertiary)",
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)",
          }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Module progress bar */}
      <div className="px-3 sm:px-4 pb-2.5 pt-1.5" style={{ borderTop: "1px solid var(--accent)12" }}>
        <div className="flex items-center gap-1.5">
          <div className="h-1 rounded-full flex-1 overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: "var(--accent)",
                transition: "width 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)",
                opacity: progressPercent > 0 ? 0.8 : 0.4,
              }}
            />
          </div>
          <span className="text-[9px] font-medium uppercase tracking-wider flex-shrink-0" style={{ color: "var(--text-tertiary)" }}>
            {progressPercent > 0 ? `${Math.round(progressPercent)}%` : "Start →"}
          </span>
        </div>
      </div>

      {/* Expanded chapter list */}
      {isExpanded && (
        <div
          className="border-t px-3 sm:px-4 pt-4 pb-4"
          style={{ borderColor: "var(--accent)18", backgroundColor: "var(--bg-primary)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1 mb-4">
            {module.chapters.map((chapter) => {
              const done    = completedIds.includes(chapter.id);
              const isCurrent = !done && chapter === firstIncomplete;
              return (
                <button
                  key={chapter.id}
                  onClick={() => router.push(`/learn/${module.id}/${chapter.id}`)}
                  className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors hover:bg-[var(--bg-tertiary)]"
                >
                  {/* Completion indicator */}
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                    style={
                      done
                        ? { backgroundColor: "var(--accent)", color: "white" }
                        : isCurrent
                        ? { border: "1.5px solid var(--accent)", color: "var(--accent)" }
                        : { border: "1.5px solid var(--border)" }
                    }
                  >
                    {done ? "✓" : ""}
                  </span>

                  <span
                    className="text-sm flex-1 truncate"
                    style={{
                      color: done
                        ? "var(--text-tertiary)"
                        : isCurrent
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                      textDecoration: done ? "line-through" : "none",
                      fontWeight: isCurrent ? 600 : 400,
                    }}
                  >
                    {chapter.title}
                  </span>

                  <span className="text-[10px] flex-shrink-0" style={{ color: "var(--text-tertiary)" }}>
                    {chapter.readTime}m
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          {!isComplete && (
            <button
              onClick={handleContinue}
              className="w-full text-sm font-semibold py-2.5 rounded-xl text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {hasStarted ? "Continue" : "Start Module"}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {isComplete && (
            <div
              className="w-full text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
              style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
            >
              ✓ Module Complete
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Dashboard page ── */
export default function DashboardPage() {
  const router = useRouter();
  const { pokemon, mode } = useTheme();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedIds(getCompletedChapterIds());
    const interval = setInterval(() => setCompletedIds(getCompletedChapterIds()), 2000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = totalChapters > 0 ? (completedIds.length / totalChapters) * 100 : 0;
  const stage           = getEvolutionStage(progressPercent);
  const currentSprite   = spriteUrl(EVOLUTION_LINES[pokemon][stage]);
  const currentName     = EVOLUTION_NAMES[pokemon][stage];

  const flatChapters = getFlatChapterList();
  const nextChapter  = flatChapters.find((c) => !completedIds.includes(c.chapter.id));

  return (
    <div className="flex">
      <Sidebar />
      <main className="md:ml-72 flex-1 min-h-screen">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center px-16 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Dashboard</span>
        </div>

        <div className="p-6 sm:p-10">
          <div className="max-w-3xl mx-auto">

            {/* Progress hero */}
            <div
              className="rounded-2xl border-2 overflow-hidden mb-8"
              style={{ borderColor: "var(--accent)40", backgroundColor: "var(--bg-secondary)" }}
            >
              {/* Header strip */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-3.5 pb-3" style={{ borderBottom: "1px solid var(--accent)18" }}>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                  Trainer Progress
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {completedIds.length}/{totalChapters} chapters
                </span>
              </div>

              {/* Body */}
              <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4">
                {/* Sprite */}
                <div
                  className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center"
                  style={{
                    background: `radial-gradient(ellipse at 50% 35%, var(--accent)25 0%, var(--accent)08 60%, transparent 85%)`,
                    border: "1px solid var(--accent)30",
                  }}
                >
                  <img
                    src={currentSprite}
                    alt={currentName}
                    width={64}
                    height={64}
                    style={{ imageRendering: "auto", objectFit: "contain", width: 52, height: 52, filter: "drop-shadow(0 2px 6px var(--accent)50)" }}
                  />
                </div>

                {/* Stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-base sm:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {currentName}
                    </span>
                    <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  {/* Overall XP bar */}
                  <div className="h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${progressPercent}%`, backgroundColor: "var(--accent)" }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {completedIds.length} of {totalChapters} chapters completed
                  </p>
                </div>
              </div>

              {/* Continue CTA */}
              {nextChapter && (
                <div className="px-4 sm:px-6 pb-4">
                  <button
                    onClick={() => router.push(`/learn/${nextChapter.moduleId}/${nextChapter.chapter.id}`)}
                    className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    {completedIds.length > 0 ? "Continue" : "Begin your journey"}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Module cards */}
            <div className="space-y-4">
              {modules.map((module, i) => (
                <ExpandableModuleCard
                  key={module.id}
                  module={module}
                  moduleIndex={i}
                  completedIds={completedIds}
                />
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
