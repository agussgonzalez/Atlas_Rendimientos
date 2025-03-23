const db = require('../config/db');

// Obtener todos los ingresos
exports.getAllIngresos = (req, res) => {
    db.query('SELECT * FROM ingresos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};
// Crear un nuevo ingreso
exports.createIngreso = (req, res) => {
    const { cliente_id, concepto, monto, fecha } = req.body;

    // Validar datos
    if (!cliente_id || !concepto || !monto || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
        return res.status(400).json({ error: 'El monto debe ser un número positivo' });
    }

    if (isNaN(parseInt(cliente_id)) || parseInt(cliente_id) <= 0) {
        return res.status(400).json({ error: 'El ID del cliente debe ser un número válido' });
    }

    // Asignar fecha actual si no se proporciona
    const fechaFinal = fecha || new Date().toISOString().split('T')[0];

    // Insertar el ingreso en la base de datos
    db.query(
        'INSERT INTO ingresos (cliente_id, concepto, monto, fecha) VALUES (?, ?, ?, ?)',
        [cliente_id, concepto, monto, fechaFinal],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, cliente_id, concepto, monto, fecha: fechaFinal });
        }
    );
};