const Usuario = require('../models/Usuario');
const Modulo = require('../models/Modulo');
const bcrypt = require('bcryptjs');

exports.listarUsuarios = async (req, res) => {
  try {
    const empresa_id = parseInt(req.query.empresa_id);

    if (!empresa_id || isNaN(empresa_id)) {
      return res.status(400).json({ msg: 'Debe enviar un empresa_id válido' });
    }

    const usuarios = await Usuario.listarPorEmpresa(empresa_id);

    // Siempre devolver estructura uniforme
    return res.status(200).json({
      usuarios: Array.isArray(usuarios) ? usuarios : []
    });

  } catch (error) {
    console.error("Error al listar usuarios:", error.message);
    return res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

exports.cambiarPasswordConValidacion = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const { password_actual, password_nuevo } = req.body;

    if (!user_id || !password_actual || !password_nuevo) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const user = await Usuario.findById(user_id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const valid = await bcrypt.compare(password_actual, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "Contraseña actual incorrecta" });
    }

    const newHashed = await bcrypt.hash(password_nuevo, 10);
    await Usuario.cambiarPassword(user_id, newHashed);

    return res.status(200).json({ msg: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error("Error al cambiar contraseña:", error.message);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

exports.obtenerMenuPorUsuario = async (req, res) => {
  const user_id = parseInt(req.params.id);

  try {
    const menu = await Usuario.obtenerMenuPorUsuario(user_id);
    return res.status(200).json({ menu: menu || [] });

  } catch (err) {
    console.error('Error al obtener menú:', err.message);
    return res.status(500).json({ msg: 'Error al obtener menú del usuario' });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const data = req.body;

    const camposObligatorios = [
      'nombres', 'apellidos', 'email', 'tipo_documento_id',
      'numero_documento', 'rol_id', 'empresa_id',
      'sucursal_id', 'password', 'estado_id', 'created_by'
    ];

    for (const campo of camposObligatorios) {
      if (!data[campo]) {
        return res.status(400).json({ msg: `Falta el campo: ${campo}` });
      }
    }

    // ✅ Registrar y capturar ID nuevo
    const nuevoUsuarioId = await Usuario.crearUsuario(data);

    res.status(201).json({
      msg: 'Usuario creado correctamente',
      usuario_id: nuevoUsuarioId
    });

  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ msg: 'Error al crear usuario' });
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      nombres,
      apellidos,
      email,
      numero_documento,
      tipo_documento_id,
      rol_id,
      sucursal_id,
      estado_id,
      updated_by
    } = req.body;

    const camposObligatorios = [
      'nombres', 'apellidos', 'email', 'numero_documento',
      'tipo_documento_id', 'rol_id', 'sucursal_id',
      'estado_id', 'updated_by'
    ];

    for (const campo of camposObligatorios) {
      if (!req.body[campo]) {
        return res.status(400).json({ msg: `Falta el campo: ${campo}` });
      }
    }

    await Usuario.actualizarUsuario({
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
    });

    res.json({ msg: 'Usuario actualizado correctamente' });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json({ usuario });
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).json({ msg: 'Error al obtener usuario' });
  }
};
