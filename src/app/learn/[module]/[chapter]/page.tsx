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
import { useTheme } from "@/components/ui/ThemeProvider";
import {
  getModule,
  getChapter,
  getNextChapter,
  getPreviousChapter,
  getTotalChapters,
} from "@/content/modules";
import {
  markChapterComplete,
  isChapterComplete,
  getCompletedCount,
} from "@/lib/progress";
import { getDiagram } from "@/components/lesson/diagrams";
import {
  EVOLUTION_LINES,
  EVOLUTION_NAMES,
  getEvolutionStage,
  spriteUrl,
} from "@/lib/evolution";

// ─── Copy pools ──────────────────────────────────────────────────────────────

const COMPLETE_MESSAGES = (name: string): string[] => [
  `Another chapter down. The API world is starting to make real sense.`,
  `Look at you go. ${name} knew you had it in you.`,
  `That clicked, didn't it? You're building genuine intuition here.`,
  `One step closer to being the designer who actually gets it.`,
  `Your engineering teammates are going to love working with you.`,
  `Knowledge locked in. ${name} has your back.`,
  `The more you learn, the more the pieces connect. Keep going.`,
  `Small steps. Real skills. ${name} approves.`,
  `APIs are starting to feel a lot less scary, aren't they?`,
  `Product sense + API fluency = a genuinely dangerous combo.`,
];

const COURSE_COMPLETE_SUBTITLES = (finalName: string): string[] => [
  `You went from "What's an API?" to building real features. That's not nothing. That's everything.`,
  `Most designers never get here. You did. ${finalName} is proof of every chapter you showed up for.`,
  `API-fluent. Database-aware. Dangerously good collaborator. You've earned it.`,
  `The gap between you and your engineering team just got a whole lot smaller. Well done.`,
];

const EVOLUTION_MESSAGES = (toName: string): string[] => [
  `Your curiosity and dedication triggered the evolution. ${toName} is ready for what's next.`,
  `This is what consistent learning looks like. ${toName} has levelled up with you.`,
  `A milestone reached. ${toName} reflects the progress you've made.`,
  `Not everyone gets this far. ${toName} evolving is proof you're doing the work.`,
  `You've crossed a threshold. ${toName} will carry you through the next chapter.`,
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Sparkle ring ─────────────────────────────────────────────────────────────

const SPARKLE_POS = [
  { top: "-18%", left: "50%" },
  { top: "4%",   left: "93%" },
  { top: "50%",  left: "112%" },
  { top: "96%",  left: "93%" },
  { top: "118%", left: "50%" },
  { top: "96%",  left: "7%" },
  { top: "50%",  left: "-12%" },
  { top: "4%",   left: "7%" },
];
const SPARKLE_COLORS = ["var(--accent)", "#fbbf24", "#f0abfc", "#fbbf24", "var(--accent)", "#f0abfc", "#fbbf24", "var(--accent)"];

function SparkleRing({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {SPARKLE_POS.map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            top: pos.top,
            left: pos.left,
            fontSize: i % 2 === 0 ? "15px" : "10px",
            lineHeight: 1,
            color: SPARKLE_COLORS[i],
            animation: `sparklePop 2s ease-in-out ${i * 0.26}s infinite`,
          }}
        >
          ✦
        </span>
      ))}
      {children}
    </div>
  );
}

// ─── Confetti ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "var(--accent)", "#fbbf24", "#60a5fa", "#f472b6", "#a3e635", "#e879f9",
];

type Particle = {
  id: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
  delay: number;
  rot: number;
  round: boolean;
};

function makeParticles(count = 30, spread = 72): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const rad = (angle * Math.PI) / 180;
    const dist = spread + (i % 5) * 28;
    return {
      id: i,
      tx: Math.cos(rad) * dist,
      ty: Math.sin(rad) * dist - 32,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 5 + (i % 3) * 3,
      delay: (i % 8) * 0.04,
      rot: (i % 2 === 0 ? 1 : -1) * (120 + (i % 4) * 60),
      round: i % 3 !== 0,
    };
  });
}

// ─── Types ───────────────────────────────────────────────────────────────────

