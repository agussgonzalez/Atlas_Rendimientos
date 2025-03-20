import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Egresos.css';

const Egresos = () => {
    const [egresos, setEgresos] = useState([]);

    useEffect(() => {
        axios.get('/api/egresos')
            .then(response => {
                setEgresos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener egresos:', error);
            });
    }, []);

    return (
        <div className="egresos-container">
            <h1>Egresos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {egresos.map(egreso => (
                        <tr key={egreso.id}>
                            <td>{egreso.concepto}</td>
                            <td>${egreso.monto}</td>
                            <td>{egreso.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Egresos;