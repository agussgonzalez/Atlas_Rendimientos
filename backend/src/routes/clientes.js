const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes');

router.get('/', clientesController.getAllClientes);
router.post('/', clientesController.createCliente);
router.post('/:id/saldar-deuda', clientesController.saldarDeuda); 
router.put('/:id/cuota-mensual', clientesController.updateCuotaMensual);
router.put('/cuota-mensual', clientesController.updateCuotaMensualGeneral);

module.exports = router;