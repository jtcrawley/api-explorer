"use client";

import { useState, useCallback } from "react";
import type { CodeExercise } from "@/content/modules";

interface CodePlaygroundProps {
  exercise: CodeExercise;
}

export default function CodePlayground({ exercise }: CodePlaygroundProps) {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "instructions">("instructions");

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);
    setActiveTab("output");

    const logs: string[] = [];
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
    };

    const capture = (...args: unknown[]) => {
      logs.push(
        args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
          )
          .join(" ")
      );
    };

    console.log = capture;
    console.error = (...args) => {
      capture("[ERROR]", ...args);
    };
    console.warn = (...args) => {
      capture("[WARN]", ...args);
    };

    try {
      const wrappedCode = "(async () => {\n" + code + "\n})()";
      await eval(wrappedCode);
    } catch (err) {
      logs.push(`[ERROR] ${err instanceof Error ? err.message : String(err)}`);
    }

    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;

    setOutput(logs);
    setIsRunning(false);
  }, [code]);

  const resetCode = () => {
    setCode(exercise.starterCode);
    setOutput([]);
  };

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span
            className="text-xs font-medium ml-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            playground.js
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!exercise.readOnly && (
            <>
              <button
                onClick={resetCode}
                className="text-xs px-2.5 py-1 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                style={{ color: "var(--text-tertiary)" }}
              >
                Reset
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="text-xs px-3 py-1 rounded-lg text-white disabled:opacity-50 hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {isRunning ? "Running..." : "Run"}
              </button>
            </>
          )}
          {exercise.readOnly && (
            <span className="text-xs px-2.5 py-1 rounded-lg" style={{ color: "var(--text-tertiary)" }}>
              Demo only
            </span>
          )}
        </div>
      </div>

      {/* Playground note */}
      {exercise.playgroundNote && (
        <div
          className="px-4 py-2.5 text-xs border-b flex items-start gap-2"
          style={{
            backgroundColor: "var(--accent-light)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>✏️</span>
          <span>{exercise.playgroundNote}</span>
        </div>
      )}

      {/* Editor */}
      <div style={{ backgroundColor: "var(--bg-code)" }}>
        <textarea
          value={code}
          onChange={(e) => !exercise.readOnly && setCode(e.target.value)}
          readOnly={exercise.readOnly}
          rows={Math.max(10, Math.min(code.split("\n").length + 2, 36))}
          className="w-full p-4 font-mono text-sm leading-6 resize-none focus:outline-none"
          style={{
            backgroundColor: "var(--bg-code)",
            color: exercise.readOnly ? "var(--text-tertiary)" : "#e2e8f0",
            caretColor: "#e2e8f0",
            cursor: exercise.readOnly ? "default" : "text",
          }}
          spellCheck={false}
          onKeyDown={(e) => {
            if (exercise.readOnly) return;
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              runCode();
            }
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newCode = code.substring(0, start) + "  " + code.substring(end);
              setCode(newCode);
              setTimeout(() => {
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
              }, 0);
            }
          }}
        />
      </div>

      {/* Output / Instructions panel */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="flex items-center gap-1 px-4 pt-2"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <button
            onClick={() => setActiveTab("instructions")}
            className={`text-xs px-3 py-1.5 rounded-t-lg font-medium transition-colors ${
              activeTab === "instructions"
                ? "bg-[var(--bg-primary)]"
                : "hover:bg-[var(--bg-tertiary)]"
            }`}
            style={{
              color:
                activeTab === "instructions"
                  ? "var(--text-primary)"
                  : "var(--text-tertiary)",
            }}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`text-xs px-3 py-1.5 rounded-t-lg font-medium transition-colors ${
              activeTab === "output"
                ? "bg-[var(--bg-primary)]"
                : "hover:bg-[var(--bg-tertiary)]"
            }`}
            style={{
              color:
                activeTab === "output"
                  ? "var(--text-primary)"
                  : "var(--text-tertiary)",
            }}
          >
            Output{output.length > 0 ? ` (${output.length})` : ""}
          </button>
        </div>

        <div
          className="p-4 min-h-[160px] max-h-[300px] overflow-y-auto"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {activeTab === "instructions" && (
            <div className="space-y-3">
              {exercise.instructions.map((instruction, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: "var(--accent-light)",
                      color: "var(--accent)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {instruction}
                  </p>
                </div>
              ))}

              {exercise.hint && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {showHint ? "Hide hint" : "Need a hint?"}
                  </button>
                  {showHint && (
                    <p
                      className="mt-2 text-sm p-3 rounded-xl"
                      style={{
                        backgroundColor: "var(--accent-light)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {exercise.hint}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "output" && (
            <div className="font-mono text-sm space-y-0.5">
              {output.length === 0 ? (
                <p style={{ color: "var(--text-tertiary)" }}>
                  {exercise.readOnly
                    ? "This is a read-only demo — no need to run it."
                    : "Click \"Run\" or press Cmd+Enter to execute your code."}
                </p>
              ) : (
                <>
                  {output.map((line, i) => (
                    <div
                      key={i}
                      className="py-0.5"
                      style={{
                        color: line.startsWith("[ERROR]")
                          ? "var(--error)"
                          : line.startsWith("[WARN]")
                          ? "var(--warning)"
                          : "var(--text-primary)",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                  {exercise.errorHint && output.some((l) => l.startsWith("[ERROR]")) && (
                    <div
                      className="mt-3 text-xs px-3 py-2.5 rounded-xl font-sans"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--error) 8%, transparent)",
                        color: "var(--text-secondary)",
                        border: "1px solid color-mix(in srgb, var(--error) 20%, transparent)",
                      }}
                    >
                      💡 {exercise.errorHint}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
