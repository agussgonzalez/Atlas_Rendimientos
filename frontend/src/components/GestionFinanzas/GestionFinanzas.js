import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ingresos from '../Ingresos/Ingresos.js';
import Egresos from '../Egresos/Egresos.js';
import Informes from '../Informes/Informes.js';
import FormularioIngresos from '../Ingresos/FormularioIngresos.js';
import FormularioEgresos from '../Egresos/FormularioEgresos.js';
import './GestionFinanzas.css';

const GestionFinanzas = () => {
    const [ingresos, setIngresos] = useState([]);
    const [egresos, setEgresos] = useState([]);
    const [balance, setBalance] = useState({});

    // Obtener ingresos, egresos y balance al montar el componente
    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
        try {
            const [ingresosResponse, egresosResponse, balanceResponse] = await Promise.all([
                axios.get('/api/ingresos'),
                axios.get('/api/egresos'),
                axios.get('/api/informes/balance')
            ]);

            setIngresos(ingresosResponse.data);
            setEgresos(egresosResponse.data);
            setBalance(balanceResponse.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    // Función para manejar la adición de un nuevo ingreso
    const handleIngresoAgregado = (nuevoIngreso) => {
        setIngresos([...ingresos, nuevoIngreso]);
        obtenerDatos(); // Actualizar los datos
    };

    // Función para manejar la adición de un nuevo egreso
    const handleEgresoAgregado = (nuevoEgreso) => {
        setEgresos([...egresos, nuevoEgreso]);
        obtenerDatos(); // Actualizar los datos
    };

    return (
        <div className="gestion-finanzas-container">
            <h1>Gestión de Finanzas</h1>

            {/* Formularios para ingresos y egresos */}
            <div className="formularios">
                <FormularioIngresos onIngresoAgregado={handleIngresoAgregado} />
                <FormularioEgresos onEgresoAgregado={handleEgresoAgregado} />
            </div>

            {/* Componente de Ingresos */}
            <div className="seccion">
                <h2>Ingresos</h2>
                <Ingresos ingresos={ingresos} />
            </div>

            {/* Componente de Egresos */}
            <div className="seccion">
                <h2>Egresos</h2>
                <Egresos egresos={egresos} />
            </div>

            {/* Componente de Informes */}
            <div className="seccion">
                <h2>Informes</h2>
                <Informes balance={balance} />
            </div>
        </div>
    );
};

export default GestionFinanzas;