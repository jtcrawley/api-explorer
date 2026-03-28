"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/content/modules";

const SPRITE = (name: string) =>
  `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`;

// Pokemon reactions per scenario
const CORRECT_POKEMON = ["pikachu", "charmander", "bulbasaur", "squirtle", "eevee"];
const WRONG_POKEMON = ["psyduck", "slowpoke", "magikarp", "jigglypuff", "geodude"];
const PERFECT_POKEMON = "gengar";
const PARTIAL_POKEMON = "snorlax";

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [reactionPokemon, setReactionPokemon] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (showResult) return;
    const correct = optionIndex === question.correctIndex;
    setSelected(optionIndex);
    setShowResult(true);
    setWasCorrect(correct);
    setReactionPokemon(
      correct ? randomFrom(CORRECT_POKEMON) : randomFrom(WRONG_POKEMON)
    );
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setReactionPokemon(null);
    setCurrentIndex((i) => i + 1);
  };

  if (currentIndex >= questions.length) {
    const perfect = score === questions.length;
    return (
      <div
        className="rounded-2xl border p-8 text-center"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        <img
          src={SPRITE(perfect ? PERFECT_POKEMON : PARTIAL_POKEMON)}
          alt={perfect ? "Gengar celebrating" : "Snorlax relaxing"}
          className="mx-auto mb-3"
          style={{ imageRendering: "auto", height: 80 }}
        />
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {perfect ? "Perfect score! 🎉" : "Quiz Complete!"}
        </h3>
        <p style={{ color: "var(--text-secondary)" }}>
          {perfect
            ? "Gengar is impressed. You nailed it!"
            : `You got ${score} out of ${questions.length}. Snorlax says take a breather.`}
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--text-tertiary)" }}
        >
          Checkpoint
        </span>
        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <h3
        className="text-base font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {question.question}
      </h3>

      <div className="space-y-2">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
              !showResult ? "hover:border-[var(--border-hover)]" : ""
            }`}
            style={{
              borderColor: showResult
                ? i === question.correctIndex
                  ? "var(--success)"
                  : i === selected && i !== question.correctIndex
                  ? "var(--error)"
                  : "var(--border)"
                : "var(--border)",
              backgroundColor: showResult
                ? i === question.correctIndex
                  ? "var(--success-light)"
                  : i === selected && i !== question.correctIndex
                  ? "var(--error-light)"
                  : "var(--bg-primary)"
                : "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && reactionPokemon && (
        <div className="mt-4">
          <div className="flex items-start gap-3 mb-3 p-3 rounded-xl"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <img
              src={SPRITE(reactionPokemon)}
              alt={reactionPokemon}
              style={{ imageRendering: "auto", height: 56, flexShrink: 0 }}
            />
            <div>
              <p className="text-xs font-semibold mb-1"
                style={{ color: wasCorrect ? "var(--success)" : "var(--error)" }}
              >
                {wasCorrect ? "That's right!" : "Not quite!"}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {question.explanation}
              </p>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="text-sm font-medium px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {isLast ? "See Results" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
