import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Clientes from './components/Clientes/Clientes.js';
import ClienteForm from './components/Clientes/ClienteForm.js';
import GestionFinanzas from './components/GestionFinanzas/GestionFinanzas.js'; // Importa GestionFinanzas
import './App.css';

function App() {
    const [clientes, setClientes] = useState([]);

    const handleClienteAdded = (nuevoCliente) => {
        setClientes([...clientes, nuevoCliente]);
    };

    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <ClienteForm onClienteAdded={handleClienteAdded} />
                <Clientes clientes={clientes} />
                <GestionFinanzas /> {/* Reemplaza Ingresos y Egresos por GestionFinanzas */}
            </div>
        </div>
    );
}

export default App;