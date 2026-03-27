"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import LessonContent from "@/components/lesson/LessonContent";
import CodePlayground from "@/components/lesson/CodePlayground";
import Quiz from "@/components/lesson/Quiz";
import ResourceList from "@/components/lesson/ResourceList";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  getModule,
  getChapter,
  getNextChapter,
  getPreviousChapter,
} from "@/content/modules";
import {
  markChapterComplete,
  isChapterComplete,
} from "@/lib/progress";
import { getDiagram } from "@/components/lesson/diagrams";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.module as string;
  const chapterId = params.chapter as string;

  const [completed, setCompleted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const CELEBRATE_POKEMON = ["pikachu", "charizard", "mewtwo", "eevee", "lucario", "garchomp"];
  const celebratePokemon = CELEBRATE_POKEMON[parseInt(chapterId.replace(/\D/g, ""), 10) % CELEBRATE_POKEMON.length];

  const module = getModule(moduleId);
  const chapter = getChapter(moduleId, chapterId);
  const next = getNextChapter(moduleId, chapterId);
  const prev = getPreviousChapter(moduleId, chapterId);
  const Diagram = getDiagram(chapterId);

  useEffect(() => {
    setCompleted(isChapterComplete(chapterId));
  }, [chapterId]);

  if (!module || !chapter) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-72 flex-1 p-12">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Chapter not found
          </h1>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            This chapter doesn&apos;t exist yet. Try navigating from the sidebar.
          </p>
        </main>
      </div>
    );
  }

  const handleComplete = () => {
    markChapterComplete(chapterId);
    setCompleted(true);
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 2200);
    if (next) {
      setTimeout(() => {
        router.push(`/learn/${next.moduleId}/${next.chapterId}`);
      }, 2400);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-72 flex-1 min-h-screen">
        <div className="max-w-3xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="accent">Module {moduleId}</Badge>
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {chapter.readTime} min read
              </span>
              {completed && <Badge variant="success">Completed</Badge>}
            </div>
            <h1
              className="text-3xl font-bold tracking-tight mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {chapter.title}
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {chapter.subtitle}
            </p>
          </div>

          {/* Narrative intro */}
          <div
            className="p-6 rounded-2xl mb-10 border-l-4"
            style={{
              backgroundColor: "var(--accent-light)",
              borderLeftColor: "var(--accent)",
            }}
          >
            <p
              className="text-sm leading-relaxed italic"
              style={{ color: "var(--text-secondary)" }}
            >
              {chapter.narrative}
            </p>
          </div>

          {/* Visual diagram (chapter-specific) */}
          {Diagram && <Diagram />}

          {/* Key concepts */}
          <div className="flex flex-wrap gap-2 mb-10">
            {chapter.concepts.map((concept) => (
              <Badge key={concept}>{concept}</Badge>
            ))}
          </div>

          {/* Main content */}
          <div className="mb-12">
            <LessonContent content={chapter.content} />
          </div>

          {/* Code exercise */}
          {chapter.exercise && (
            <div className="mb-12">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Try It Yourself
              </h2>
              <CodePlayground exercise={chapter.exercise} />
            </div>
          )}

          {/* Quiz */}
          {chapter.quiz && chapter.quiz.length > 0 && (
            <div className="mb-12">
              <Quiz questions={chapter.quiz} />
            </div>
          )}

          {/* Resources */}
          {chapter.resources.length > 0 && (
            <div className="mb-12">
              <ResourceList resources={chapter.resources} />
            </div>
          )}

          {/* Navigation */}
          <div
            className="flex items-center justify-between pt-8 mt-8 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            {prev ? (
              <Button
                variant="ghost"
                onClick={() =>
                  router.push(`/learn/${prev.moduleId}/${prev.chapterId}`)
                }
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>
            ) : (
              <div />
            )}

            {!completed ? (
              <Button onClick={handleComplete}>
                Mark Complete & Continue
              </Button>
            ) : next ? (
              <Button
                onClick={() =>
                  router.push(`/learn/${next.moduleId}/${next.chapterId}`)
                }
              >
                Next Chapter
                <svg
                  className="w-4 h-4"
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
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => router.push("/dashboard")}>
                View Dashboard
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Chapter complete celebration */}
      {celebrating && (
        <div
          className="fixed bottom-8 right-8 flex items-end gap-3 px-5 py-4 rounded-2xl border shadow-xl z-50"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--success)",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          <img
            src={`https://play.pokemonshowdown.com/sprites/ani/${celebratePokemon}.gif`}
            alt={celebratePokemon}
            style={{ imageRendering: "pixelated", height: 72 }}
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--success)" }}>
              Chapter complete!
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {celebratePokemon.charAt(0).toUpperCase() + celebratePokemon.slice(1)} approves.
            </p>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
