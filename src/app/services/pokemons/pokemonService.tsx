import { Pokemon } from "@/app/interfaces/pokemon.interfaces";
import { PokemonsApi } from "@/app/interfaces/pokemonsApi.interface";
import axios from "axios";

export class PokemonService {
  async getPokemons(limit: number, offset: number) {
    const params = {
      limit,
      offset,
    };

    const response = await axios.get(
      "http://localhost:8002/v0/pokemons/getPokemons",
      {
        params,
      }
    );
    return response.data as PokemonsApi;
  }

  async getFavoritesPokemons(name: string) {
    const params = {
      name,
    };

    const response = await axios.get(
      "http://localhost:8002/v0/pokemons/getFavoritesPokemons",
      {
        params,
      }
    );
    return response.data as Array<Pokemon>;
  }

  async addFavoritePokemon(nameUser: string, namePokemon: string) {
    const favoriteResponse = await axios.post(
      "http://localhost:8002/v0/pokemons/addFavoritesPokemons",
      {
        nameUser,
        namePokemon,
      }
    );
    return favoriteResponse.data;
  }

  async searchpokemon(name: string) {
    const params = {
      name,
    };
    const searchResponse = await axios.get(
      "http://localhost:8002/v0/pokemons/searchPokemons",
      {
        params,
      }
    );
    return searchResponse.data as Array<Pokemon>;
  }
}
