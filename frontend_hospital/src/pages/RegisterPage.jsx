import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', { username , password});

      console.log(response.data);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login'); // redirige al login después del registro exitoso
    } catch (err) {
      console.log(err);
      alert('Hubo un error en el registro');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
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
        <div className="mb-3">
          <label>Confirmar Contraseña</label>
          <input type="password" className="form-control" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      <div className="mt-3">
        <p>¿Ya tienes una cuenta? <a href="/login" className="btn btn-link">Inicia sesión</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
