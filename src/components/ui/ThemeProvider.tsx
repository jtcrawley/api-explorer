"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
  const [pokemon, setPokemonState] = useState<PokemonTheme>("bulbasaur");
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedPokemon = localStorage.getItem("theme-pokemon") as PokemonTheme | null;
    const storedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
    const p = storedPokemon ?? "bulbasaur";
    const m = storedMode ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setPokemonState(p);
    setMode(m);
    applyTheme(p, m);
  }, []);

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

  if (!mounted) return <>{children}</>;

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
