"use client";

import { useState, useCallback } from "react";
import type { QuizQuestion } from "@/content/modules";

const SPRITE = (name: string) =>
  `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`;

const CORRECT_POKEMON = ["pikachu", "charmander", "bulbasaur", "squirtle", "eevee"];
const WRONG_POKEMON   = ["psyduck", "slowpoke", "magikarp", "jigglypuff", "geodude"];
const PERFECT_POKEMON = "gengar";
const PARTIAL_POKEMON = "snorlax";
const OPTION_LABELS   = ["A", "B", "C", "D"];

// Sparkle positions scattered around the card
const SPARKLES = [
  { top: "10%", left: "12%", delay: "0s",     size: 15 },
  { top:  "7%", left: "58%", delay: "0.07s",  size: 11 },
  { top: "14%", left: "82%", delay: "0.14s",  size: 17 },
  { top: "52%", left: "90%", delay: "0.05s",  size: 10 },
  { top: "72%", left: "78%", delay: "0.19s",  size: 13 },
  { top: "74%", left: "16%", delay: "0.11s",  size: 11 },
  { top: "48%", left:  "6%", delay: "0.17s",  size: 16 },
  { top: "24%", left:  "4%", delay: "0.03s",  size:  9 },
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentIndex,    setCurrentIndex]    = useState(0);
  const [selected,        setSelected]        = useState<number | null>(null);
  const [showResult,      setShowResult]      = useState(false);
  const [score,           setScore]           = useState(0);
  const [reactionPokemon, setReactionPokemon] = useState<string | null>(null);
  const [wasCorrect,      setWasCorrect]      = useState(false);
  const [wrongIndex,      setWrongIndex]      = useState<number | null>(null);
  const [completionKey,   setCompletionKey]   = useState(0);

  const question = questions[currentIndex];
  const isLast   = currentIndex === questions.length - 1;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (showResult) return;
      const correct = optionIndex === question.correctIndex;
      setSelected(optionIndex);
      setShowResult(true);
      setWasCorrect(correct);
      setWrongIndex(correct ? null : optionIndex);
      setReactionPokemon(
        correct ? randomFrom(CORRECT_POKEMON) : randomFrom(WRONG_POKEMON)
      );
      if (correct) setScore((s) => s + 1);
    },
    [showResult, question]
  );

  const handleNext = useCallback(() => {
    setSelected(null);
    setShowResult(false);
    setReactionPokemon(null);
    setWrongIndex(null);
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setReactionPokemon(null);
    setWasCorrect(false);
    setWrongIndex(null);
    setCompletionKey((k) => k + 1);
  }, []);

  /* ── Completion screen ── */
  if (currentIndex >= questions.length) {
    const perfect      = score === questions.length;
    const resultSprite = perfect ? PERFECT_POKEMON : PARTIAL_POKEMON;

    return (
      <div
        key={completionKey}
        className="relative rounded-2xl border-2 overflow-hidden p-8 text-center"
        style={{
          borderColor:     perfect ? "var(--accent)" : "var(--border)",
          backgroundColor: "var(--bg-secondary)",
          boxShadow: perfect
            ? "0 0 36px -8px color-mix(in srgb, var(--accent) 32%, transparent)"
            : "none",
        }}
      >
        {/* Sparkles — perfect score only */}
        {perfect &&
          SPARKLES.map((s, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="quiz-sparkle absolute pointer-events-none"
              style={{
                top:            s.top,
                left:           s.left,
                fontSize:       s.size,
                color:          "var(--accent)",
                animationDelay: s.delay,
                lineHeight:     1,
              }}
            >
              ✦
            </span>
          ))}

        {/* Pokémon */}
        <div className="relative mx-auto mb-4" style={{ width: 96, height: 96 }}>
          {perfect && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 70%)",
              }}
            />
          )}
          <img
            src={SPRITE(resultSprite)}
            alt={perfect ? "Gengar celebrating" : "Snorlax relaxing"}
            className="quiz-result-pop relative z-10"
            style={{
              imageRendering: "auto",
              width:          96,
              height:         96,
              objectFit:      "contain",
            }}
          />
        </div>

        {/* Score stars */}
        <div
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-3"
          style={{
            backgroundColor: perfect ? "var(--accent-light)" : "var(--bg-tertiary)",
          }}
        >
          {questions.map((_, i) => (
            <span
              key={i}
              className="text-sm"
              style={{ color: i < score ? "var(--accent)" : "var(--border-hover)" }}
            >
              {i < score ? "★" : "☆"}
            </span>
          ))}
          <span
            className="text-xs font-bold ml-1"
            style={{ color: perfect ? "var(--accent)" : "var(--text-secondary)" }}
          >
            {score}/{questions.length}
          </span>
        </div>

        <h3
          className="text-lg font-semibold mb-1.5"
          style={{ color: "var(--text-primary)" }}
        >
          {perfect ? "Perfect score! 🎉" : "Quiz complete!"}
        </h3>
        <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
          {perfect
            ? "Gengar is impressed. You nailed it!"
            : `${score} out of ${questions.length}. Snorlax says take a breather and try again.`}
        </p>

        <button
          onClick={handleRetry}
          className="text-sm font-medium px-5 py-2 rounded-xl border transition-colors hover:bg-[var(--bg-tertiary)]"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          Try again
        </button>
      </div>
    );
  }

  /* ── Question screen ── */
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor:     "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      {/* Header strip */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: "var(--accent)22" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          Checkpoint
        </span>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {questions.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:           i === currentIndex ? 18 : 6,
                height:          6,
                backgroundColor:
                  i < currentIndex
                    ? "var(--accent)"
                    : i === currentIndex
                    ? "var(--accent)"
                    : "var(--border)",
                opacity: i > currentIndex ? 0.4 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Question text */}
      <div className="px-5 pt-5 pb-4">
        <p
          className="text-sm font-semibold leading-relaxed mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, i) => {
            const isCorrect  = i === question.correctIndex;
            const isSelected = i === selected;
            const isWrong    = showResult && isSelected && !isCorrect;
            const isRight    = showResult && isCorrect;

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showResult}
                className={[
                  "w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm",
                  !showResult
                    ? "hover:border-[var(--accent)] hover:scale-[1.01] active:scale-[0.99]"
                    : "",
                  isWrong ? "quiz-option-shake" : "",
                  isRight ? "quiz-option-pop"   : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  borderColor:     isRight ? "var(--success)" : isWrong ? "var(--error)" : "var(--border)",
                  backgroundColor: isRight ? "var(--success-light)" : isWrong ? "var(--error-light)" : "var(--bg-primary)",
                  cursor:     showResult ? "default" : "pointer",
                  transition: "border-color 0.15s ease, background-color 0.15s ease, transform 0.1s ease",
                }}
              >
                {/* Letter / result badge */}
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-150"
                  style={{
                    backgroundColor: isRight
                      ? "var(--success)"
                      : isWrong
                      ? "var(--error)"
                      : "var(--bg-tertiary)",
                    color: isRight || isWrong ? "white" : "var(--text-tertiary)",
                  }}
                >
                  {isRight ? "✓" : isWrong ? "✕" : OPTION_LABELS[i]}
                </span>

                <span style={{ color: "var(--text-primary)" }}>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reaction panel */}
      {showResult && reactionPokemon && (
        <div className="px-5 pb-5">
          <div
            className="flex items-start gap-3 p-3.5 rounded-xl mb-3"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <img
              src={SPRITE(reactionPokemon)}
              alt={reactionPokemon}
              style={{
                imageRendering: "auto",
                height:         52,
                width:          52,
                objectFit:      "contain",
                flexShrink:     0,
              }}
            />
            <div className="min-w-0">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: wasCorrect ? "var(--success)" : "var(--error)" }}
              >
                {wasCorrect ? "✓  Correct!" : "✕  Not quite"}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {question.explanation}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {isLast ? "See Results" : "Next Question"}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
