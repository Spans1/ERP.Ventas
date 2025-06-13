const db = require('../config/db');

const obtenerModulosPorUsuario = async (usuario_id) => {
  const [rows] = await db.execute('CALL sp_listar_modulos_por_usuario(?)', [usuario_id]);
  return rows[0];
};

module.exports = {
  obtenerModulosPorUsuario
};
