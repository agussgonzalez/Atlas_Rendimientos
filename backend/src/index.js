const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');
const ingresosRoutes = require('./routes/ingresos');
const egresosRoutes = require('./routes/egresos');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/egresos', egresosRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});