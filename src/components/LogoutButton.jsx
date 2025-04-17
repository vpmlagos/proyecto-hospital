import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpia datos del localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');

    // (Opcional) Si tu backend maneja sesiones por cookie:
    // await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });

    // Redirige al login
    navigate('/');
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
