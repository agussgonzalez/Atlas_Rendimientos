const db = require('../config/db');

exports.getBalance = (req, res) => {
    // Obtener total de ingresos
    db.query('SELECT SUM(monto) AS total_ingresos FROM ingresos', (err, ingresos) => {
        if (err) {
            console.error('Error al obtener ingresos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const totalIngresos = ingresos[0].total_ingresos || 0;

        // Obtener total de egresos
        db.query('SELECT SUM(monto) AS total_egresos FROM egresos', (err, egresos) => {
            if (err) {
                console.error('Error al obtener egresos:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            const totalEgresos = egresos[0].total_egresos || 0;

            // Calcular el balance
            const balance = totalIngresos - totalEgresos;

            // Enviar la respuesta
            res.json({
                total_ingresos: totalIngresos,
                total_egresos: totalEgresos,
                balance: balance
            });
        });
    });
};