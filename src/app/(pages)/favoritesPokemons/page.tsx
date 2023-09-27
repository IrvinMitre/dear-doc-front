"use client";
import FavoritesListPokemons from "@/app/components/favorites-pokemons";
import React from "react";
import { Col, Row } from "react-bootstrap";

const FavoritesPokemons = () => {
  return (
    <>
      <Row className="justify-content-center pt-4">
        <Col lg="8">
          <h2>Favorites Pokemons</h2>
        </Col>
      </Row>
      <Row className="justify-content-center pt-4">
        <Col lg="8">
          <FavoritesListPokemons />
        </Col>
      </Row>
    </>
  );
};
export default FavoritesPokemons;
