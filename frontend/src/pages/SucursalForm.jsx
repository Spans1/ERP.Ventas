import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const SucursalForm = () => {
  const { token, usuario } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Si existe, estamos editando
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    estado_id: 1,
  });
  const [error, setError] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    if (id) {
      setModoEdicion(true);
      cargarSucursal();
    }
  }, [id]);

  const cargarSucursal = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sucursales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.sucursal) {
        setForm({
          nombre: data.sucursal.nombre,
          direccion: data.sucursal.direccion || '',
          telefono: data.sucursal.telefono || '',
          email: data.sucursal.email || '',
          estado_id: data.sucursal.estado_id,
        });
      } else {
        setError('Sucursal no encontrada');
      }
    } catch (err) {
      console.error('Error al cargar sucursal:', err);
      setError('Error al cargar datos');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = modoEdicion
      ? `${import.meta.env.VITE_API_URL}/sucursales/${id}`
      : `${import.meta.env.VITE_API_URL}/sucursales`;

    const payload = {
      ...form,
      ...(modoEdicion ? { updated_by: usuario.id } : { empresa_id: usuario.empresa_id, created_by: usuario.id }),
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

      navigate('/maestros/sucursales');
    } catch (err) {
      console.error('Error al guardar sucursal:', err.message);
      setError(err.message || 'Error inesperado');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          {modoEdicion ? 'Editar Sucursal' : 'Registrar Nueva Sucursal'}
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
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
            <label className="block text-sm font-medium">Dirección</label>
            <textarea
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="mt-1 block w-full border px-3 py-2 rounded"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="mt-1 block w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full border px-3 py-2 rounded"
              />
            </div>
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

export default SucursalForm;
