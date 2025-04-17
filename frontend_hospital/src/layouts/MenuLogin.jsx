import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';

const MenuLogin = () => {
  const navigate = useNavigate();

  const handleProfesionalClick = (e) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Si no hay token o el rol es "user", redirige al login
    if (!token || role === "user") {
      e.preventDefault(); // Evita ir a /profesionales
      navigate('/login');
    }
  };

  return (
    <Nav className="justify-content-begin nav-bar-first" activeKey="/">
      <Nav.Item className='nav-bar-first-box'>
        <Nav.Link
          as={Link}
          to="/"
          className="nav-bar-first-letter"
        >
          Paciente
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='nav-bar-first-box'>
        <Nav.Link
          as={Link}
          to="/profesionales"
          onClick={handleProfesionalClick}
          className="nav-bar-first-letter"
        >
          Profesional de la Salud
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MenuLogin;
