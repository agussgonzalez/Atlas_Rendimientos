import React, { useState } from 'react';
import axios from 'axios';
import './ClienteForm.css';

const ClienteForm = ({ onClienteAdded }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [profesor_id, setProfesorId] = useState('');
    const [deuda, setDeuda] = useState(0);
    const [cuota_mensual, setCuotaMensual] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/clientes', {
            nombre,
            telefono,
            profesor_id,
            estado: 'activo',
            deuda,
            cuota_mensual
        })
        .then(response => {
            onClienteAdded(response.data);
            setNombre('');
            setTelefono('');
            setProfesorId('');
            setDeuda(0);
            setCuotaMensual(0);
        })
        .catch(error => {
            console.error('Error al agregar cliente:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Teléfono (opcional)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />
            <input
                type="number"
                placeholder="Profesor ID"
                value={profesor_id}
                onChange={(e) => setProfesorId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Deuda"
                value={deuda}
                onChange={(e) => setDeuda(e.target.value)}
            />
            <input
                type="number"
                placeholder="Cuota Mensual"
                value={cuota_mensual}
                onChange={(e) => setCuotaMensual(e.target.value)}
            />
            <button type="submit">Agregar Cliente</button>
        </form>
    );
};

export default ClienteForm;