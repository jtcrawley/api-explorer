"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTheme, type PokemonTheme } from "./ThemeProvider";

export const POKEMON_OPTIONS: {
  id: PokemonTheme;
  label: string;
  sprite: string;
  accent: string;
  accentDark: string;
}[] = [
  {
    id: "bulbasaur",
    label: "Bulbasaur",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif",
    accent: "#15803d",
    accentDark: "#4ade80",
  },
  {
    id: "squirtle",
    label: "Squirtle",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/squirtle.gif",
    accent: "#0369a1",
    accentDark: "#38bdf8",
  },
  {
    id: "charmander",
    label: "Charmander",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/charmander.gif",
    accent: "#c2410c",
    accentDark: "#fb923c",
  },
];

const POPOVER_W = 232;
const POPOVER_H = 260;
const MARGIN = 10;

interface PopoverPos {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

interface ThemePickerProps {
  /** Provide a custom trigger. Receives the ref to attach, the click handler, and open state. */
  renderTrigger?: (props: {
    ref: React.RefObject<HTMLButtonElement>;
    onClick: () => void;
    open: boolean;
  }) => React.ReactNode;
}

export default function ThemePicker({ renderTrigger }: ThemePickerProps = {}) {
  const { pokemon, mode, setPokemon, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<PopoverPos>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef = useRef<HTMLButtonElement>(null) as React.RefObject<HTMLButtonElement>;
  const popoverRef = useRef<HTMLDivElement>(null);

  const computePos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const newPos: PopoverPos = {};

    // Vertical: prefer above if near bottom
    if (vh - r.bottom < POPOVER_H + MARGIN && r.top > POPOVER_H + MARGIN) {
      newPos.bottom = vh - r.top + MARGIN;
    } else {
      newPos.top = r.bottom + MARGIN;
    }

    // Horizontal: align left to trigger, shift if clips right edge
    if (r.left + POPOVER_W > vw - MARGIN) {
      newPos.left = Math.max(MARGIN, vw - POPOVER_W - MARGIN);
    } else {
      newPos.left = r.left;
    }

    setPos(newPos);
  }, []);

  const handleToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      computePos();
      setOpen(true);
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Recompute position on scroll/resize
  useEffect(() => {
    if (!open) return;
    const update = () => computePos();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, computePos]);

  const current = POKEMON_OPTIONS.find((p) => p.id === pokemon)!;
  const accentColor = mode === "dark" ? current.accentDark : current.accent;

  const defaultTrigger = (
    <button
      ref={triggerRef}
      onClick={handleToggle}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
      aria-label="Choose your Pokémon theme"
      aria-expanded={open}
    >
      <img
        src={current.sprite}
        alt={current.label}
        width={20}
        height={20}
        style={{ imageRendering: "auto", objectFit: "contain", flexShrink: 0 }}
      />
      <span
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Choose your Pokémon
      </span>
    </button>
  );

  return (
    <>
      {renderTrigger
        ? renderTrigger({ ref: triggerRef, onClick: handleToggle, open })
        : defaultTrigger}

      {/* Viewport-aware popover via portal */}
      {open &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              zIndex: 9999,
              width: POPOVER_W,
              ...pos,
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
            }}
            className="rounded-2xl border shadow-2xl overflow-hidden"
          >
            <div className="p-3">
              {/* Header */}
              <p
                className="text-[11px] font-semibold uppercase tracking-wider px-2 mb-2"
                style={{ color: "var(--text-tertiary)" }}
              >
                Choose your Pokémon
              </p>

              {/* Pokémon options */}
              <div className="space-y-0.5 mb-2">
                {POKEMON_OPTIONS.map((p) => {
                  const isActive = pokemon === p.id;
                  const color = mode === "dark" ? p.accentDark : p.accent;
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setPokemon(p.id); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all text-left"
                      style={{
                        backgroundColor: isActive
                          ? "var(--bg-tertiary)"
                          : "transparent",
                        outline: isActive
                          ? `1.5px solid ${color}`
                          : "1.5px solid transparent",
                      }}
                    >
                      <img
                        src={p.sprite}
                        alt={p.label}
                        width={40}
                        height={40}
                        style={{
                          imageRendering: "auto",
                          objectFit: "contain",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        className="text-sm font-medium flex-1"
                        style={{
                          color: isActive ? color : "var(--text-secondary)",
                        }}
                      >
                        {p.label}
                      </span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mr-1"
                          style={{ backgroundColor: color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px mx-2 mb-2" style={{ backgroundColor: "var(--border)" }} />

              {/* Light / Dark mode row */}
              <div className="flex items-center justify-between px-2 py-1.5">
                <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                  {mode === "light" ? <SunIcon /> : <MoonIcon />}
                  <span className="text-sm font-medium">
                    {mode === "light" ? "Light" : "Dark"}
                  </span>
                </div>

                {/* iOS-style toggle */}
                <button
                  onClick={toggleMode}
                  role="switch"
                  aria-checked={mode === "dark"}
                  aria-label="Toggle dark mode"
                  className="relative flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2"
                  style={{
                    width: 44,
                    height: 24,
                    backgroundColor: mode === "dark" ? accentColor : "var(--border-hover)",
                  }}
                >
                  <span
                    className="absolute rounded-full bg-white shadow"
                    style={{
                      top: 3,
                      left: 3,
                      width: 18,
                      height: 18,
                      transform: mode === "dark" ? "translateX(20px)" : "translateX(0px)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
