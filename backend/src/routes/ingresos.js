const express = require('express');
const router = express.Router();
const ingresosController = require('../controllers/ingresos.js');

router.get('/', ingresosController.getAllIngresos);
router.post('/', ingresosController.createIngreso);

module.exports = router;