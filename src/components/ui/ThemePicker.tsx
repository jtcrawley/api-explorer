"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, type PokemonTheme } from "./ThemeProvider";

const POKEMON: { id: PokemonTheme; label: string; sprite: string; accent: string; accentDark: string }[] = [
  {
    id: "bulbasaur",
    label: "Bulbasaur",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif",
    accent: "#059669",
    accentDark: "#34d399",
  },
  {
    id: "squirtle",
    label: "Squirtle",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/squirtle.gif",
    accent: "#0284c7",
    accentDark: "#38bdf8",
  },
  {
    id: "charmander",
    label: "Charmander",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/charmander.gif",
    accent: "#ea580c",
    accentDark: "#fb923c",
  },
];

export default function ThemePicker({ direction = "up" }: { direction?: "up" | "down" }) {
  const { pokemon, mode, setPokemon, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = POKEMON.find(p => p.id === pokemon)!;
  const accentColor = mode === "dark" ? current.accentDark : current.accent;

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Choose theme"
        title="Choose theme"
      >
        <img
          src={current.sprite}
          alt={current.label}
          style={{ imageRendering: "pixelated", height: 24, width: 24, objectFit: "contain" }}
        />
      </button>

      {/* Popover */}
      {open && (
        <div
          className={`absolute ${direction === "up" ? "bottom-10" : "top-10"} left-0 w-52 rounded-2xl border shadow-2xl z-50 overflow-hidden`}
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <div className="px-4 pt-3 pb-2">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-tertiary)" }}>
              Choose your theme
            </p>

            {/* Pokemon options */}
            <div className="space-y-1 mb-3">
              {POKEMON.map(p => {
                const isActive = pokemon === p.id;
                const color = mode === "dark" ? p.accentDark : p.accent;
                return (
                  <button
                    key={p.id}
                    onClick={() => { setPokemon(p.id); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left"
                    style={{
                      backgroundColor: isActive ? "var(--bg-tertiary)" : "transparent",
                      border: isActive ? `1px solid ${color}` : "1px solid transparent",
                    }}
                  >
                    <img
                      src={p.sprite}
                      alt={p.label}
                      style={{ imageRendering: "pixelated", height: 32, width: 32, objectFit: "contain", flexShrink: 0 }}
                    />
                    <span className="text-sm font-medium flex-1"
                      style={{ color: isActive ? color : "var(--text-secondary)" }}>
                      {p.label}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Light / Dark toggle */}
            <div
              className="flex items-center justify-between px-3 py-2 rounded-xl"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            >
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {mode === "light" ? "☀️ Light" : "🌙 Dark"}
              </span>
              <button
                onClick={toggleMode}
                className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-label="Toggle light/dark"
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ transform: mode === "dark" ? "translateX(22px)" : "translateX(2px)" }}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
