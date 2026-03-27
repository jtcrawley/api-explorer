"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import Button from "@/components/ui/Button";

const starterCode = `// Free Playground — try any API call!
// Here are some endpoints to experiment with:

// PokeAPI (no auth needed)
// https://pokeapi.co/api/v2/pokemon/{name}
// https://pokeapi.co/api/v2/type/{type}
// https://pokeapi.co/api/v2/ability/{ability}

// JSONPlaceholder (free test API)
// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users

// Try it!
const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const data = await response.json();
console.log("Name:", data.name);
console.log("Types:", data.types.map(t => t.type.name).join(", "));
console.log("Height:", data.height);
console.log("Weight:", data.weight);
`;

export default function PlaygroundPage() {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push(
        args
          .map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)))
          .join(" ")
      );
    };
    console.error = (...args) => {
      logs.push("[ERROR] " + args.map((a) => String(a)).join(" "));
    };

    try {
      await eval(`(async () => { ${code} })()`);
    } catch (err) {
      logs.push(`[ERROR] ${err instanceof Error ? err.message : String(err)}`);
    }

    console.log = originalLog;
    console.error = originalError;
    setOutput(logs);
    setIsRunning(false);
  }, [code]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-72 flex-1 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                API Playground
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Experiment with any API call. No rules, no lessons — just explore.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCode(starterCode)}>
                Reset
              </Button>
              <Button size="sm" onClick={runCode} disabled={isRunning}>
                {isRunning ? "Running..." : "Run (Cmd+Enter)"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-180px)]">
            {/* Editor */}
            <div
              className="rounded-2xl border overflow-hidden flex flex-col"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="flex items-center px-4 py-2 border-b"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex gap-1.5 mr-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  editor.js
                </span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 font-mono text-sm leading-6 resize-none focus:outline-none"
                style={{
                  backgroundColor: "var(--bg-code)",
                  color: "#e2e8f0",
                  caretColor: "#e2e8f0",
                }}
                spellCheck={false}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    runCode();
                  }
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const start = e.currentTarget.selectionStart;
                    const end = e.currentTarget.selectionEnd;
                    setCode(code.substring(0, start) + "  " + code.substring(end));
                  }
                }}
              />
            </div>

            {/* Output */}
            <div
              className="rounded-2xl border overflow-hidden flex flex-col"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="flex items-center px-4 py-2 border-b"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
                  Output
                </span>
              </div>
              <div
                className="flex-1 p-4 overflow-y-auto font-mono text-sm"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                {output.length === 0 ? (
                  <p style={{ color: "var(--text-tertiary)" }}>
                    Run your code to see output here...
                  </p>
                ) : (
                  output.map((line, i) => (
                    <div
                      key={i}
                      className="py-0.5 whitespace-pre-wrap"
                      style={{
                        color: line.startsWith("[ERROR]")
                          ? "var(--error)"
                          : "var(--text-primary)",
                      }}
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
