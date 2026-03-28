"use client";

import { useState, useCallback } from "react";

interface ModuleCardProps {
  moduleId: string;
  title: string;
  description: string;
  chapterCount: number;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function ModuleCard({
  moduleId,
  title,
  description,
  chapterCount,
  icon,
  onClick,
}: ModuleCardProps) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="relative rounded-2xl border-2 overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: isHovered ? "var(--accent)" : "var(--border)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isHovered
          ? "0 16px 40px -12px color-mix(in srgb, var(--accent) 38%, transparent), 0 4px 14px -4px rgba(0,0,0,0.12)"
          : "none",
      }}
    >
      {/* Dot grid texture — masked to the specular highlight region */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 0,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          maskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.03) 35%, transparent 65%)`,
          WebkitMaskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.03) 35%, transparent 65%)`,
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`dot-mod-${moduleId}`}
            x="0" y="0"
            width="20" height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill="var(--accent)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dot-mod-${moduleId})`} />
      </svg>

      {/* Specular highlight */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.18s ease",
          background: `radial-gradient(
            ellipse at ${mouse.x * 100}% ${mouse.y * 100}%,
            color-mix(in srgb, var(--accent) 13%, transparent) 0%,
            color-mix(in srgb, var(--accent) 3%, transparent) 45%,
            transparent 68%
          )`,
        }}
      />

      {/* ── TCG header strip — module number + chapter count ── */}
      <div
        className="flex items-center justify-between px-3 sm:px-4 pt-3 pb-2"
        style={{ borderBottom: "1px solid var(--accent)22" }}
      >
        <span
          className="text-[10px] sm:text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          Module {moduleId}
        </span>
        <span
          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none"
          style={{
            backgroundColor: "var(--accent-light)",
            color: "var(--accent)",
          }}
        >
          {chapterCount} chapters
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="flex items-center gap-4 px-3 sm:px-4 py-3 sm:py-4">

        {/* Icon artwork window */}
        <div
          className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center"
          style={{
            background: isHovered
              ? `radial-gradient(ellipse at 50% 35%, var(--accent)30 0%, var(--accent)12 55%, transparent 80%)`
              : "var(--accent)10",
            border: `1px solid ${isHovered ? "var(--accent)40" : "var(--accent)20"}`,
            transition: "background 0.3s ease, border-color 0.2s ease",
            color: "var(--accent)",
          }}
        >
          {/* Corner bracket details */}
          <span
            className="absolute top-1 left-1 w-2 h-2 pointer-events-none"
            style={{
              borderTop: "1.5px solid var(--accent)35",
              borderLeft: "1.5px solid var(--accent)35",
              borderRadius: "2px 0 0 0",
            }}
          />
          <span
            className="absolute top-1 right-1 w-2 h-2 pointer-events-none"
            style={{
              borderTop: "1.5px solid var(--accent)35",
              borderRight: "1.5px solid var(--accent)35",
              borderRadius: "0 2px 0 0",
            }}
          />
          <span
            className="absolute bottom-1 left-1 w-2 h-2 pointer-events-none"
            style={{
              borderBottom: "1.5px solid var(--accent)35",
              borderLeft: "1.5px solid var(--accent)35",
              borderRadius: "0 0 0 2px",
            }}
          />
          <span
            className="absolute bottom-1 right-1 w-2 h-2 pointer-events-none"
            style={{
              borderBottom: "1.5px solid var(--accent)35",
              borderRight: "1.5px solid var(--accent)35",
              borderRadius: "0 0 2px 0",
            }}
          />

          <div
            style={{
              filter: isHovered ? `drop-shadow(0 2px 6px var(--accent)60)` : "none",
              transition: "filter 0.25s ease",
            }}
          >
            {icon}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4
            className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 truncate"
            style={{ color: isHovered ? "var(--accent)" : "var(--text-primary)", transition: "color 0.2s ease" }}
          >
            {title}
          </h4>
          <p
            className="text-xs sm:text-sm leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </div>

        {/* Chevron */}
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          style={{
            color: isHovered ? "var(--accent)" : "var(--text-tertiary)",
            transform: isHovered ? "translateX(2px)" : "translateX(0)",
            transition: "color 0.2s ease, transform 0.2s ease",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* ── TCG info strip — bottom ── */}
      <div
        className="px-3 sm:px-4 pb-2.5 pt-1.5"
        style={{ borderTop: "1px solid var(--accent)12" }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="h-1 rounded-full flex-1 overflow-hidden"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: isHovered ? "100%" : "0%",
                backgroundColor: "var(--accent)",
                transition: "width 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)",
                opacity: 0.5,
              }}
            />
          </div>
          <span
            className="text-[9px] font-medium uppercase tracking-wider flex-shrink-0"
            style={{ color: "var(--text-tertiary)" }}
          >
            Start →
          </span>
        </div>
      </div>
    </div>
  );
}
