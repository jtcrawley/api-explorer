"use client";

import { createContext, useContext, useState } from "react";

export type PokemonTheme = "bulbasaur" | "squirtle" | "charmander";
export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  pokemon: PokemonTheme;
  mode: ThemeMode;
  setPokemon: (p: PokemonTheme) => void;
  toggleMode: () => void;
  // Legacy compat for any existing toggleTheme callers
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  pokemon: "bulbasaur",
  mode: "dark",
  setPokemon: () => {},
  toggleMode: () => {},
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(pokemon: PokemonTheme, mode: ThemeMode) {
  const root = document.documentElement;
  // Remove all theme classes
  root.classList.remove(
    "theme-bulbasaur-light", "theme-bulbasaur-dark",
    "theme-squirtle-light", "theme-squirtle-dark",
    "theme-charmander-light", "theme-charmander-dark",
    "dark"
  );
  root.classList.add(`theme-${pokemon}-${mode}`);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pokemon, setPokemonState] = useState<PokemonTheme>(() => {
    if (typeof window === "undefined") return "bulbasaur";
    return (localStorage.getItem("theme-pokemon") as PokemonTheme) || "bulbasaur";
  });
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    return (
      (localStorage.getItem("theme-mode") as ThemeMode) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  });

  const setPokemon = (p: PokemonTheme) => {
    setPokemonState(p);
    localStorage.setItem("theme-pokemon", p);
    applyTheme(p, mode);
  };

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("theme-mode", next);
    applyTheme(pokemon, next);
  };

  return (
    <ThemeContext.Provider value={{
      pokemon,
      mode,
      setPokemon,
      toggleMode,
      theme: mode,
      toggleTheme: toggleMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
