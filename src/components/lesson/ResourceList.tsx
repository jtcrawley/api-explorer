"use client";

import type { Resource } from "@/content/modules";

const typeLabels: Record<string, string> = {
  video: "Video",
  article: "Article",
  docs: "Documentation",
  interactive: "Interactive",
};

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function InteractiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  video:       <VideoIcon />,
  article:     <ArticleIcon />,
  docs:        <DocsIcon />,
  interactive: <InteractiveIcon />,
};

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

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
        {resources.map((resource, i) => {
          const youtubeId = getYouTubeId(resource.url);

          if (youtubeId) {
            return (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={resource.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <span
                    className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--accent-light)",
                      color: "var(--accent)",
                    }}
                  >
                    Video
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {resource.title}
                  </span>
                </div>
              </div>
            );
          }

          return (
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
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "var(--accent-light)",
                  color: "var(--accent)",
                }}
              >
                {TYPE_ICONS[resource.type]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className="text-sm font-medium transition-colors truncate group-hover:opacity-80"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {resource.title}
                  </h4>
                  <span
                    className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-light)",
                      color: "var(--accent)",
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
          );
        })}
      </div>
    </div>
  );
}
