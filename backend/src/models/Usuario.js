const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = {
  // Buscar usuario por email (Login)
  async findByEmail(email) {
    const [rows] = await db.execute("CALL sp_login_usuario(?)", [email]);
    return rows[0][0]; // CALL devuelve un array de arrays
  },

  // Buscar usuario por ID
  async findById(user_id) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [user_id]);
    return rows[0];
  },

  // Cambiar contraseña
  async cambiarPassword(user_id, newPasswordHashed) {
    await db.execute("CALL sp_actualizar_password(?, ?)", [user_id, newPasswordHashed]);
  },

  // Crear usuario (registro inicial con contraseña temporal)
  async crearUsuario({
    nombres,
    apellidos,
    email,
    tipo_documento_id,
    numero_documento,
    rol_id,
    empresa_id,
    sucursal_id,
    password,
    estado_id,
    created_by
  }) {

    // 🔐 Encriptar la contraseña si está presente
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : null;

    const [rows] = await db.execute(
      "CALL sp_registrar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombres,
        apellidos,
        email,
        tipo_documento_id,
        numero_documento,
        rol_id,
        empresa_id,
        sucursal_id,
        hashedPassword,
        estado_id,
        created_by
      ]
    );
    return rows[0][0]; // retorna el nuevo ID u objeto creado
  },

  // Editar usuario (sin cambiar la contraseña)
  async actualizarUsuario({
    id,
    nombres,
    apellidos,
    email,
    numero_documento,
    tipo_documento_id,
    rol_id,
    sucursal_id,
    estado_id,
    updated_by
  }) {
    await db.execute(
      "CALL sp_actualizar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        nombres,
        apellidos,
        email,
        numero_documento,
        tipo_documento_id,
        rol_id,
        sucursal_id,
        estado_id,
        updated_by
      ]
    );
  },

  // Listar usuarios por empresa
  async listarPorEmpresa(empresa_id) {
    const [rows] = await db.execute("CALL sp_listar_usuarios(?)", [empresa_id]);
    return rows[0];
  },

  // Obtener menú completo (módulos, menús, submenús) por usuario
  async obtenerMenuPorUsuario(user_id) {
    const [rows] = await db.execute("CALL sp_obtener_menu_completo_por_usuario(?)", [user_id]);
    return rows[0];
  }
};

module.exports = Usuario;
