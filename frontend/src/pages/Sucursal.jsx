// src/pages/Sucursales.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sucursales = () => {
  const { token, usuario } = useAuth();
  const navigate = useNavigate();
  const [sucursales, setSucursales] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const obtenerSucursales = async () => {
    if (!usuario?.empresa_id) return;

    setCargando(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/maestros/sucursales?empresa_id=${usuario.empresa_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setSucursales(data.sucursales || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar sucursales');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerSucursales();
  }, [usuario]);

  const filtrar = sucursales.filter(s => s.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6 mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Gestión de Sucursales</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/maestros/sucursales/nuevo')}>
            ➕ Nueva Sucursal
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar sucursal..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="mb-4 p-2 border rounded w-full max-w-sm"
        />

        {cargando && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
          <thead className="bg-blue-100 text-sm text-left text-gray-700">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Email</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrar.map(s => (
              <tr key={s.id} className="border-t text-sm">
                <td className="p-2">{s.nombre}</td>
                <td className="p-2">{s.direccion}</td>
                <td className="p-2">{s.telefono}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${s.estado_id === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {s.estado_id === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline" onClick={() => navigate(`/maestros/sucursales/${s.id}/editar`)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {filtrar.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No se encontraron sucursales</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Sucursales;
