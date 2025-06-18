import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const UsuarioForm = () => {
  const { token, usuario } = useAuth();
  const { id } = useParams(); // Si existe, es modo edición
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    numero_documento: '',
    tipo_documento_id: 1,
    rol_id: '',
    sucursal_id: '',
    estado_id: 1,
    password: 'temporal-123',
  });

  const [roles, setRoles] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setModoEdicion(true);
      obtenerUsuario();
    }
    obtenerMaestros();
  }, [id]);

  const obtenerMaestros = async () => {
    try {
      const [resRoles, resSucursales] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/roles?empresa_id=${usuario.empresa_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${import.meta.env.VITE_API_URL}/sucursales?empresa_id=${usuario.empresa_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const dataRoles = await resRoles.json();
      const dataSucursales = await resSucursales.json();
      setRoles(dataRoles.roles || []);
      setSucursales(dataSucursales.sucursales || []);
    } catch (err) {
      console.error('Error al cargar maestros:', err);
    }
  };

  const obtenerUsuario = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.usuario) {
        setForm({
          ...data.usuario,
          password: '',
        });
      }
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      setError('No se pudo cargar el usuario.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      empresa_id: usuario.empresa_id,
      [modoEdicion ? 'updated_by' : 'created_by']: usuario.id,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/usuarios${modoEdicion ? `/${id}` : ''}`,
        {
          method: modoEdicion ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Error');

      navigate('/maestros/usuarios');
    } catch (err) {
      console.error('Error al guardar:', err.message);
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          {modoEdicion ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label>Nro. Documento</label>
              <input
                type="text"
                name="numero_documento"
                value={form.numero_documento}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Rol</label>
              <select
                name="rol_id"
                value={form.rol_id}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Selecciona --</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Sucursal</label>
              <select
                name="sucursal_id"
                value={form.sucursal_id}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Selecciona --</option>
                {sucursales.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          {!modoEdicion && (
            <div>
              <label>Password temporal</label>
              <input
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          )}

          <div>
            <label>Estado</label>
            <select
              name="estado_id"
              value={form.estado_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value={1}>Activo</option>
              <option value={2}>Inactivo</option>
            </select>
          </div>

          <div className="text-right">
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

export default UsuarioForm;
