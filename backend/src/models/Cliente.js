const db = require('../config/db.js');

class Cliente {
    static getAll(callback) {
        db.query('SELECT * FROM clientes', callback); // Usar db.query en lugar de query
    }

    static create(nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha, callback) {
        db.query(
            'INSERT INTO clientes (nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)', // Agregar el campo "fecha"
            [nombre, telefono, profesor_id, estado, deuda, cuota_mensual, fecha], // Pasar 7 valores
            callback
        );
    }

    static updateDeuda(id, deuda, callback) {
        db.query( // Usar db.query en lugar de query
            'UPDATE clientes SET deuda = ? WHERE id = ?',
            [deuda, id],
            callback
        );
    }
}

module.exports = Cliente; // Usar module.exports en lugar de export default