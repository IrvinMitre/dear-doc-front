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
  const [offset, setOffset] = useState(0);
  const limit = 9;
  const pokemonService = new PokemonService();
  const router = useRouter();
  const userService = new UserService();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const responsePokemon = await pokemonService.getpokemons(limit, offset);
      setPokemons(responsePokemon.pokemons);
    } catch (error) {
      alert("Error getting Pokemons");
      throw error;
    }
  };

  const handlePageChange = (newPage: number, offset: number) => {
    setPage(newPage);
    setOffset(offset);
    fetchData();
  };

  async function redirectToFavorites() {
    const name = await userService.getNameUser();
    const route = `/favoritesPokemons?name=${name}`
    router.push(route);
  };

  return (
    <>
      <Row className="justify-content-end pt-2">
        <Col lg="3">
          <Button className={styles.button} onClick={redirectToFavorites}>
            Favorites
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
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center pt-4 pb-2">
        <Col md={5}>
          <Button
            className={styles.button}
            onClick={() => handlePageChange(page - 1, offset - limit)}
            disabled={page <= 1}
          >
            Previous
          </Button>

          <span>Page {page}</span>

          <Button
            className={styles.button}
            onClick={() => handlePageChange(page + 1, offset + limit)}
            disabled={pokemons.length < limit}
          >
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default GridPokemons;
