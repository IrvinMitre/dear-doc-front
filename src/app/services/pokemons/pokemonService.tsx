import { PokemonsApi } from "@/app/interfaces/pokemonsApi.interface";
import axios from "axios";

export class PokemonService {
  async getpokemons(limit: number, offset: number) {
    const params = {
      limit,
      offset,
    };

    const response = await axios.get("http://localhost:8002/v0/pokemons/getPokemons", {
      params,
    });
    return response.data as PokemonsApi;
  }
}