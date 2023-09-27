"use client";
import GridPokemons from "@/app/components/grid-pokemons";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ListPokemons = () => {
  return (
    <>
      <Row className="justify-content-center pt-4">
        <Col lg="8">
          <h2>Pokemons</h2>
        </Col>
      </Row>
      <Row className="justify-content-center pt-4">
        <Col lg="6">
          <GridPokemons />
        </Col>
      </Row>
    </>
  );
};
export default ListPokemons;
