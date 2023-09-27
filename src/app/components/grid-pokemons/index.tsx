import { Pokemon } from "../../interfaces/pokemon.interfaces";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "../../styles/list-pokemons.module.css";
import { PokemonService } from "../../services/pokemons/pokemonService";
import { useRouter } from "next/navigation";
import { UserService } from "@/app/services/users/userService";

const GridPokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 9;
  const pokemonService = new PokemonService();
  const router = useRouter();
  const userService = new UserService();

  useEffect(() => {
    fetchData(limit, offset);
  }, []);

  async function fetchData(limit: number, offset: number) {
    try {
      const responsePokemon = await pokemonService.getPokemons(limit, offset);
      const name = await userService.getNameUser();
      setName(name);
      setPokemons(responsePokemon.pokemons);
    } catch (error) {
      alert("Error getting Pokemons");
      throw error;
    }
  }

  const handlePageChange = (newPage: number, offset: number) => {
    setPage(newPage);
    setOffset(offset);
    fetchData(limit, offset);
  };

  async function addFavorites(namePokemon: string) {
    try {
      const favorites = await pokemonService.addFavoritePokemon(
        name,
        namePokemon
      );
      if (favorites.code === 290) {
        alert("Already in you Favorites");
      } else {
        alert("Pokemon Added to favorites");
      }
    } catch (error) {
      alert("Error adding a Pokemon");
      throw error;
    }
  }

  function redirectToFavorites() {
    const route = `/favoritesPokemons?name=${name}`;
    router.push(route);
  }

  async function searchPokemon() {
    try {
      if (search != "") {
        const pokemonsList = await pokemonService.searchpokemon(search);
        setPokemons(pokemonsList);
      } else {
        setPage(1);
        fetchData(limit, 0);
      }
    } catch (error) {
      alert("Error Searching");
      throw error;
    }
  }

  return (
    <>
      <Row className="justify-content-end pt-2">
        <Col lg="3">
          <Button className={styles.button} onClick={redirectToFavorites}>
            Favorites
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="3">
          <input
            className={styles["search-input"]}
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col>
          <Button
            className={styles["button-search"]}
            onClick={() => searchPokemon()}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-2 m-4">
        {pokemons?.map((pokemon) => (
          <Col key={pokemon.name}>
            <Card className={styles["card-elements"]}>
              <Card.Img
                className={styles["image-card"]}
                variant="center"
                src={pokemon.image}
              />
              <Card.Body>
                <ul className={styles["list-pokemon-detail"]}>
                  <li>#{pokemon.id_poke_api}</li>
                  <li>Name: {pokemon.name}</li>
                  <li>Types: {pokemon.types.join(", ")}</li>
                  <li>
                    <Button
                      className={styles["button-pokemon-favorites"]}
                      variant="primary"
                      onClick={async () => await addFavorites(pokemon.name)}
                    >
                      Add to Favorites
                    </Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {pokemons?.length === 0 && (
          <Col xs={12} md={3}>
            <p>No Pokemons found</p>
          </Col>
        )}
      </Row>
      <Row className="justify-content-center pt-4 pb-2">
        <Col md={5}>
          <Button
            className={styles.button}
            onClick={() => handlePageChange(page - 1, offset - limit)}
            disabled={page <= 1 || search != ""}
          >
            Previous
          </Button>

          <span>Page {page}</span>

          <Button
            className={styles.button}
            onClick={() => handlePageChange(page + 1, offset + limit)}
            disabled={pokemons.length < limit || search != ""}
          >
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default GridPokemons;
