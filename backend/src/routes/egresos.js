const express = require('express');
const router = express.Router();
const egresosController = require('../controllers/egresos.js');

router.get('/', egresosController.getAllEgresos);
router.post('/', egresosController.createEgreso);

module.exports = router;