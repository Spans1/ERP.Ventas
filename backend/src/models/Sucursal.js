const db = require('../config/db');

const Sucursal = {
  async listarPorEmpresa(empresa_id) {
    const [rows] = await db.execute(
      'SELECT id, nombre FROM sucursales WHERE empresa_id = ? AND estado_id = 1 ORDER BY nombre',
      [empresa_id]
    );
    return rows;
  },

  async listarPorEmpresaAll(empresa_id) {
    const [rows] = await db.execute('CALL sp_listar_sucursales(?)', [empresa_id]);
    return rows[0];
  },

  async crear(datos) {
    const { empresa_id, nombre, direccion, telefono, email, estado_id, created_by } = datos;
    const [rows] = await db.execute('CALL sp_crear_sucursal(?, ?, ?, ?, ?, ?, ?)', [
      empresa_id, nombre, direccion, telefono, email, estado_id, created_by
    ]);
    return rows[0][0]; // Devuelve { id_creado: ... }
  },

  async actualizar(id, datos) {
    const { nombre, direccion, telefono, email, estado_id, updated_by } = datos;
    await db.execute('CALL sp_actualizar_sucursal(?, ?, ?, ?, ?, ?, ?)', [
      id, nombre, direccion, telefono, email, estado_id, updated_by
    ]);
  },

  async obtenerPorId (id) {
    const [rows] = await db.execute('CALL sp_obtener_sucursal_por_id(?)', [id]);
    return rows[0][0];
  }
};

module.exports = Sucursal;