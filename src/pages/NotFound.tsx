import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      <h2 className="display-2 text-center">There's Nothing Out Here!</h2>
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <Button as={Link as any} to="/" className="mx-auto d-block w-25">
        Go Back To Home
      </Button>
    </Container>
  );
}

export default NotFound;
