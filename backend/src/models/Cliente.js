const db = require('../config/db.js');

class Cliente {
    static getAll(callback) {
        query('SELECT * FROM clientes', callback);
    }

    static create(nombre, telefono, profesor_id, estado, deuda, cuota_mensual, callback) {
        db.query(
            'INSERT INTO clientes (nombre, telefono, profesor_id, estado, deuda, cuota_mensual) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, telefono, profesor_id, estado, deuda, cuota_mensual],
            callback
        );
    }

    static updateDeuda(id, deuda, callback) {
        query(
            'UPDATE clientes SET deuda = ? WHERE id = ?',
            [deuda, id],
            callback
        );
    }
}

export default Cliente;