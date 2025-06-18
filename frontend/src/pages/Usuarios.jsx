// Archivo: src/pages/Usuarios.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
  const { token, usuario } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const obtenerUsuarios = async () => {
    if (!usuario?.empresa_id) {
      setError('No se encontró empresa asociada al usuario.');
      return;
    }

    setCargando(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios?empresa_id=${usuario.empresa_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!Array.isArray(data.usuarios)) {
        setError('Respuesta inesperada del servidor.');
        setUsuarios([]);
      } else {
        setUsuarios(data.usuarios);
      }
    } catch (err) {
      console.error('Error al obtener usuarios:', err.message);
      setError('Error al obtener usuarios');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, [usuario]);

  const usuariosFiltrados = usuarios.filter((u) => {
    const nombreCompleto = `${u.nombres} ${u.apellidos}`.toLowerCase();
    return (
      nombreCompleto.includes(busqueda.toLowerCase()) ||
      u.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.numero_documento?.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6 mt-6">
          <h2 className="text-2xl font-bold text-blue-800">Gestión de Usuarios</h2>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
            onClick={() => navigate('/maestros/usuarios/nuevo')}
          >
            ➕ Nuevo Usuario
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre, email o documento..."
          className="mb-4 px-4 py-2 border rounded w-full max-w-sm"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {cargando && (
          <div className="text-center text-blue-600 my-4">Cargando usuarios...</div>
        )}

        {error && (
          <div className="text-center text-red-600 my-4">{error}</div>
        )}

        {!cargando && !error && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-blue-100">
                <tr className="text-left text-sm text-gray-700">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Nro. Documento</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Sucursal</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((u) => (
                    <tr key={u.id} className="text-sm hover:bg-gray-100 border-b">
                      <td className="px-4 py-2">{u.nombres} {u.apellidos}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.numero_documento}</td>
                      <td className="px-4 py-2">{u.rol || 'No definido'}</td>
                      <td className="px-4 py-2">{u.sucursal || 'No definido'}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            u.estado_id === 1
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {u.estado_id === 1 ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => navigate(`/maestros/usuarios/${u.id}/editar`)}
                          className="text-blue-600 hover:underline mr-3"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Usuarios;
