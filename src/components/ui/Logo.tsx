"use client";

import { useState, useCallback } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
}

function PokeballIcon({ size, isHovered, isSpinning }: { size: number; isHovered: boolean; isSpinning: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={isSpinning ? "pokeball-logo-spin" : ""}
      style={{
        color: "var(--accent)",
        transform: isHovered && !isSpinning ? "rotate(-18deg) scale(1.12)" : "rotate(0deg) scale(1)",
        transition: isHovered
          ? "transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1)"
          : "transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
        display: "block",
        flexShrink: 0,
      }}
    >
      {/* Top half — background fill so it looks cut */}
      <path d="M 1 12 A 11 11 0 0 1 23 12 Z" style={{ fill: "var(--bg-secondary)" }} />
      {/* Bottom half — accent fill */}
      <path d="M 1 12 A 11 11 0 0 0 23 12 Z" fill="currentColor" />
      {/* Outer ring */}
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      {/* Dividing line — left segment */}
      <line x1="1" y1="12" x2="8.5" y2="12" stroke="currentColor" strokeWidth="1.5" />
      {/* Dividing line — right segment */}
      <line x1="15.5" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" />
      {/* Centre button ring */}
      <circle cx="12" cy="12" r="3" style={{ fill: "var(--bg-secondary)" }} stroke="currentColor" strokeWidth="1.5" />
      {/* Centre button dot */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ size = 28, showWordmark = true }: LogoProps) {
  const { mode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = useCallback(() => {
    setSpinKey((k) => k + 1);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 620);
  }, []);

  return (
    <div
      className="flex items-center gap-2.5 cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Pokéball mark — flipped vertically in light mode so the coloured half is always on top */}
      <div style={{ transform: mode === "light" ? "scaleY(-1)" : undefined }}>
        <div key={spinKey}>
          <PokeballIcon size={size} isHovered={isHovered} isSpinning={isSpinning} />
        </div>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className="text-base font-bold tracking-tight leading-none"
          style={{
            color: isHovered ? "var(--accent)" : "var(--text-primary)",
            transition: "color 0.18s ease",
          }}
        >
          API Trainer
        </span>
      )}
    </div>
  );
}
