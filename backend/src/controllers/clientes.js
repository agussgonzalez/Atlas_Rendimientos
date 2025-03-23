const db = require('../config/db');

// Obtener todos los clientes
exports.getAllClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo cliente
exports.createCliente = (req, res) => {
    const { nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha } = req.body;

    // Validar datos obligatorios
    if (!nombre || !profesor_id || !fecha) {
        return res.status(400).json({ error: 'Nombre, Profesor ID y Fecha son obligatorios' });
    }

    // Insertar el cliente en la base de datos
    db.query(
        'INSERT INTO clientes (nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha });
        }
    );
};

// Saldar la deuda de un cliente
exports.saldarDeuda = (req, res) => {
    const { id } = req.params;

    // Obtener la deuda y cuota mensual del cliente
    db.query('SELECT deuda, cuota_mensual FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const cliente = results[0];
        if (cliente.deuda > 0) {
            // Registrar el pago en la tabla de ingresos
            db.query(
                'INSERT INTO ingresos (cliente_id, concepto, monto, fecha) VALUES (?, ?, ?, ?)',
                [id, 'Pago de cuota mensual', cliente.deuda, new Date()],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    // Actualizar la deuda del cliente a 0
                    db.query(
                        'UPDATE clientes SET deuda = 0 WHERE id = ?',
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

// Actualizar la cuota mensual de un cliente específico
exports.updateCuotaMensual = (req, res) => {
    const { id } = req.params;
    const { cuota_mensual } = req.body;

    // Validar que la cuota mensual esté presente
    if (!cuota_mensual) {
        return res.status(400).json({ error: 'La cuota mensual es obligatoria' });
    }

    // Actualizar la cuota mensual en la base de datos
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

// Actualizar la cuota mensual para todos los clientes
exports.updateCuotaMensualGeneral = (req, res) => {
    const { cuota_mensual } = req.body;

    // Validar que la cuota mensual esté presente
    if (!cuota_mensual) {
        return res.status(400).json({ error: 'La cuota mensual es obligatoria' });
    }

    // Actualizar la cuota mensual para todos los clientes
    db.query(
        'UPDATE clientes SET cuota_mensual = ?',
        [cuota_mensual],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cuota mensual actualizada correctamente para todos los clientes.' });
        }
    );
};

// Obtener la cuota mensual general
exports.getCuotaMensualGeneral = (req, res) => {
    db.query('SELECT cuota_mensual FROM clientes LIMIT 1', (err, results) => {
        if (err) {
            console.error('Error al obtener la cuota mensual:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Si hay resultados, toma la cuota mensual; de lo contrario, usa un valor predeterminado
        const cuota_mensual = results.length > 0 ? results[0].cuota_mensual : 10000;

        // Enviar la respuesta
        res.json({ cuota_mensual });
    });
};