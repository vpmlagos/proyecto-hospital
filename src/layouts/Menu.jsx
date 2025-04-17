import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import LogoutButton from '../components/LogoutButton';

const Menu = () => {
  const loggedIn = isAuthenticated();

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Centro de ayuda</Nav.Link>
          <Nav.Link as={Link} to={loggedIn ? "/reserva" : "/login"}>
            Reserva Ya
          </Nav.Link>
          {loggedIn && <LogoutButton />} {/* Solo se muestra si está logueado */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
