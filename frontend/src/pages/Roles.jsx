import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Roles = () => {
  const { token, usuario } = useAuth();
  const [roles, setRoles] = useState([]);
  const [nuevoRol, setNuevoRol] = useState({ nombre: '', descripcion: '' });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const obtenerRoles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/maestros/roles?empresa_id=${usuario.empresa_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRoles(data.roles || []);
    } catch (err) {
      setError('Error al cargar roles');
    }
  };

  const crearRol = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...nuevoRol,
          empresa_id: usuario.empresa_id,
          estado_id: 1,
          created_by: usuario.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNuevoRol({ nombre: '', descripcion: '' });
        obtenerRoles();
      } else {
        setError(data.msg || 'Error al crear rol');
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  useEffect(() => {
    obtenerRoles();
  }, [usuario]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Gestión de Roles</h2>

        <div className="mb-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-2">Nuevo Rol</h3>
          <input
            className="border px-3 py-2 mr-2 w-1/3"
            placeholder="Nombre del rol"
            value={nuevoRol.nombre}
            onChange={(e) => setNuevoRol({ ...nuevoRol, nombre: e.target.value })}
          />
          <input
            className="border px-3 py-2 mr-2 w-1/2"
            placeholder="Descripción"
            value={nuevoRol.descripcion}
            onChange={(e) => setNuevoRol({ ...nuevoRol, descripcion: e.target.value })}
          />
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded"
            onClick={crearRol}
          >
            Crear
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>

        <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
          <thead className="bg-blue-100 text-sm text-left text-gray-700">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.id} className="border-t text-sm">
                <td className="px-4 py-2">{rol.nombre}</td>
                <td className="px-4 py-2">{rol.descripcion}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${rol.estado_id === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {rol.estado_id === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                 <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/maestros/roles/${rol.id}/editar`)}
                     className="text-blue-600 hover:underline mr-3"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">
                  No hay roles registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Roles;
