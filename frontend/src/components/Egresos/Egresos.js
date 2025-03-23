import React from 'react';
import './Egresos.css';

const Egresos = ({ egresos }) => {
    return (
        <div className="egresos-container">
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