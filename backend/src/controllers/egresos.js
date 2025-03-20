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