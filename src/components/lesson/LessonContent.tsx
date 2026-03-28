"use client";

import { useMemo, useRef, useEffect } from "react";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const html = useMemo(() => renderMarkdown(content), [content]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inject copy buttons into code block toolbars after render
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll<HTMLPreElement>("pre.code-block").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return; // already injected
      const codeEl = pre.querySelector("code");
      const toolbar = pre.querySelector<HTMLElement>(".code-toolbar");
      if (!codeEl || !toolbar) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      Object.assign(btn.style, {
        fontSize: "11px",
        padding: "2px 10px",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text-tertiary)",
        cursor: "pointer",
        flexShrink: "0",
        transition: "color 0.15s, border-color 0.15s",
      });

      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeEl.textContent ?? "").then(() => {
          btn.textContent = "Copied!";
          btn.style.color = "var(--accent)";
          btn.style.borderColor = "var(--accent)";
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.style.color = "var(--text-tertiary)";
            btn.style.borderColor = "var(--border)";
          }, 2000);
        });
      });

      toolbar.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function renderMarkdown(md: string): string {
  let html = md;

  // Code blocks with language
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="code-block"><div class="code-toolbar flex items-center justify-between px-4 py-3 border-b" style="border-color: var(--border)"><span class="text-xs font-medium tracking-wider uppercase" style="color: var(--text-tertiary)">${
        lang || "code"
      }</span></div><code>${escapeHtml(
        code.trim()
      )}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    "<code>$1</code>"
  );

  // Tables
  html = html.replace(
    /\n\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
    (_, header, body) => {
      const headers = header
        .split("|")
        .map((h: string) => h.trim())
        .filter(Boolean);
      const rows = body
        .trim()
        .split("\n")
        .map((row: string) =>
          row
            .split("|")
            .map((c: string) => c.trim())
            .filter(Boolean)
        );
      return `<div class="overflow-x-auto my-4"><table class="w-full text-sm" style="border-color: var(--border)">
        <thead><tr>${headers
          .map(
            (h: string) =>
              `<th class="text-left px-4 py-2 font-medium border-b" style="border-color: var(--border); color: var(--text-primary)">${h}</th>`
          )
          .join("")}</tr></thead>
        <tbody>${rows
          .map(
            (row: string[]) =>
              `<tr>${row
                .map(
                  (cell: string) =>
                    `<td class="px-4 py-2 border-b" style="border-color: var(--border); color: var(--text-secondary)">${cell}</td>`
                )
                .join("")}</tr>`
          )
          .join("")}</tbody></table></div>`;
    }
  );

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Unordered lists — use a temp tag to avoid mixing with ordered items
  html = html.replace(/^- (.+)$/gm, "<__ULI__>$1</__ULI__>");
  html = html.replace(/(<__ULI__>[\s\S]*?<\/__ULI__>\n?)+/g, (match) => {
    const items = match.replace(/<__ULI__>([\s\S]*?)<\/__ULI__>/g, "<li>$1</li>");
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<__OLI__>$1</__OLI__>");
  html = html.replace(/(<__OLI__>[\s\S]*?<\/__OLI__>\n?)+/g, (match) => {
    const items = match.replace(/<__OLI__>([\s\S]*?)<\/__OLI__>/g, "<li>$1</li>");
    return `<ol>${items}</ol>`;
  });

  // Paragraphs
  html = html.replace(
    /^(?!<[a-z]|$)(.+)$/gm,
    "<p>$1</p>"
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline; text-underline-offset: 2px">$1</a>'
  );

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
