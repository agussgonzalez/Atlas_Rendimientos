const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.js');

// Rutas existentes
router.get('/', clientesController.getAllClientes);
router.post('/', clientesController.createCliente);
router.post('/:id/saldar-deuda', clientesController.saldarDeuda); 
router.put('/:id/cuota-mensual', clientesController.updateCuotaMensual);
router.put('/cuota-mensual', clientesController.updateCuotaMensualGeneral);

// Nueva ruta para obtener la cuota mensual general
router.get('/cuota-mensual', clientesController.getCuotaMensualGeneral);

module.exports = router;