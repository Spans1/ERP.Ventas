import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const RolForm = () => {
  const { token, usuario } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Si existe, estamos editando
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    estado_id: 1,
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setModoEdicion(true);
      cargarRol();
    }
  }, [id]);

  const cargarRol = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.rol) {
        setForm({
          nombre: data.rol.nombre,
          descripcion: data.rol.descripcion || '',
          estado_id: data.rol.estado_id,
        });
      } else {
        setError('Rol no encontrado');
      }
    } catch (err) {
      console.error('Error al cargar rol:', err);
      setError('Error al cargar datos del rol');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = modoEdicion
      ? `${import.meta.env.VITE_API_URL}/roles/${id}`
      : `${import.meta.env.VITE_API_URL}/roles`;

    const payload = {
      ...form,
      ...(modoEdicion
        ? { updated_by: usuario.id }
        : { empresa_id: usuario.empresa_id, created_by: usuario.id }),
    };

    try {
      const res = await fetch(url, {
        method: modoEdicion ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Error al guardar');
      }

      navigate('/maestros/roles');
    } catch (err) {
      console.error('Error al guardar rol:', err.message);
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          {modoEdicion ? 'Editar Rol' : 'Registrar Nuevo Rol'}
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre del Rol</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full border px-3 py-2 rounded"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado_id"
              value={form.estado_id}
              onChange={handleChange}
              className="mt-1 block w-full border px-3 py-2 rounded"
            >
              <option value={1}>Activo</option>
              <option value={2}>Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
            >
              {modoEdicion ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RolForm;
