"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { modules, getTotalChapters, getFlatChapterList } from "@/content/modules";
import { getCompletedChapterIds } from "@/lib/progress";

export default function DashboardPage() {
  const router = useRouter();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedIds(getCompletedChapterIds());
  }, []);

  const progressPercent = totalChapters > 0 ? (completedIds.length / totalChapters) * 100 : 0;
  const flatChapters = getFlatChapterList();
  const nextChapter = flatChapters.find(
    (c) => !completedIds.includes(c.chapter.id)
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-72 flex-1 min-h-screen p-12">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Dashboard
          </h1>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
            Track your progress through the learning journey.
          </p>

          {/* Overall progress */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Overall Progress
              </h2>
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden mb-4"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 bg-accent-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {completedIds.length} of {totalChapters} chapters completed
            </p>
            {nextChapter && (
              <div className="mt-4">
                <Button
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/learn/${nextChapter.moduleId}/${nextChapter.chapter.id}`
                    )
                  }
                >
                  Continue: {nextChapter.chapter.title}
                </Button>
              </div>
            )}
          </Card>

          {/* Module breakdown */}
          <div className="space-y-4">
            {modules.map((module) => {
              const moduleCompleted = module.chapters.filter((c) =>
                completedIds.includes(c.id)
              ).length;
              const moduleTotal = module.chapters.length;
              const modulePercent = (moduleCompleted / moduleTotal) * 100;

              return (
                <Card key={module.id}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        Module {module.id}
                      </span>
                      <h3
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {module.title}
                      </h3>
                    </div>
                    {moduleCompleted === moduleTotal ? (
                      <Badge variant="success">Complete</Badge>
                    ) : (
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {moduleCompleted}/{moduleTotal}
                      </span>
                    )}
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bg-tertiary)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-accent-500"
                      style={{ width: `${modulePercent}%` }}
                    />
                  </div>
                  <div className="mt-3 space-y-1">
                    {module.chapters.map((chapter) => {
                      const done = completedIds.includes(chapter.id);
                      return (
                        <button
                          key={chapter.id}
                          onClick={() =>
                            router.push(
                              `/learn/${module.id}/${chapter.id}`
                            )
                          }
                          className="w-full flex items-center gap-2 py-1.5 text-sm hover:opacity-80 transition-opacity"
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                              done
                                ? "bg-[var(--success)] text-white"
                                : "border"
                            }`}
                            style={
                              !done
                                ? { borderColor: "var(--border)" }
                                : undefined
                            }
                          >
                            {done ? "\u2713" : ""}
                          </span>
                          <span
                            style={{
                              color: done
                                ? "var(--text-tertiary)"
                                : "var(--text-secondary)",
                              textDecoration: done ? "line-through" : "none",
                            }}
                          >
                            {chapter.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
