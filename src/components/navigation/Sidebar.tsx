"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import ThemePicker from "@/components/ui/ThemePicker";
import { modules } from "@/content/modules";
import { getCompletedChapterIds } from "@/lib/progress";
import { getTotalChapters } from "@/content/modules";
import { useTheme } from "@/components/ui/ThemeProvider";
import {
  EVOLUTION_LINES,
  EVOLUTION_NAMES,
  getEvolutionStage,
  getStageProgress,
  spriteUrl,
} from "@/lib/evolution";

export default function Sidebar() {
  const pathname = usePathname();
  const { pokemon, mode } = useTheme();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedIds(getCompletedChapterIds());
    const interval = setInterval(() => {
      setCompletedIds(getCompletedChapterIds());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const match = pathname.match(/\/learn\/(\d+)\//);
    if (match) setExpandedModule(match[1]);
  }, [pathname]);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const completedCount = completedIds.length;
  const progressPercent = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;

  // Evolution XP system
  const stage = getEvolutionStage(progressPercent);
  const stageProgress = getStageProgress(progressPercent);
  const evolutionLine = EVOLUTION_LINES[pokemon];
  const evolutionNames = EVOLUTION_NAMES[pokemon];
  const currentSprite = spriteUrl(evolutionLine[stage]);
  const isMaxStage = stage === 2;
  const nextSprite = isMaxStage ? null : spriteUrl(evolutionLine[stage + 1]);
  const currentName = evolutionNames[stage];
  const nextName = isMaxStage ? null : evolutionNames[stage + 1];

  // Silhouette opacity: more visible in dark mode
  const silhouetteOpacity = mode === "dark" ? 0.45 : 0.2;

  return (
    <>
      {/* ── Mobile hamburger button ── */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-xl border transition-colors"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          w-72 h-screen fixed left-0 top-0 z-40 flex flex-col border-r
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo */}
        <div className="p-6 pb-4">
          <Link href="/" className="block" onClick={() => setMobileOpen(false)}>
            <Logo size={28} />
          </Link>
        </div>

        {/* Navigation — only this section scrolls */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto min-h-0">
          {modules.map((module) => {
            const isExpanded = expandedModule === module.id;
            const moduleCompleted = module.chapters.every((c) =>
              completedIds.includes(c.id)
            );

            return (
              <div key={module.id} className="mb-1">
                <button
                  onClick={() =>
                    setExpandedModule(isExpanded ? null : module.id)
                  }
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors hover:bg-[var(--bg-tertiary)]"
                >
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: moduleCompleted
                        ? "var(--success-light)"
                        : "var(--accent-light)",
                      color: moduleCompleted
                        ? "var(--success)"
                        : "var(--accent)",
                    }}
                  >
                    {moduleCompleted ? "✓" : module.id}
                  </span>
                  <span
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {module.title}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-auto flex-shrink-0 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                    style={{ color: "var(--text-tertiary)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="ml-5 mt-1 space-y-0.5">
                    {module.chapters.map((chapter) => {
                      const isActive =
                        pathname === `/learn/${module.id}/${chapter.id}`;
                      const isComplete = completedIds.includes(chapter.id);

                      return (
                        <Link
                          key={chapter.id}
                          href={`/learn/${module.id}/${chapter.id}`}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-[var(--accent-light)] font-medium"
                              : "hover:bg-[var(--bg-tertiary)]"
                          }`}
                          style={{
                            color: isActive
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                          }}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                              isComplete
                                ? "bg-[var(--success)] text-white"
                                : "border"
                            }`}
                            style={
                              !isComplete
                                ? { borderColor: "var(--border)" }
                                : undefined
                            }
                          >
                            {isComplete ? "✓" : ""}
                          </span>
                          <span className="truncate">{chapter.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom controls */}

        {/* Chapter progress label — sits above the border */}
        <div className="px-6 pb-2 flex items-center justify-between">
          <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
            Chapter progress
          </span>
          <span className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>
            {completedCount}/{totalChapters}
          </span>
        </div>

        <div className="border-t" style={{ borderColor: "var(--border)" }}>

          {/* Trainer card — IS the ThemePicker trigger */}
          <div className="px-3 pb-3">
            <ThemePicker
              renderTrigger={({ ref, onClick, open }) => (
                <button
                  ref={ref}
                  onClick={onClick}
                  aria-expanded={open}
                  aria-label="Switch Pokémon theme"
                  className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors text-left group"
                  style={{
                    outline: open ? "1.5px solid var(--accent)" : "1.5px solid transparent",
                  }}
                >
                  {/* Current evolved sprite */}
                  <img
                    src={currentSprite}
                    alt={currentName}
                    width={48}
                    height={48}
                    style={{ imageRendering: "auto", objectFit: "contain", flexShrink: 0 }}
                  />

                  {/* Name + XP bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {currentName}
                      </span>
                      <span
                        className="text-[11px] font-medium flex-shrink-0 ml-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {Math.round(progressPercent)}%
                      </span>
                    </div>

                    {/* XP bar — progress within current evolution stage */}
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--bg-tertiary)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${stageProgress * 100}%`,
                          backgroundColor: "var(--accent)",
                        }}
                      />
                    </div>

                    {/* Next evolution — right-aligned under the bar */}
                    <div className="mt-1 text-right">
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {isMaxStage ? "✦ MAX LEVEL" : `→ ${nextName}`}
                      </span>
                    </div>
                  </div>

                  {/* Next-stage silhouette — more visible in dark mode */}
                  {nextSprite ? (
                    <img
                      src={nextSprite}
                      alt="???"
                      width={32}
                      height={32}
                      style={{
                        imageRendering: "auto",
                        objectFit: "contain",
                        flexShrink: 0,
                        filter: `brightness(0) opacity(${silhouetteOpacity})`,
                      }}
                    />
                  ) : (
                    <svg
                      className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
                      style={{ color: "var(--text-tertiary)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )}
                </button>
              )}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
