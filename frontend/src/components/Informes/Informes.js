import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Informes.css';

const Informes = () => {
    const [balance, setBalance] = useState({});

    useEffect(() => {
        axios.get('/api/informes/balance')
            .then(response => {
                setBalance(response.data);
            })
            .catch(error => {
                console.error('Error al obtener el balance:', error);
            });
    }, []);

    return (
        <div className="informes-container">
            <h1>Informe de Rendimiento</h1>
            <div className="balance">
                <p>Total Ingresos: ${balance.total_ingresos}</p>
                <p>Total Egresos: ${balance.total_egresos}</p>
                <p>Balance: ${balance.balance}</p>
            </div>
        </div>
    );
};

export default Informes;