import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const [activo, setActivo] = useState(''); // Valor por defecto
  const [error, setError] = useState('');

  // Valores predeterminados para los perfiles
  const perfilAdministrador = null; // Valor predeterminado (no visible para el usuario)
  const perfilPublico = '1'; // Valor predeterminado (no visible para el usuario)

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (!username || !nombreCompleto || !correoElectronico || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Validar que el nombre completo no contenga números
    const nombreCompletoValido = /^[a-zA-Z\s]+$/.test(nombreCompleto);
    if (!nombreCompletoValido) {
      setError('El nombre completo no puede contener números');
      return;
    }

    try {
      // Enviar la solicitud de registro a la API
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          nombreCompleto,
          correoElectronico,
          activo,
          perfilAdministrador, // Valor predeterminado no visible
          perfilPublico, // Valor predeterminado no visible
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error
        // Verificar el mensaje de error del backend
        if (errorData.error === 'Username already exists') {
          setError('El nombre de usuario ya está en uso. Intenta con otro.');
        } else {
          setError(errorData.error || 'Error en el registro');
        }
        return;
      }

      // Redirigir al usuario a la página de inicio después del registro
      navigate('/home');
    } catch (error) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre Completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          Activo:
          <select
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="0">No</option>
            <option value="1">Sí</option>
          </select>
        </label>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <span className="switch-link" onClick={() => navigate('/')}>Iniciar Sesión</span>
      </p>
    </div>
  );
};

export default Signup;
