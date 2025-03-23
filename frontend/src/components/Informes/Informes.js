import React from 'react';
import '../Informes/Informes.css';

const Informes = ({ balance }) => {
    return (
        <div className="informes-container">
            <div className="balance">
                <p>Total Ingresos: ${balance.total_ingresos}</p>
                <p>Total Egresos: ${balance.total_egresos}</p>
                <p>Balance: ${balance.balance}</p>
            </div>
        </div>
    );
};

export default Informes;