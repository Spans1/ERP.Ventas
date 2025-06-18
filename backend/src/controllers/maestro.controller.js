const Rol = require('../models/Rol');
const Sucursal = require('../models/Sucursal');

exports.listarRolesPorEmpresa = async (req, res) => {
  const empresa_id = parseInt(req.query.empresa_id);
  if (!empresa_id) return res.status(400).json({ msg: 'Debe enviar empresa_id' });

  try {
    const roles = await Rol.listarPorEmpresaAll(empresa_id);
    res.json({ roles });
  } catch (error) {
    console.error('Error al listar roles:', error);
    res.status(500).json({ msg: 'Error al obtener roles' });
  }
};

exports.listarSucursalesPorEmpresa = async (req, res) => {
  const empresa_id = parseInt(req.query.empresa_id);
  if (!empresa_id) return res.status(400).json({ msg: 'Debe enviar empresa_id' });

  try {
    const sucursales = await Sucursal.listarPorEmpresaAll(empresa_id);
    res.json({ sucursales });
  } catch (error) {
    console.error('Error al listar sucursales:', error);
    res.status(500).json({ msg: 'Error al obtener sucursales' });
  }
};
