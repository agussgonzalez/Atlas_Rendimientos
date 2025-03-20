const Profesor = require('../models/Profesor.js');

exports.getAllProfesores = (req, res) => {
    Profesor.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.createProfesor = (req, res) => {
    const { nombre, telefono } = req.body;
    Profesor.create(nombre, telefono, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, nombre, telefono });
    });
};

exports.updateProfesor = (req, res) => {
    const { id } = req.params;
    const { nombre, telefono } = req.body;
    Profesor.update(id, nombre, telefono, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Profesor actualizado correctamente.' });
    });
};

exports.deleteProfesor = (req, res) => {
    const { id } = req.params;
    Profesor.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Profesor eliminado correctamente.' });
    });
};