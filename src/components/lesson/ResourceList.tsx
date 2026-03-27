"use client";

import type { Resource } from "@/content/modules";

const typeIcons: Record<string, string> = {
  video: "\u25B6",
  article: "\u2709",
  docs: "\u2630",
  interactive: "\u26A1",
};

const typeLabels: Record<string, string> = {
  video: "Video",
  article: "Article",
  docs: "Documentation",
  interactive: "Interactive",
};

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (resources.length === 0) return null;

  return (
    <div>
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Resources
      </h3>
      <div className="space-y-3">
        {resources.map((resource, i) => (
          <a
            key={i}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-xl border hover:border-[var(--border-hover)] transition-all group"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{
                backgroundColor: "var(--accent-light)",
              }}
            >
              {typeIcons[resource.type]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4
                  className="text-sm font-medium group-hover:text-accent-600 transition-colors truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {resource.title}
                </h4>
                <span
                  className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {typeLabels[resource.type]}
                </span>
              </div>
              <p
                className="text-xs mt-1 line-clamp-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                {resource.description}
              </p>
            </div>
            <svg
              className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--text-tertiary)" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
