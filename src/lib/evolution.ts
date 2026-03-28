import type { PokemonTheme } from "@/components/ui/ThemeProvider";

export type EvolutionStage = 0 | 1 | 2;

// Evolution lines for each starter
export const EVOLUTION_LINES: Record<PokemonTheme, [string, string, string]> = {
  bulbasaur:  ["bulbasaur",  "ivysaur",    "venusaur"],
  squirtle:   ["squirtle",   "wartortle",  "blastoise"],
  charmander: ["charmander", "charmeleon", "charizard"],
};

export const EVOLUTION_NAMES: Record<PokemonTheme, [string, string, string]> = {
  bulbasaur:  ["Bulbasaur",  "Ivysaur",    "Venusaur"],
  squirtle:   ["Squirtle",   "Wartortle",  "Blastoise"],
  charmander: ["Charmander", "Charmeleon", "Charizard"],
};

export function spriteUrl(name: string): string {
  return `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`;
}

/** 0 = base, 1 = middle, 2 = final */
export function getEvolutionStage(progressPercent: number): EvolutionStage {
  if (progressPercent >= 66) return 2;
  if (progressPercent >= 33) return 1;
  return 0;
}

/**
 * Progress within the CURRENT stage (0–1), used to fill the XP bar.
 * Each stage spans ~33% of total progress.
 */
export function getStageProgress(progressPercent: number): number {
  if (progressPercent >= 66) return Math.min((progressPercent - 66) / 34, 1);
  if (progressPercent >= 33) return Math.min((progressPercent - 33) / 33, 1);
  return Math.min(progressPercent / 33, 1);
}
