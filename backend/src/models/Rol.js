const db = require('../config/db');

const Rol = {
    async crear({ empresa_id, nombre, descripcion, estado_id, created_by }) {
        const [rows] = await db.execute('CALL sp_crear_rol(?, ?, ?, ?, ?)', [
        empresa_id,
        nombre,
        descripcion,
        estado_id,
        created_by
        ]);
        return rows[0][0]; // Devuelve { id: XX }
    },

    async listarPorEmpresa(empresa_id) {
    const [rows] = await db.execute(
        'SELECT id, nombre FROM roles WHERE empresa_id = ? AND estado_id = 1 ORDER BY nombre',
        [empresa_id]
    );
    return rows;
    },

    async listarPorEmpresaAll(empresa_id) {
    const [rows] = await db.execute('SELECT * FROM roles WHERE empresa_id = ?', [empresa_id]);
    return rows;
    },

    async actualizar(id, { nombre, descripcion, estado_id, updated_by }) {
    await db.execute(
        'UPDATE roles SET nombre = ?, descripcion = ?, estado_id = ?, updated_by = ?, updated_at = NOW() WHERE id = ?',
        [nombre, descripcion, estado_id, updated_by, id]
    );
    },

    async obtenerPorId (id) {
        const [rows] = await db.execute('CALL sp_obtener_rol_por_id(?)', [id]);
        return rows[0][0];
    }
};

module.exports = Rol;
