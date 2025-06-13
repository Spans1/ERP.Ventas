const db = require('../config/db');

const Usuario = {
  async findByEmail(email) {
    const [rows] = await db.execute("CALL sp_login_usuario(?)", [email]);
    return rows[0][0]; // ya que CALL devuelve un array de arrays
  },

   async findById(user_id) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [user_id]);
    return rows[0];
  },

  async cambiarPassword(user_id, newPasswordHashed) {
    await db.execute("CALL sp_actualizar_password(?, ?)", [user_id, newPasswordHashed]);
  }

};

const listarPorEmpresa = async (empresa_id) => {
  const [rows] = await db.execute('CALL sp_listar_usuarios(?)', [empresa_id]);
  return rows[0];
};

const obtenerMenuPorUsuario = async (user_id) => {
  const [rows] = await db.execute('CALL sp_obtener_menu_completo_por_usuario(?)', [user_id]);
  return rows[0];
}


module.exports = Usuario;

Usuario.listarPorEmpresa = listarPorEmpresa;
Usuario.obtenerMenuPorUsuario = obtenerMenuPorUsuario;
