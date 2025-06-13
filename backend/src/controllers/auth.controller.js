const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const db = require('../config/db');

exports.generateToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.JWT_ALLOWED_USER) {
      return res.status(403).json({ msg: 'No autorizado para generar token' });
    }

    const user = await Usuario.findByEmail(email);
    if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({
      user_id: user.id,
      email: user.email,
      empresa_id: user.empresa_id,
      rol_id: user.rol_id,
      tipo: 'sistema'
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });
 
    res.json({ token });
  } catch (err) {
    console.error('Error en generateToken:', err);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.JWT_ALLOWED_USER) {
      return res.status(403).json({ msg: 'Este usuario no puede usar /login' });
    }

    const user = await Usuario.findByEmail(email);
    if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: 'Credenciales inválidas' });

    // ❌ NO GENERA TOKEN
    res.json({
      msg: "Login exitoso",
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol_id: user.rol_id,
        empresa_id: user.empresa_id,
        sucursal_id: user.sucursal_id
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

exports.register = async (req, res) => {
  try {
    const {
      nombres, apellidos, email, password,
      tipo_documento_id, numero_documento,
      rol_id, empresa_id, sucursal_id,
      estado_id, created_by
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute("CALL sp_registrar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      nombres,
      apellidos,
      email,
      hashedPassword,
      tipo_documento_id,
      numero_documento,
      rol_id,
      empresa_id,
      sucursal_id,
      estado_id,
      created_by
    ]);

    res.status(201).json({ msg: "Usuario registrado correctamente" });

  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
