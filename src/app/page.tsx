"use client";
import { Row, Col } from "react-bootstrap";
import LoginForm from "./components/login-form";

export default function Home() {
  return (
    <>
      <Row className="justify-content-center pt-4">
        <Col lg="8">
          <LoginForm />
        </Col>
      </Row>
    </>
  );
}
