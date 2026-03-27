"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/content/modules";

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
    setShowResult(true);
    if (optionIndex === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setCurrentIndex((i) => i + 1);
  };

  if (currentIndex >= questions.length) {
    return (
      <div
        className="rounded-2xl border p-8 text-center"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        <div className="text-4xl mb-3">
          {score === questions.length ? "\u2728" : "\u2705"}
        </div>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Quiz Complete!
        </h3>
        <p style={{ color: "var(--text-secondary)" }}>
          You got {score} out of {questions.length} correct.
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
        {question.options.map((option, i) => {
          let optionStyle = "border-[var(--border)] bg-[var(--bg-primary)]";
          if (showResult) {
            if (i === question.correctIndex) {
              optionStyle = "border-[var(--success)] bg-[var(--success-light)]";
            } else if (i === selected) {
              optionStyle = "border-[var(--error)] bg-[var(--error-light)]";
            }
          } else if (i === selected) {
            optionStyle = "border-[var(--accent)] bg-[var(--accent-light)]";
          }

          return (
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
                    : i === selected
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
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4">
          <p
            className="text-sm mb-3 p-3 rounded-xl"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-secondary)",
            }}
          >
            {question.explanation}
          </p>
          {!isLast ? (
            <button
              onClick={handleNext}
              className="text-sm font-medium px-4 py-2 rounded-xl bg-accent-600 text-white hover:bg-accent-700 transition-colors"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="text-sm font-medium px-4 py-2 rounded-xl bg-accent-600 text-white hover:bg-accent-700 transition-colors"
            >
              See Results
            </button>
          )}
        </div>
      )}
    </div>
  );
}
