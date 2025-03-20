const db = require('../config/db');

exports.getAllIngresos = (req, res) => {
    db.query('SELECT * FROM ingresos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.createIngreso = (req, res) => {
    const { cliente_id, concepto, monto, fecha } = req.body;
    db.query(
        'INSERT INTO ingresos (cliente_id, concepto, monto, fecha) VALUES (?, ?, ?, ?)',
        [cliente_id, concepto, monto, fecha],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, cliente_id, concepto, monto, fecha });
        }
    );
};