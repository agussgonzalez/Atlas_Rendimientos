const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/Profesores.js');

router.get('/', profesoresController.getAllProfesores);
router.post('/', profesoresController.createProfesor);
router.put('/:id', profesoresController.updateProfesor);
router.delete('/:id', profesoresController.deleteProfesor);

module.exports = router;