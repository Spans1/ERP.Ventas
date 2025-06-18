const Rol = require('../models/Rol');

exports.crearRol = async (req, res) => {
  try {
    const { empresa_id, nombre, descripcion, estado_id, created_by } = req.body;

    if (!empresa_id || !nombre || !estado_id || !created_by) {
      return res.status(400).json({ msg: 'Faltan datos obligatorios' });
    }

    const nuevoRol = await Rol.crear({ empresa_id, nombre, descripcion, estado_id, created_by });
    res.status(201).json({ msg: 'Rol creado', id: nuevoRol.id });
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ msg: 'Error al crear rol' });
  }
};

exports.listarRoles = async (req, res) => {
  try {
    const empresa_id = parseInt(req.query.empresa_id);
    if (!empresa_id) return res.status(400).json({ msg: 'Debe enviar empresa_id' });

    const roles = await Rol.listarPorEmpresa(empresa_id);
    res.json({ roles });
  } catch (error) {
    console.error('Error al listar roles:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

exports.actualizarRol = async (req, res) => {
  try {
    const rol_id = parseInt(req.params.id);
    const { nombre, descripcion, estado_id, updated_by } = req.body;

    if (!rol_id || !nombre || !estado_id || !updated_by) {
      return res.status(400).json({ msg: 'Datos incompletos' });
    }

    await Rol.actualizar(rol_id, { nombre, descripcion, estado_id, updated_by });
    res.json({ msg: 'Rol actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ msg: 'Error al actualizar rol' });
  }
};

exports.obtenerRolPorId = async (req, res) => {
  try {
    const rol_id = parseInt(req.params.id);
    const data = await Rol.obtenerPorId(rol_id);
    if (!data) return res.status(404).json({ msg: 'Rol no encontrado' });
    res.json({ rol: data });
  } catch (err) {
    console.error('Error al obtener rol:', err.message);
    res.status(500).json({ msg: 'Error al obtener rol' });
  }
};
