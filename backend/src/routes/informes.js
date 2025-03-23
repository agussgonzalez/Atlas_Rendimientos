const express = require('express');
const router = express.Router();
const informesController = require('../controllers/informes.js'); // Importa el controlador

// Ruta para obtener el balance
router.get('/balance', informesController.getBalance);

module.exports = router;