const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursal.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', verifyToken, sucursalController.listarSucursales);
router.post('/', verifyToken, sucursalController.crearSucursal);
router.put('/:id', verifyToken, sucursalController.actualizarSucursal);
router.get('/:id', verifyToken, sucursalController.obtenerSucursalPorId);

module.exports = router;