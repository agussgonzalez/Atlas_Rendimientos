import React, { useState } from 'react';
import axios from 'axios';
import './FormularioEgresos.css'; // Estilos (opcional)

const FormularioEgresos = ({ onEgresoAgregado }) => {
    const [concepto, setConcepto] = useState('');
    const [monto, setMonto] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!concepto || !monto) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await axios.post('/api/egresos', {
                concepto,
                monto: parseFloat(monto),
                fecha: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
            });

            // Limpiar el formulario
            setConcepto('');
            setMonto(0);

            // Notificar al componente padre que se agregó un egreso
            onEgresoAgregado(response.data);
        } catch (error) {
            console.error('Error al agregar egreso:', error);
        }
    };

    return (
        <div className="formulario-egresos">
            <h2>Agregar Egreso Manual</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Concepto"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                />
                <button type="submit">Agregar Egreso</button>
            </form>
        </div>
    );
};

export default FormularioEgresos;