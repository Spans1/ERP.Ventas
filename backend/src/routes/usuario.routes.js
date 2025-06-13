const router = require('express').Router();
const controller = require('../controllers/usuario.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', verifyToken, controller.listarUsuarios);
router.put('/:id/password', verifyToken, controller.cambiarPasswordConValidacion);
router.get('/:id/menu', verifyToken, controller.obtenerMenuPorUsuario);

module.exports = router;