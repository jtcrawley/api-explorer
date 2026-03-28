"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TutorPanelProps {
  lessonContext?: string;
}

export default function TutorPanel({ lessonContext }: TutorPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if API route is available (which means ANTHROPIC_API_KEY is set)
    fetch("/api/tutor", { method: "HEAD" }).then((r) => {
      setHasApiKey(r.ok || r.status !== 404);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          context: lessonContext,
          history: messages.slice(-6),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that. Make sure your ANTHROPIC_API_KEY is set in .env.local.",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white shadow-lg hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center z-50"
        style={{ backgroundColor: "var(--accent)" }}
        title="AI Tutor"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden z-50"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 border-b flex items-center gap-3"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: "var(--accent-light)",
                color: "var(--accent)",
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                AI Tutor
              </h3>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                Ask me anything about the lesson
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!hasApiKey && (
              <div
                className="p-3 rounded-xl text-xs"
                style={{
                  backgroundColor: "var(--warning-light)",
                  color: "var(--text-secondary)",
                }}
              >
                Add your ANTHROPIC_API_KEY to .env.local to enable the AI tutor.
                Visit /setup for instructions.
              </div>
            )}

            {messages.length === 0 && hasApiKey && (
              <div className="text-center py-8">
                <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                  Ask me anything! Try:
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    "What does JSON mean?",
                    "Explain this error to me",
                    "Why do APIs need authentication?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                      }}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      &quot;{q}&quot;
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "rounded-bl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { backgroundColor: "var(--accent)" }
                      : {
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask a question..."
                className="flex-1 text-sm px-4 py-2.5 rounded-xl border focus:outline-none focus:border-[var(--accent)]"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
