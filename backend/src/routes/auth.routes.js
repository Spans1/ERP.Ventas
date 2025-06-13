const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Rutas públicas
router.post('/login', auth.login);
router.post('/generatoken', auth.generateToken);

// Rutas protegidas
router.post('/register', verifyToken, auth.register);

module.exports = router;