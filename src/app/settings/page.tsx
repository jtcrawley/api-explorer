"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useTheme } from "@/components/ui/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("api-explorer-progress");
    if (stored) {
      const progress = JSON.parse(stored);
      setCompletedCount(
        Object.values(progress).filter((p: any) => p.completed).length
      );
    }
  }, []);

  const resetProgress = () => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      localStorage.removeItem("api-explorer-progress");
      setCompletedCount(0);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-72 flex-1 min-h-screen p-12">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Settings
          </h1>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
            Manage your preferences and connections.
          </p>

          {/* Theme */}
          <Card className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Appearance
                </h3>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  Currently using {theme} mode
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"}
              </Button>
            </div>
          </Card>

          {/* Progress */}
          <Card className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Learning Progress
                </h3>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {completedCount} chapters completed
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={resetProgress}>
                Reset Progress
              </Button>
            </div>
          </Card>

          {/* API Connections */}
          <Card className="mb-4">
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              API Connections
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: process.env.NEXT_PUBLIC_SUPABASE_URL
                        ? "var(--success)"
                        : "var(--text-tertiary)",
                    }}
                  />
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                    Supabase
                  </span>
                </div>
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  Optional — configure in .env.local
                </span>
              </div>
            </div>
          </Card>

          <p className="text-sm mt-6" style={{ color: "var(--text-tertiary)" }}>
            Need help?{" "}
            <a
              href="/setup"
              className="underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              View the setup guide
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
