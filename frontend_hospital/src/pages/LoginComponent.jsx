import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password }, { withCredentials: true })

      console.log(response.data);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user_role', response.data.role); // útil si necesitas controlar roles
      navigate('/reserva'); // redirige al home u otra página
    } catch (err) {
        console.log(err)
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Usuario</label>
          <input type="text" className="form-control" value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
      <div className="mt-3">
        <p>¿No tienes una cuenta? <a href="/registro" className="btn btn-link">Crea una ahora</a></p>
      </div>
    </div>
  );
};

export default LoginComponent;
