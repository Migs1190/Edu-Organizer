import React from 'react';
import { Col, Container, Navbar } from 'react-bootstrap';
import '../../sass/MainFooter.scss';

export default function AppFooter() {
  return (
    <section>
      <Navbar id="main-footer" className="vw-100 position-fixed " bg="dark">
        <Container fluid>
          <Col sm={12} className="footer-item text-white text-center w-100">
            <Navbar.Brand target="_blank" href="https://github.com/Migs1190">
              <img src="/palico.png" className="palico" alt="Migs' Github" />
            </Navbar.Brand>
            <Navbar.Brand
              target="_blank"
              href="https://www.linkedin.com/in/ahmad-magdy-85a034240/"
            >
              <img src="/manon.png" className="manon" alt="Migs' LinkedIn" />
            </Navbar.Brand>
          </Col>
        </Container>
      </Navbar>
    </section>
  );
}
