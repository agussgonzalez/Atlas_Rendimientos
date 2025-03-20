const db = require('../config/db.js');

class Profesor {
    static getAll(callback) {
        db.query('SELECT * FROM profesores', callback);
    }

    static create(nombre, telefono, callback) {
        db.query(
            'INSERT INTO profesores (nombre, telefono) VALUES (?, ?)',
            [nombre, telefono],
            callback
        );
    }

    static update(id, nombre, telefono, callback) {
        db.query(
            'UPDATE profesores SET nombre = ?, telefono = ? WHERE id = ?',
            [nombre, telefono, id],
            callback
        );
    }

    static delete(id, callback) {
        db.query('DELETE FROM profesores WHERE id = ?', [id], callback);
    }
}

module.exports = Profesor;