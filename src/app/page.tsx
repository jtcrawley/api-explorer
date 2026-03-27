"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { modules, getTotalChapters } from "@/content/modules";
import { getCompletedCount } from "@/lib/progress";

const moduleIcons = [
  // Zap
  <svg key="zap" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  // MessageSquare
  <svg key="msg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  // Database
  <svg key="db" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2}/><path strokeWidth={2} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path strokeWidth={2} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  // Rocket
  <svg key="rocket" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 003.46-8.62 2.25 2.25 0 00-2.18-2.18 14.98 14.98 0 00-8.62 3.46m5.34 7.34L7.56 21.6M4.5 15.75l7.09-7.09" /></svg>,
  // Trophy
  <svg key="trophy" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-2 5h4l-2-5zm-4-2a4 4 0 01-4-4V4h4m8 9a4 4 0 004-4V4h-4m-8 0h8m-8 0v5a4 4 0 008 0V4" /></svg>,
];

export default function HomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [completedCount, setCompletedCount] = useState(0);
  const totalChapters = getTotalChapters();

  useEffect(() => {
    setCompletedCount(getCompletedCount());
  }, []);

  const hasStarted = completedCount > 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <Logo size={28} />
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            {theme === "light" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{
            backgroundColor: "var(--accent-light)",
            color: "var(--accent)",
          }}
        >
          For Product Designers
        </div>
        <h2
          className="text-5xl font-bold tracking-tight leading-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Learn APIs &<br />Databases
        </h2>
        <p
          className="text-xl max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A story-driven journey from &quot;What&apos;s an API?&quot; to building
          real features with Pokemon data.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => router.push("/learn/1/1-1")}
          >
            {hasStarted ? "Continue Learning" : "Start Learning"}
          </Button>
          {hasStarted && (
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard ({completedCount}/{totalChapters})
            </Button>
          )}
        </div>
      </section>

      {/* Modules overview */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
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
                router.push(
                  `/learn/${module.id}/${module.chapters[0].id}`
                )
              }
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  {moduleIcons[i]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Module {module.id}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {module.chapters.length} chapters
                    </span>
                  </div>
                  <h4
                    className="text-lg font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {module.title}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-8 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          Built for designers who want to speak the language of APIs.
        </p>
      </footer>
    </div>
  );
}