type EvolutionData = {
  fromSprite: string;
  toSprite: string;
  fromName: string;
  toName: string;
  message: string;
  particles: Particle[];
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.module as string;
  const chapterId = params.chapter as string;

  const { pokemon } = useTheme();

  // Core state
  const [completed, setCompleted] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0);

  // Chapter complete modal
  const [celebrating, setCelebrating] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [celebrationCountdown, setCelebrationCountdown] = useState(10);

  // Evolution modal
  const [evolution, setEvolution] = useState<EvolutionData | null>(null);
  const [evolutionCountdown, setEvolutionCountdown] = useState(10);

  // Course complete modal
  const [courseComplete, setCourseComplete] = useState<{
    finalSprite: string;
    finalName: string;
    subtitle: string;
    particles: Particle[];
    totalChapters: number;
  } | null>(null);

  const module = getModule(moduleId);
  const chapter = getChapter(moduleId, chapterId);
  const next = getNextChapter(moduleId, chapterId);
  const prev = getPreviousChapter(moduleId, chapterId);
  const Diagram = getDiagram(chapterId);

  useEffect(() => {
    setCompleted(isChapterComplete(chapterId));
    setTotalCompleted(getCompletedCount());
  }, [chapterId, completed]);

  // Derive evolved sprite from overall progress
  const totalChaptersCount = getTotalChapters();
  const progressPct = totalChaptersCount > 0
    ? (totalCompleted / totalChaptersCount) * 100
    : 0;
  const evolutionStage = getEvolutionStage(progressPct);
  const evolvedSprite = spriteUrl(EVOLUTION_LINES[pokemon][evolutionStage]);
  const evolvedName = EVOLUTION_NAMES[pokemon][evolutionStage];

  // Celebration countdown
  useEffect(() => {
    if (!celebrating) return;
    setCelebrationCountdown(10);
    const interval = setInterval(() => {
      setCelebrationCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          setCelebrating(false);
          if (next) router.push(`/learn/${next.moduleId}/${next.chapterId}`);
          return 5;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [celebrating]); // eslint-disable-line react-hooks/exhaustive-deps

  // Evolution countdown
  useEffect(() => {
    if (!evolution) return;
    setEvolutionCountdown(10);
    const interval = setInterval(() => {
      setEvolutionCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          setEvolution(null);
          if (next) router.push(`/learn/${next.moduleId}/${next.chapterId}`);
          return 5;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [evolution]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!module || !chapter) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="md:ml-72 flex-1 p-12">
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
    const total = getTotalChapters();
    const beforeCount = getCompletedCount();
    const beforePct = total > 0 ? (beforeCount / total) * 100 : 0;
    const beforeStage = getEvolutionStage(beforePct);

    markChapterComplete(chapterId);
    setCompleted(true);

    const afterCount = beforeCount + 1;
    const afterPct = total > 0 ? (afterCount / total) * 100 : 0;
    const afterStage = getEvolutionStage(afterPct);

    if (afterCount >= total) {
      // 🎉 Entire course complete — biggest moment
      const finalName = EVOLUTION_NAMES[pokemon][2]; // always final stage
      const finalSprite = spriteUrl(EVOLUTION_LINES[pokemon][2]);
      setCourseComplete({
        finalSprite,
        finalName,
        subtitle: pickRandom(COURSE_COMPLETE_SUBTITLES(finalName)),
        particles: makeParticles(56, 110), // bigger, wider burst
        totalChapters: total,
      });
    } else if (afterStage > beforeStage) {
      // Evolution — show evolution modal instead of regular celebration
      const toName = EVOLUTION_NAMES[pokemon][afterStage];
      setEvolution({
        fromSprite: spriteUrl(EVOLUTION_LINES[pokemon][beforeStage]),
        toSprite:   spriteUrl(EVOLUTION_LINES[pokemon][afterStage]),
        fromName:   EVOLUTION_NAMES[pokemon][beforeStage],
        toName,
        message:    pickRandom(EVOLUTION_MESSAGES(toName)),
        particles:  makeParticles(),
      });
    } else {
      // Regular chapter complete celebration
      setCelebrationMessage(pickRandom(COMPLETE_MESSAGES(evolvedName)));
      setCelebrating(true);
    }
  };

  const dismissCelebration = () => {
    setCelebrating(false);
    if (next) router.push(`/learn/${next.moduleId}/${next.chapterId}`);
  };

  const dismissEvolution = () => {
    setEvolution(null);
    if (next) router.push(`/learn/${next.moduleId}/${next.chapterId}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="md:ml-72 flex-1 min-h-screen min-w-0 overflow-x-hidden">
        {/* Mobile top bar — gives breathing room below the hamburger button */}
        <div
          className="md:hidden flex items-center gap-3 px-16 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-sm font-medium truncate" style={{ color: "var(--text-secondary)" }}>
            Module {moduleId} · {chapter.title}
          </span>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-12">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="accent">Module {moduleId}</Badge>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {chapter.readTime} min read
              </span>
              {completed && <Badge variant="success">Completed</Badge>}
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {chapter.title}
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              {chapter.subtitle}
            </p>
          </div>

          {/* Narrative callout */}
          <div
            className="flex items-center gap-4 mb-10 px-5 py-5 rounded-2xl border-l-4"
            style={{
              backgroundColor: "var(--accent-light)",
              borderLeftColor: "var(--accent)",
            }}
          >
            <img
              src={evolvedSprite}
              alt={evolvedName}
              width={56}
              height={56}
              style={{ imageRendering: "auto", objectFit: "contain", flexShrink: 0, transform: "scaleX(-1)" }}
            />
            <p
              className="text-sm leading-relaxed italic min-w-0"
              style={{ color: "var(--text-primary)", overflowWrap: "break-word", wordBreak: "break-word" }}
            >
              {chapter.narrative}
            </p>
          </div>

          {/* Visual diagram */}
          {Diagram && <Diagram />}

          {/* Key concepts */}
          <div className="flex flex-wrap gap-2 mb-10">
            {chapter.concepts.map((concept) => (
              <Badge key={concept} variant="accent">{concept}</Badge>
            ))}
          </div>

          {/* Main content */}
          <div className="mb-12">
            <LessonContent content={chapter.content} />
          </div>

          {/* Code exercise */}
          {chapter.exercise && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
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
            className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-8 mt-8 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            {prev ? (
              <Button
                variant="ghost"
                className="w-full sm:w-auto"
                onClick={() => router.push(`/learn/${prev.moduleId}/${prev.chapterId}`)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {!completed ? (
              <Button className="w-full sm:w-auto" onClick={handleComplete}>Mark Complete & Continue</Button>
            ) : next ? (
              <Button className="w-full sm:w-auto" onClick={() => router.push(`/learn/${next.moduleId}/${next.chapterId}`)}>
                Next Chapter
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            ) : (
              <Button variant="secondary" className="w-full sm:w-auto" onClick={() => router.push("/dashboard")}>
                View Dashboard
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* ── Chapter complete modal ── */}
      {celebrating && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: "overlayIn 0.2s ease-out" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            onClick={dismissCelebration}
          />

          {/* Modal */}
          <div
            className="relative flex flex-col items-center gap-5 px-8 py-8 rounded-3xl border shadow-2xl max-w-sm w-full mx-4 text-center"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--success)",
              animation: "modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <SparkleRing>
              <img
                src={evolvedSprite}
                alt={evolvedName}
                width={96}
                height={96}
                style={{ imageRendering: "auto", objectFit: "contain" }}
              />
            </SparkleRing>

            <div>
              <p className="text-xl font-bold mb-2" style={{ color: "var(--success)" }}>
                Chapter complete!
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {celebrationMessage}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={dismissCelebration}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                Skip
              </button>
              {next && (
                <button
                  onClick={dismissCelebration}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--success)" }}
                >
                  Next Chapter →
                </button>
              )}
            </div>

            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Auto-dismissing in {celebrationCountdown}s
            </p>
          </div>
        </div>
      )}

      {/* ── Course complete modal ── */}
      {courseComplete && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ animation: "overlayIn 0.25s ease-out" }}
        >
          {/* Backdrop — darker for the biggest moment */}
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          />

          {/* Modal */}
          <div
            className="relative overflow-hidden flex flex-col items-center gap-5 px-10 py-10 rounded-3xl border-2 shadow-2xl max-w-md w-full mx-4 text-center"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--accent)",
              animation: "modalIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Confetti particles — bigger burst */}
            {courseComplete.particles.map((p) => (
              <div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  width: p.size,
                  height: p.size,
                  borderRadius: p.round ? "50%" : "2px",
                  backgroundColor: p.color,
                  animation: `particleFly 1.4s ease-out ${p.delay}s both`,
                  ["--tx" as string]: `${p.tx}px`,
                  ["--ty" as string]: `${p.ty}px`,
                  ["--rot" as string]: `${p.rot}deg`,
                } as React.CSSProperties}
              />
            ))}

            {/* Flash burst */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                backgroundColor: "white",
                animation: "flashBurst 0.7s ease-out forwards",
              }}
            />

            {/* Eye-candy label */}
            <p
              className="text-xs font-bold uppercase tracking-widest relative z-10"
              style={{ color: "var(--accent)" }}
            >
              ✦ Course Complete ✦
            </p>

            {/* Final evolved sprite — large */}
            <SparkleRing className="relative z-10">
              <img
                src={courseComplete.finalSprite}
                alt={courseComplete.finalName}
                width={128}
                height={128}
                style={{
                  imageRendering: "auto",
                  objectFit: "contain",
                  animation: "evolvedPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
                }}
              />
            </SparkleRing>

            {/* Headline */}
            <div className="relative z-10">
              <p
                className="text-2xl font-bold mb-1"
                style={{ color: "var(--accent)" }}
              >
                You did it.
              </p>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                {courseComplete.finalName} is fully evolved.
              </p>
              <p
                className="text-sm leading-relaxed max-w-xs mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                {courseComplete.subtitle}
              </p>
            </div>

            {/* Stats chip */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border relative z-10"
              style={{
                borderColor: "var(--accent)",
                backgroundColor: "var(--accent-light)",
              }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                {courseComplete.totalChapters} chapters completed
              </span>
              <span style={{ color: "var(--accent)" }}>🏆</span>
            </div>

            {/* CTA */}
            <button
              onClick={() => router.push("/dashboard")}
              className="relative z-10 w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              View your results →
            </button>
          </div>
        </div>
      )}

      {/* ── Evolution modal ── */}
      {evolution && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: "overlayIn 0.2s ease-out" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
            onClick={dismissEvolution}
          />

          {/* Modal */}
          <div
            className="relative overflow-hidden flex flex-col items-center gap-5 px-8 py-8 rounded-3xl border shadow-2xl max-w-sm w-full mx-4 text-center"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--accent)",
              animation: "modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Confetti particles */}
            {evolution.particles.map((p) => (
              <div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  width: p.size,
                  height: p.size,
                  borderRadius: p.round ? "50%" : "2px",
                  backgroundColor: p.color,
                  animation: `particleFly 1s ease-out ${p.delay}s both`,
                  ["--tx" as string]: `${p.tx}px`,
                  ["--ty" as string]: `${p.ty}px`,
                  ["--rot" as string]: `${p.rot}deg`,
                } as React.CSSProperties}
              />
            ))}

            {/* Flash burst */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                backgroundColor: "white",
                animation: "flashBurst 0.55s ease-out forwards",
              }}
            />

            {/* Content */}
            <p
              className="text-xs font-bold uppercase tracking-widest relative z-10"
              style={{ color: "var(--accent)" }}
            >
              ✦ Evolution!
            </p>

            {/* Sprite transition */}
            <div className="flex items-end gap-5 relative z-10">
              {/* Old form */}
              <div className="flex flex-col items-center gap-1.5">
                <img
                  src={evolution.fromSprite}
                  alt={evolution.fromName}
                  width={60}
                  height={60}
                  style={{
                    imageRendering: "auto",
                    objectFit: "contain",
                    opacity: 0.35,
                    filter: "grayscale(1)",
                  }}
                />
                <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  {evolution.fromName}
                </span>
              </div>

              <svg className="w-5 h-5 mb-5 flex-shrink-0" style={{ color: "var(--accent)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>

              {/* New form */}
              <div className="flex flex-col items-center gap-1.5">
                <SparkleRing>
                  <img
                    src={evolution.toSprite}
                    alt={evolution.toName}
                    width={80}
                    height={80}
                    style={{
                      imageRendering: "auto",
                      objectFit: "contain",
                      animation: "evolvedPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both",
                    }}
                  />
                </SparkleRing>
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {evolution.toName}
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed relative z-10"
              style={{ color: "var(--text-secondary)" }}
            >
              {evolution.message}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full relative z-10">
              <button
                onClick={dismissEvolution}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                Skip
              </button>
              {next && (
                <button
                  onClick={dismissEvolution}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Next Chapter →
                </button>
              )}
            </div>

            <p className="text-xs relative z-10" style={{ color: "var(--text-tertiary)" }}>
              Auto-dismissing in {evolutionCountdown}s
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
