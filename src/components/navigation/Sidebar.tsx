"use client";

import { useState, useEffect, useRef } from "react";
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
  const sidebarRef = useRef<HTMLElement>(null);

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

  // Auto-close when focus moves outside the sidebar (keyboard tab-out)
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: FocusEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
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

  // Silhouette opacity: pure black, low opacity — keeps it mysterious
  const silhouetteOpacity = mode === "dark" ? 0.18 : 0.13;

  return (
    <>
      {/* ── Mobile hamburger — only visible when sidebar is closed ── */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-xl border transition-colors"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
          aria-label="Open menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

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
        ref={sidebarRef}
        className={`
          w-72 fixed left-0 top-0 z-40 flex flex-col border-r
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{
          height: "100dvh",
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo + mobile close button */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
          <Link href="/" className="block" onClick={() => setMobileOpen(false)}>
            <Logo size={28} />
          </Link>
          {/* Close button — only shown on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl border transition-colors"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
                      backgroundColor: "var(--accent-light)",
                      color: "var(--accent)",
                    }}
                  >
                    {moduleCompleted ? "✓" : module.id}
                  </span>
                  <span
                    className="text-sm font-medium truncate min-w-0"
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
                                ? "text-white"
                                : "border"
                            }`}
                            style={
                              isComplete
                                ? { backgroundColor: "var(--accent)" }
                                : { borderColor: "var(--border)" }
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

        {/* Dashboard link */}
        <div className="px-3 pb-1">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              pathname === "/dashboard"
                ? "bg-[var(--accent-light)] font-medium"
                : "hover:bg-[var(--bg-tertiary)]"
            }`}
            style={{
              color: pathname === "/dashboard" ? "var(--accent)" : "var(--text-secondary)",
            }}
          >
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: pathname === "/dashboard" ? "var(--accent-light)" : "var(--bg-tertiary)",
                color: pathname === "/dashboard" ? "var(--accent)" : "var(--text-tertiary)",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>

        {/* Glossary link */}
        <div className="px-3 pb-2">
          <Link
            href="/glossary"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              pathname === "/glossary"
                ? "bg-[var(--accent-light)] font-medium"
                : "hover:bg-[var(--bg-tertiary)]"
            }`}
            style={{
              color: pathname === "/glossary" ? "var(--accent)" : "var(--text-secondary)",
            }}
          >
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-tertiary)",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="text-sm font-medium">Glossary</span>
          </Link>
        </div>

        {/* Bottom controls */}

        {/* Chapter progress label — sits above the border */}
        <div className="px-4 pb-2 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
            Chapter progress
          </span>
          <span className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>
            {completedCount}/{totalChapters}
          </span>
        </div>

        <div className="border-t flex-shrink-0" style={{ borderColor: "var(--border)" }}>

          {/* Trainer card — IS the ThemePicker trigger */}
          <div className="px-3 pt-3 pb-3">
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
