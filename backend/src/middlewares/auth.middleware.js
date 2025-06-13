const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contiene: user_id, rol_id, empresa_id, etc.
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido o expirado' });
  }
};
