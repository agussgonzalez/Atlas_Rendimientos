const db = require('../config/db');

exports.getAllEgresos = (req, res) => {
    db.query('SELECT * FROM egresos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.createEgreso = (req, res) => {
    const { concepto, monto, fecha } = req.body;

    // Validar datos
    if (!concepto || !monto || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
        return res.status(400).json({ error: 'El monto debe ser un número positivo' });
    }

    db.query(
        'INSERT INTO egresos (concepto, monto, fecha) VALUES (?, ?, ?)',
        [concepto, monto, fecha],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, concepto, monto, fecha });
        }
    );
};