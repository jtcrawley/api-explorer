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

  // ── Custom blocks (:::type\n...\n:::) — parsed before code blocks ──
  html = html.replace(
    /:::(tip|note|warning|compare|endpoints)\n([\s\S]*?):::/g,
    (_, type, rawContent) => buildCustomBlock(type, rawContent.trim())
  );

  // Code blocks with language (only actual code — no bare ``` blocks)
  html = html.replace(
    /```(\w+)\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="code-block"><div class="code-toolbar flex items-center justify-between px-4 py-3 border-b" style="border-color: var(--border)"><span class="text-xs font-medium tracking-wider uppercase" style="color: var(--text-tertiary)">${lang}</span></div><code>${escapeHtml(
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

// ── Icons for callout blocks ──────────────────────────────────────────────
const CALLOUT_ICONS: Record<string, string> = {
  tip: `<svg class="callout-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`,
  warning: `<svg class="callout-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
  note: `<svg class="callout-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
};

function buildCustomBlock(type: string, content: string): string {
  // ── :::compare ──
  if (type === "compare") {
    const rows = content
      .split("\n")
      .filter((l) => l.trim())
      .map((line) => {
        if (line.startsWith("✗")) {
          return `<div class="compare-row compare-bad"><span class="compare-marker">✗</span><span>${escapeHtml(line.slice(1).trim())}</span></div>`;
        }
        if (line.startsWith("✓")) {
          return `<div class="compare-row compare-good"><span class="compare-marker">✓</span><span>${escapeHtml(line.slice(1).trim())}</span></div>`;
        }
        return `<div class="compare-row" style="color:var(--text-tertiary);font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">${escapeHtml(line)}</div>`;
      })
      .join("");
    return `<div class="callout-compare">${rows}</div>`;
  }

  // ── :::endpoints ──
  if (type === "endpoints") {
    const rows = content
      .split("\n")
      .filter((l) => l.trim())
      .map((line) => {
        const [pathPart, desc] = line.split("→").map((s) => s.trim());
        const methodMatch = pathPart.match(/^(GET|POST|PUT|PATCH|DELETE)\s+(.+)$/);
        if (methodMatch) {
          const [, method, path] = methodMatch;
          return `<div class="endpoint-row"><span class="endpoint-method endpoint-${method.toLowerCase()}">${method}</span><code class="endpoint-path">${escapeHtml(path.trim())}</code>${desc ? `<span class="endpoint-desc">${escapeHtml(desc)}</span>` : ""}</div>`;
        }
        return `<div class="endpoint-row"><code class="endpoint-path">${escapeHtml(pathPart)}</code>${desc ? `<span class="endpoint-desc">${escapeHtml(desc)}</span>` : ""}</div>`;
      })
      .join("");
    return `<div class="endpoints-block">${rows}</div>`;
  }

  // ── :::tip / :::note / :::warning ──
  const icon = CALLOUT_ICONS[type] ?? CALLOUT_ICONS.note;
  // Run basic inline formatting on callout body
  const body = content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .split("\n\n")
    .map((para) => `<p>${para.replace(/\n/g, " ")}</p>`)
    .join("");
  return `<div class="callout callout-${type}">${icon}<div class="callout-body">${body}</div></div>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
