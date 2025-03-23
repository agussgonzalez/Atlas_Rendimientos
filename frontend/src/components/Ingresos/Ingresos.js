import React from 'react';
import './Ingresos.css';

const Ingresos = ({ ingresos }) => {
    return (
        <div className="ingresos-container">
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