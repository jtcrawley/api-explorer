"use client";

import { useState } from "react";
import type { PostmanExercise } from "@/content/modules";

const METHOD_COLORS: Record<string, string> = {
  GET: "var(--http-get)",
  POST: "var(--http-post)",
  PUT: "var(--http-put)",
  DELETE: "var(--http-delete)",
  PATCH: "var(--http-patch)",
};

interface PostmanExerciseCardProps {
  exercise: PostmanExercise;
}

export default function PostmanExerciseCard({ exercise }: PostmanExerciseCardProps) {
  const [urlCopied, setUrlCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const methodColor = METHOD_COLORS[exercise.method] ?? "var(--text-secondary)";

  const copyUrl = () => {
    navigator.clipboard.writeText(exercise.url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--postman-brand)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Postman Exercise
          </span>
        </div>
        <a
          href="https://web.postman.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-2.5 py-1 rounded-lg transition-opacity hover:opacity-80 font-medium"
          style={{ backgroundColor: "var(--postman-brand)", color: "white" }}
        >
          Open Postman ↗
        </a>
      </div>

      {/* URL bar */}
      <div
        className="px-5 py-3 border-b flex items-center gap-3"
        style={{
          backgroundColor: "var(--bg-code)",
          borderColor: "var(--border)",
        }}
      >
        <span
          className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
          style={{
            backgroundColor: `color-mix(in srgb, ${methodColor} 15%, transparent)`,
            color: methodColor,
          }}
        >
          {exercise.method}
        </span>
        <code
          className="text-sm font-mono truncate flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {exercise.url}
        </code>
        <button
          onClick={copyUrl}
          className="text-xs px-2.5 py-1 rounded-lg transition-colors flex-shrink-0"
          style={{
            backgroundColor: urlCopied ? "var(--success-light)" : "var(--bg-tertiary)",
            color: urlCopied ? "var(--success)" : "var(--text-tertiary)",
          }}
        >
          {urlCopied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Body preview (for POST/PUT) */}
      {exercise.body && (
        <div
          className="px-5 py-3 border-b"
          style={{
            backgroundColor: "var(--bg-code)",
            borderColor: "var(--border)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-tertiary)" }}>
            Request body
          </p>
          <pre
            className="text-xs font-mono leading-relaxed overflow-x-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {exercise.body}
          </pre>
        </div>
      )}

      {/* Headers (if any) */}
      {exercise.headers && exercise.headers.length > 0 && (
        <div
          className="px-5 py-3 border-b"
          style={{
            backgroundColor: "var(--bg-code)",
            borderColor: "var(--border)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-tertiary)" }}>
            Headers
          </p>
          <div className="space-y-1">
            {exercise.headers.map((h) => (
              <div key={h.key} className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--text-tertiary)" }}>{h.key}:</span> {h.value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="px-5 py-4" style={{ backgroundColor: "var(--bg-primary)" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          Follow these steps
        </p>
        <div className="space-y-2.5">
          {exercise.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className="flex items-start gap-3 w-full text-left group"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 transition-colors"
                style={{
                  backgroundColor: completedSteps.has(i) ? "var(--success)" : "var(--accent-light)",
                  color: completedSteps.has(i) ? "white" : "var(--accent)",
                }}
              >
                {completedSteps.has(i) ? "✓" : i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: completedSteps.has(i) ? "var(--text-tertiary)" : "var(--text-primary)",
                    textDecoration: completedSteps.has(i) ? "line-through" : "none",
                  }}
                >
                  {step.instruction}
                </p>
                {step.detail && (
                  <p
                    className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {step.detail}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Expected output */}
      {exercise.expectedOutput && (
        <div
          className="px-5 py-3 border-t"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--success)" }}>
            What you should see
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {exercise.expectedOutput}
          </p>
        </div>
      )}
    </div>
  );
}
