"use client";

import { useRef, useState, useCallback } from "react";
import type { PokemonTheme } from "@/components/ui/ThemeProvider";

interface StarterData {
  id: PokemonTheme;
  type: string;
  typeColor: string;
  typeBg: string;
  typeDarkColor: string;
  typeDarkBg: string;
  tagline: string;
  description: string;
}

interface PokemonOption {
  id: PokemonTheme;
  label: string;
  sprite: string;
  accent: string;
  accentDark: string;
}

interface StarterCardProps {
  starter: StarterData;
  option: PokemonOption;
  isActive: boolean;
  mode: "light" | "dark";
  onClick: () => void;
}

function PokeballSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M 1 12 A 11 11 0 0 1 23 12 Z" style={{ fill: "var(--bg-secondary)" }} />
      <path d="M 1 12 A 11 11 0 0 0 23 12 Z" fill="currentColor" />
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      <line x1="1" y1="12" x2="8.5" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15.5" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" style={{ fill: "var(--bg-secondary)" }} stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function StarterCard({
  starter,
  option,
  isActive,
  mode,
  onClick,
}: StarterCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [pokeballKey, setPokeballKey] = useState(0);

  const typeColor = mode === "dark" ? starter.typeDarkColor : starter.typeColor;
  const typeBg   = mode === "dark" ? starter.typeDarkBg   : starter.typeBg;
  const accentColor = mode === "dark" ? option.accentDark : option.accent;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    setMouse({ x, y });
    setRotation({ x: (0.5 - y) * 20, y: (x - 0.5) * 20 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  const handleClick = () => {
    const wasInactive = !isActive;
    onClick();
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 650);
    if (wasInactive) setPokeballKey((k) => k + 1);
  };

  return (
    <div style={{ perspective: "900px" }}>
      <button
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative flex flex-col rounded-2xl border-2 text-left w-full overflow-hidden"
        style={{
          borderColor: isActive ? accentColor : "var(--border)",
          backgroundColor: "var(--bg-secondary)",
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.04) translateZ(0)`
            : "rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)",
          transition: isHovered
            ? "transform 0.06s linear, border-color 0.2s ease, box-shadow 0.12s ease"
            : "transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), border-color 0.2s ease, box-shadow 0.4s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: isHovered
            ? `0 20px 40px -10px ${accentColor}45, 0 6px 18px -4px rgba(0,0,0,0.22)`
            : isActive
            ? `0 4px 16px -4px ${accentColor}30`
            : "none",
        }}
      >
        {/* ── Dot grid texture — masked to the specular highlight region ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            zIndex: -1,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            maskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.03) 35%, transparent 65%)`,
            WebkitMaskImage: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.03) 35%, transparent 65%)`,
          }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`dot-starter-${option.id}`}
              x="0" y="0"
              width="20" height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill={accentColor} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dot-starter-${option.id})`} />
        </svg>

        {/* ── Specular highlight — follows cursor ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.18s ease",
            background: `radial-gradient(
              ellipse at ${mouse.x * 100}% ${mouse.y * 100}%,
              ${accentColor}29 0%,
              ${accentColor}08 45%,
              transparent 68%
            )`,
          }}
        />

        {/* ── Type-colour glow pulse on click ── */}
        <div
          key={`pulse-${isPulsing}`}
          className={`absolute inset-0 pointer-events-none z-10 ${isPulsing ? "starter-pulse" : ""}`}
          style={{ "--pulse-color": typeColor } as React.CSSProperties}
        />

        {/* ────────────────────────────────────────
            TCG HEADER STRIP — name + pokeball
        ──────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-2.5 sm:px-3 pt-2.5 pb-1.5"
          style={{ borderBottom: `1px solid ${typeColor}22` }}
        >
          <span
            className="text-[11px] sm:text-sm font-bold tracking-tight leading-none"
            style={{ color: isActive ? accentColor : "var(--text-primary)" }}
          >
            {option.label}
          </span>

          {/* Pokéball — always visible, full opacity when active */}
          <div
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0 ml-1.5"
            style={{
              color: accentColor,
              opacity: isActive ? 1 : 0.28,
              transition: "opacity 0.2s ease",
            }}
          >
            <div style={{ transform: mode === "light" ? "scaleY(-1)" : undefined }}>
              <div key={pokeballKey} className={isActive && pokeballKey > 0 ? "pokeball-catch" : ""}>
                <PokeballSVG />
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────
            TCG ARTWORK WINDOW
        ──────────────────────────────────────── */}
        <div
          className="relative mx-2 sm:mx-2.5 mt-1.5 rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            background: isActive
              ? `radial-gradient(ellipse at 50% 35%, ${typeColor}30 0%, ${typeColor}12 55%, transparent 80%)`
              : `${typeColor}10`,
            border: `1px solid ${isActive ? typeColor + "40" : typeColor + "20"}`,
            minHeight: "72px",
            padding: "10px 0 10px",
            transition: "background 0.3s ease, border-color 0.2s ease",
          }}
        >
          {/* Inner-corner detail lines — TCG card feel */}
          <span
            className="absolute top-1.5 left-1.5 w-2.5 h-2.5 pointer-events-none"
            style={{
              borderTop: `1.5px solid ${typeColor}35`,
              borderLeft: `1.5px solid ${typeColor}35`,
              borderRadius: "2px 0 0 0",
            }}
          />
          <span
            className="absolute top-1.5 right-1.5 w-2.5 h-2.5 pointer-events-none"
            style={{
              borderTop: `1.5px solid ${typeColor}35`,
              borderRight: `1.5px solid ${typeColor}35`,
              borderRadius: "0 2px 0 0",
            }}
          />
          <span
            className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 pointer-events-none"
            style={{
              borderBottom: `1.5px solid ${typeColor}35`,
              borderLeft: `1.5px solid ${typeColor}35`,
              borderRadius: "0 0 0 2px",
            }}
          />
          <span
            className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 pointer-events-none"
            style={{
              borderBottom: `1.5px solid ${typeColor}35`,
              borderRight: `1.5px solid ${typeColor}35`,
              borderRadius: "0 0 2px 0",
            }}
          />

          {/* Type badge inside the artwork window */}
          <span
            className="absolute top-2 right-2 z-20 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none pointer-events-none"
            style={{ backgroundColor: typeBg, color: typeColor }}
          >
            {starter.type}
          </span>

          {/* Sprite */}
          <img
            src={option.sprite}
            alt={option.label}
            width={64}
            height={64}
            className="w-12 h-12 sm:w-[68px] sm:h-[68px]"
            style={{
              imageRendering: "auto",
              objectFit: "contain",
              filter: isActive
                ? `drop-shadow(0 2px 8px ${accentColor}65)`
                : isHovered
                ? `drop-shadow(0 2px 6px ${accentColor}40)`
                : "none",
              transition: "filter 0.25s ease",
            }}
          />
        </div>

        {/* ────────────────────────────────────────
            TCG INFO SECTION — tagline + description
        ──────────────────────────────────────── */}
        <div
          className="px-2.5 sm:px-3 pt-1.5 pb-2.5"
          style={{ borderTop: `1px solid ${typeColor}18` }}
        >
          <p
            className="text-[9px] sm:text-[10px] font-semibold leading-snug mb-0.5"
            style={{ color: isActive ? accentColor : "var(--text-secondary)" }}
          >
            {starter.tagline}
          </p>
          <p
            className="text-[9px] sm:text-[10px] leading-relaxed hidden sm:block"
            style={{ color: "var(--text-tertiary)" }}
          >
            {starter.description}
          </p>
        </div>
      </button>
    </div>
  );
}
