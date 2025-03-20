const cron = require('node-cron');
const db = require('./config/db');

// Tarea programada para ejecutarse el primer día de cada mes
cron.schedule('0 0 1 * *', () => {
    console.log('Actualizando deudas de clientes...');
    db.query(
        'UPDATE clientes SET deuda = deuda + cuota_mensual WHERE estado = "activo"',
        (err, results) => {
            if (err) {
                console.error('Error al actualizar deudas:', err);
            } else {
                console.log('Deudas actualizadas correctamente.');
            }
        }
    );
});