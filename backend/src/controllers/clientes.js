const db = require('../config/db');

exports.getAllClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.createCliente = (req, res) => {
    const { nombre, telefono, email, profesor_id, estado, deuda, cuota_mensual } = req.body;
    db.query(
        'INSERT INTO clientes (nombre, telefono, email, profesor_id, estado, deuda, cuota_mensual) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, telefono, email, profesor_id, estado, deuda, cuota_mensual],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, nombre, telefono, email });
        }
    );
};

exports.saldarDeuda = (req, res) => {
    const { id } = req.params;
    db.query('SELECT deuda, cuota_mensual FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const cliente = results[0];
        if (cliente.deuda > 0) {
            // Registrar el pago en la tabla de ingresos
            db.query(
                'INSERT INTO ingresos (cliente_id, concepto, monto, fecha) VALUES (?, ?, ?, ?)',
                [id, 'Pago de cuota mensual', cliente.deuda, new Date()], // Usar la deuda como monto
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    // Actualizar la deuda del cliente
                    db.query(
                        'UPDATE clientes SET deuda = 0 WHERE id = ?', // Reducir la deuda a 0
                        [id],
                        (err, results) => {
                            if (err) {
                                return res.status(500).json({ error: err.message });
                            }
                            res.json({ message: 'Deuda saldada correctamente.' });
                        }
                    );
                }
            );
        } else {
            res.json({ message: 'El cliente no tiene deuda pendiente.' });
        }
    });
};

exports.updateCuotaMensual = (req, res) => {
    const { id } = req.params;
    const { cuota_mensual } = req.body;
    db.query(
        'UPDATE clientes SET cuota_mensual = ? WHERE id = ?',
        [cuota_mensual, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cuota mensual actualizada correctamente.' });
        }
    );
};

exports.updateCuotaMensualGeneral = (req, res) => {
    const { cuota_mensual } = req.body;
    db.query(
        'UPDATE clientes SET cuota_mensual = ?', // Actualizar la cuota mensual para todos los clientes
        [cuota_mensual],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cuota mensual actualizada correctamente para todos los clientes.' });
        }
    );
};