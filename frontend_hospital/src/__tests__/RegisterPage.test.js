import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock para axios
jest.mock('axios');

describe('RegisterPage', () => {
  
  // Mock para localStorage
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  test('should render the register form', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    // Verificar si los elementos del formulario están presentes
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrar/i)).toBeInTheDocument();
  });

  test('should allow user to type in username, password and confirm password', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);

    fireEvent.change(usernameInput, { target: { value: 'newUser' } });
    fireEvent.change(passwordInput, { target: { value: 'newPass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPass123' } });

    expect(usernameInput.value).toBe('newUser');
    expect(passwordInput.value).toBe('newPass123');
    expect(confirmPasswordInput.value).toBe('newPass123');
  });

  test('should show an alert if passwords do not match', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    // Ingresar un valor para las contraseñas que no coinciden
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'differentPass' } });

    // Simular submit
    fireEvent.click(screen.getByText(/Registrar/i));

    // Verificar que se haya mostrado la alerta de contraseñas no coincidentes
    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  test('should submit form and call API on successful registration', async () => {
    axios.post.mockResolvedValue({
      data: { message: 'Registro exitoso' },
    });

    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    // Ingresar un valor para las contraseñas que coinciden
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'newPass123' } });

    // Simular submit
    fireEvent.click(screen.getByText(/Registrar/i));

    // Esperar que la llamada a la API haya sido realizada
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/register',
      { username: 'newUser', password: 'newPass123' }
    ));

    // Verificar que la alerta de éxito se muestre
    expect(window.alert).toHaveBeenCalledWith('Registro exitoso. Ahora puedes iniciar sesión.');
  });

  test('should show an alert if there is an error during registration', async () => {
    axios.post.mockRejectedValue(new Error('Error en el registro'));

    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    // Ingresar un valor para las contraseñas que coinciden
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'newPass123' } });

    // Simular submit
    fireEvent.click(screen.getByText(/Registrar/i));

    // Esperar que se haya mostrado la alerta de error
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Hubo un error en el registro'));
  });

});
