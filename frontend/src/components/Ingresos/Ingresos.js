import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ingresos.css';

const Ingresos = () => {
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {
        axios.get('/api/ingresos')
            .then(response => {
                setIngresos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener ingresos:', error);
            });
    }, []);

    return (
        <div className="ingresos-container">
            <h1>Ingresos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Cliente ID</th>
                        <th>Concepto</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map(ingreso => (
                        <tr key={ingreso.id}>
                            <td>{ingreso.cliente_id}</td>
                            <td>{ingreso.concepto}</td>
                            <td>${ingreso.monto}</td>
                            <td>{ingreso.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ingresos;