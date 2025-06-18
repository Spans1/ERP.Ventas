const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');

const {
  listarRolesPorEmpresa,
  listarSucursalesPorEmpresa
} = require('../controllers/maestro.controller');

router.get('/roles', verifyToken, listarRolesPorEmpresa);
router.get('/sucursales', verifyToken, listarSucursalesPorEmpresa);

module.exports = router;
