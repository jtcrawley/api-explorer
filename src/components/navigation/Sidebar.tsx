"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import ThemePicker from "@/components/ui/ThemePicker";
import { modules } from "@/content/modules";
import { getCompletedChapterIds, getCompletedCount } from "@/lib/progress";
import { getTotalChapters } from "@/content/modules";

export default function Sidebar() {
  const pathname = usePathname();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
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

  const completedCount = completedIds.length;
  const progressPercent = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;

  return (
    <aside
      className="w-72 h-screen fixed left-0 top-0 flex flex-col border-r overflow-y-auto"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link href="/" className="block">
          <Logo size={28} />
        </Link>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: "var(--text-tertiary)" }}>Progress</span>
          <span style={{ color: "var(--text-secondary)" }}>
            {completedCount}/{totalChapters}
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--bg-tertiary)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 bg-accent-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4">
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
                  {moduleCompleted ? "\u2713" : module.id}
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
                      pathname ===
                      `/learn/${module.id}/${chapter.id}`;
                    const isComplete = completedIds.includes(chapter.id);

                    return (
                      <Link
                        key={chapter.id}
                        href={`/learn/${module.id}/${chapter.id}`}
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
                          {isComplete ? "\u2713" : ""}
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
      <div
        className="p-4 border-t flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <Link
          href="/playground"
          className="text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          Playground
        </Link>
        <ThemePicker />
      </div>
    </aside>
  );
}
