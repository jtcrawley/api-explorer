"use client";

import { useMemo } from "react";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div
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
      `<pre class="code-block"><div class="flex items-center justify-between px-4 py-3 border-b" style="border-color: var(--border)"><span class="text-xs font-medium tracking-wider uppercase" style="color: var(--text-tertiary)">${
        lang || "code"
      }</span></div><code class="block px-5 py-5 overflow-x-auto">${escapeHtml(
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

  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

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
