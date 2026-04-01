"use client";

import { useMemo, useRef, useEffect, useCallback } from "react";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const html = useMemo(() => renderMarkdown(content), [content]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Event-delegated click handler for all copy buttons
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Code block copy button
    if (target.classList.contains("copy-btn")) {
      const pre = target.closest("pre.code-block");
      const codeEl = pre?.querySelector("code");
      if (!codeEl) return;
      navigator.clipboard.writeText(codeEl.textContent ?? "").then(() => {
        target.innerHTML = "✓ Copied!";
        target.style.color = "var(--accent)";
        target.style.borderColor = "var(--accent)";
        target.style.transform = "scale(1.06)";
        setTimeout(() => {
          target.innerHTML = "Copy";
          target.style.color = "var(--text-tertiary)";
          target.style.borderColor = "var(--border)";
          target.style.transform = "scale(1)";
        }, 2000);
      });
      return;
    }

    // Endpoint row copy button
    if (target.classList.contains("endpoint-copy-btn")) {
      const row = target.closest(".endpoint-row");
      if (!row) return;
      const method = row.querySelector(".endpoint-method")?.textContent ?? "";
      const path = row.querySelector(".endpoint-path")?.textContent ?? "";
      const text = method ? `${method} ${path}` : path;
      navigator.clipboard.writeText(text).then(() => {
        target.innerHTML = "✓ Copied!";
        target.style.color = "var(--accent)";
        target.style.borderColor = "var(--accent)";
        target.style.transform = "scale(1.06)";
        setTimeout(() => {
          target.innerHTML = "Copy";
          target.style.color = "var(--text-tertiary)";
          target.style.borderColor = "var(--border)";
          target.style.transform = "scale(1)";
        }, 2000);
      });
      return;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="prose-custom"
      onClick={handleClick}
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
      `<pre class="code-block"><div class="code-toolbar flex items-center justify-between px-4 py-3 border-b" style="border-color: var(--border)"><span style="font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:#94a3b8">${lang}</span><button class="copy-btn" style="font-size:11px;padding:2px 10px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--text-tertiary);cursor:pointer;flex-shrink:0;transition:color 0.15s,border-color 0.15s,transform 0.15s">Copy</button></div><code>${escapeHtml(
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
      return `<div class="overflow-x-auto table-scroll-wrapper my-4"><table class="w-full text-sm" style="border-color: var(--border)">
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

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Checklist items (- [ ] / - [x]) — before regular unordered lists
  html = html.replace(/^- \[( |x)\] (.+)$/gm, (_, checked, text) => {
    const isChecked = checked === "x" ? " checked" : "";
    return `<__CHKI__ data-c="${checked === "x" ? 1 : 0}">${text}</__CHKI__>`;
  });
  html = html.replace(/(<__CHKI__[^>]*>[\s\S]*?<\/__CHKI__>\n?)+/g, (match) => {
    const items = match.replace(/<__CHKI__ data-c="(\d)">([\s\S]*?)<\/__CHKI__>/g, (_, c, text) => {
      const checked = c === "1" ? " checked" : "";
      return `<li class="checklist-item"><label><input type="checkbox" class="checklist-checkbox"${checked}> ${text}</label></li>`;
    });
    return `<ul class="checklist">${items}</ul>`;
  });

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

  // Paragraphs — only skip block-level elements, not inline ones like <strong>, <em>, <code>
  html = html.replace(
    /^(?!<(?:h[1-6]|ul|ol|li|pre|div|table|thead|tbody|tr|th|td|hr|blockquote|p)|$)(.+)$/gm,
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

const COPY_BTN_STYLE = "font-size:11px;padding:2px 8px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--text-tertiary);cursor:pointer;margin-left:auto;flex-shrink:0;transition:color 0.15s,border-color 0.15s,transform 0.15s";

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
          return `<div class="endpoint-row"><span class="endpoint-method endpoint-${method.toLowerCase()}">${method}</span><code class="endpoint-path">${escapeHtml(path.trim())}</code>${desc ? `<span class="endpoint-desc">${escapeHtml(desc)}</span>` : ""}<button class="endpoint-copy-btn" style="${COPY_BTN_STYLE}">Copy</button></div>`;
        }
        return `<div class="endpoint-row"><code class="endpoint-path">${escapeHtml(pathPart)}</code>${desc ? `<span class="endpoint-desc">${escapeHtml(desc)}</span>` : ""}<button class="endpoint-copy-btn" style="${COPY_BTN_STYLE}">Copy</button></div>`;
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
