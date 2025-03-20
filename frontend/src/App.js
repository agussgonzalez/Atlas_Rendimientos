import React from 'react';
import Navbar from './components/Navbar';
import Clientes from './components/Clientes/Clientes';
import ClienteForm from './components/Clientes/ClienteForm';
import Ingresos from './components/Ingresos/Ingresos';
import Egresos from './components/Egresos/Egresos';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <ClienteForm />
                <Clientes />
                <Ingresos />
                <Egresos />
            </div>
        </div>
    );
}

export default App;