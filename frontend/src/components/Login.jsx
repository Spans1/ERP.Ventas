import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { obtenerTokenTecnico } from '../services/tokenService';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Paso 1: Obtener token usando el usuario técnico
      const systemToken = await obtenerTokenTecnico();

      // Paso 2: Login del usuario real, usando token anterior
      const loginRes = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${systemToken}`
        },
        body: JSON.stringify({ email, password })
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.msg || "Credenciales inválidas");
      
      // Aquí puedes guardar el token y redirigir
      login(systemToken, loginData.user);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-white">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Iniciar Sesión - SYRDIA</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type={showPass ? 'text' : 'password'}
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          <div className="text-sm mt-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)} />
              <span>Mostrar contraseña</span>
            </label>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          {loading ? 'Validando...' : 'Ingresar'}
        </button>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 text-sm hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;