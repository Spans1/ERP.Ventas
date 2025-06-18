const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/', verifyToken, rolController.crearRol);
router.get('/', verifyToken, rolController.listarRoles);
router.put('/:id', verifyToken, rolController.actualizarRol);
router.get('/:id', verifyToken, rolController.obtenerRolPorId);

module.exports = router;
