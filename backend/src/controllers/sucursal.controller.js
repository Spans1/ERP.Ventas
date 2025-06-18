const Sucursal = require('../models/Sucursal');

exports.listarSucursales = async (req, res) => {
  try {
    const empresa_id = parseInt(req.query.empresa_id);
    if (!empresa_id) return res.status(400).json({ msg: 'Debe enviar empresa_id' });

    const sucursales = await Sucursal.listarPorEmpresa(empresa_id);
    res.json({ sucursales });
  } catch (err) {
    console.error('Error al listar sucursales:', err.message);
    res.status(500).json({ msg: 'Error al listar sucursales' });
  }
};

exports.crearSucursal = async (req, res) => {
  try {
    const data = await Sucursal.crear(req.body);
    res.status(201).json({ msg: 'Sucursal registrada', id: data.id_creado });
  } catch (err) {
    console.error('Error al crear sucursal:', err.message);
    res.status(500).json({ msg: 'Error al crear sucursal' });
  }
};

exports.actualizarSucursal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Sucursal.actualizar(id, req.body);
    res.json({ msg: 'Sucursal actualizada' });
  } catch (err) {
    console.error('Error al actualizar sucursal:', err.message);
    res.status(500).json({ msg: 'Error al actualizar sucursal' });
  }
};

exports.obtenerSucursalPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Sucursal.obtenerPorId(id);
    if (!data) return res.status(404).json({ msg: 'Sucursal no encontrada' });
    res.json({ sucursal: data });
  } catch (err) {
    console.error('Error al obtener sucursal:', err.message);
    res.status(500).json({ msg: 'Error al obtener sucursal' });
  }
};
