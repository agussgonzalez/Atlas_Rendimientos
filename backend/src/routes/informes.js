const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/balance', (req, res) => {
    db.query('SELECT SUM(monto) AS total_ingresos FROM ingresos', (err, ingresos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        db.query('SELECT SUM(monto) AS total_egresos FROM egresos', (err, egresos) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const balance = {
                total_ingresos: ingresos[0].total_ingresos || 0,
                total_egresos: egresos[0].total_egresos || 0,
                balance: (ingresos[0].total_ingresos || 0) - (egresos[0].total_egresos || 0)
            };
            res.json(balance);
        });
    });
});

module.exports = router;