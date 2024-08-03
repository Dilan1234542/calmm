import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const [activo, setActivo] = useState(''); // Valor por defecto
  const [perfilAdministrador, setPerfilAdministrador] = useState(''); // Valor por defecto
  const [perfilPublico, setPerfilPublico] = useState(''); // Valor por defecto
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validar los campos del formulario
    if (!username || !nombreCompleto || !correoElectronico || !password) {
      setError('Todos los campos son obligatorios');
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
          perfilAdministrador,
          perfilPublico,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error
        throw new Error(errorData.error || 'Error en el registro');
      }

      // Redirigir al usuario a la página de inicio después del registro
      navigate('/home');
    } catch (error) {
      setError(error.message);
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
          <input
            type="text"
            placeholder="Perfil Administrador"
            value={perfilAdministrador}
            onChange={(e) => setPerfilAdministrador(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Perfil Público"
            value={perfilPublico}
            onChange={(e) => setPerfilPublico(e.target.value)}
          />
        </label>
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
