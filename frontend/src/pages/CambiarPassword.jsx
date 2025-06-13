import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const CambiarPassword = () => {
  const { usuario, token, logout } = useAuth();
  const [password_actual, setActual] = useState('');
  const [password_nuevo, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!password_actual || !password_nuevo || !confirmar) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password_nuevo !== confirmar) {
      setError('La nueva contraseña no coincide');
      return;
    }1

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/usuarios/${usuario.id}/password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password_actual, password_nuevo }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Error al cambiar contraseña');

      setMensaje('Contraseña actualizada correctamente');
      setActual('');
      setNueva('');
      setConfirmar('');

        // 🔒 Forzar cierre de sesión luego de éxito
        setTimeout(() => {
        logout();
        navigate('/login');
        }, 1500);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Cambiar contraseña</h2>
        {mensaje && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{mensaje}</div>}
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Contraseña actual"
            className="w-full px-4 py-2 border rounded"
            value={password_actual}
            onChange={(e) => setActual(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full px-4 py-2 border rounded"
            value={password_nuevo}
            onChange={(e) => setNueva(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            className="w-full px-4 py-2 border rounded"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CambiarPassword;
