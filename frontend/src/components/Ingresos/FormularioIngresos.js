import React, { useState } from 'react';
import axios from 'axios';
import './FormularioIngresos.css'; // Estilos 

const FormularioIngresos = ({ onIngresoAgregado }) => {
    const [concepto, setConcepto] = useState('');
    const [monto, setMonto] = useState('');
    const [cliente_id, setClienteId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!concepto || !monto || !cliente_id) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await axios.post('/api/ingresos', {
                concepto,
                monto: parseFloat(monto),
                cliente_id: parseInt(cliente_id),
                fecha: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
            });

            // Limpiar el formulario
            setConcepto('');
            setMonto(0);
            setClienteId('');

            // Notificar al componente padre que se agregó un ingreso
            onIngresoAgregado(response.data);
        } catch (error) {
            console.error('Error al agregar ingreso:', error);
        }
    };

    return (
        <div className="formulario-ingresos">
            <h2>Agregar Ingreso Manual</h2>
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
                <input
                    type="number"
                    placeholder="Cliente ID"
                    value={cliente_id}
                    onChange={(e) => setClienteId(e.target.value)}
                    required
                />
                <button type="submit">Agregar Ingreso</button>
            </form>
        </div>
    );
};

export default FormularioIngresos;