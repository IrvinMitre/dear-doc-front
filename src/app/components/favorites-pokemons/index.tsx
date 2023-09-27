import { Pokemon } from "@/app/interfaces/pokemon.interfaces";
import { PokemonService } from "@/app/services/pokemons/pokemonService";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "../../styles/list-pokemons.module.css";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const FavoritesListPokemons: React.FC = () => {
  const pokemonService = new PokemonService();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const name = searchParams.get("name") as string;

      const responsePokemon = await pokemonService.getFavoritesPokemons(name);
      setPokemons(responsePokemon);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  }

  const returntoList = () => {
    router.push("/listPokemons");
  };

  return (
    <>
      <Row className="justify-content-end pt-2">
        <Col lg="3">
          <Button className={styles.button} onClick={returntoList}>
            Return
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={4} className="g-2 m-4">
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
                  <li>Name: {pokemon.id_poke_api}</li>
                  <li>Types: {pokemon.types.join(", ")}</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FavoritesListPokemons;
