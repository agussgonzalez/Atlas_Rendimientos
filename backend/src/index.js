const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes.js');
const ingresosRoutes = require('./routes/ingresos.js');
const egresosRoutes = require('./routes/egresos.js');
const informesRoutes = require('./routes/informes.js'); // Importa las rutas de informes

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/egresos', egresosRoutes);
app.use('/api/informes', informesRoutes); // Monta las rutas de informes

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});