import { Pokemon } from "./pokemon.interfaces";

export interface PokemonsApi {
  limit: number;
  offset: number;
  count: number;
  pokemons: Array<Pokemon>;
}
