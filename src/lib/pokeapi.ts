const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonBasic {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  height: number;
  weight: number;
}

export async function fetchPokemon(nameOrId: string | number): Promise<PokemonBasic> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Pokemon "${nameOrId}" not found (${response.status})`);
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
    height: data.height,
    weight: data.weight,
  };
}

export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<{ name: string; url: string }[]> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonByType(
  type: string
): Promise<{ name: string; url: string }[]> {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  const data = await response.json();
  return data.pokemon.map((p: any) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
  }));
}
