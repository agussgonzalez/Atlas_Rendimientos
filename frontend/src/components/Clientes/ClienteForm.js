import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClienteForm.css';

const ClienteForm = ({ onClienteAdded }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [profesor_id, setProfesorId] = useState('');
    const [cuota_mensual, setCuotaMensual] = useState(''); // Valor inicial
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

    // Obtener la cuota mensual general cuando el componente se monte
    useEffect(() => {
        axios.get('/api/clientes/cuota-mensual')
            .then(response => {
                setCuotaMensual(response.data.cuota_mensual); // Actualizar el estado con la cuota mensual general
            })
            .catch(error => {
                console.error('Error al obtener la cuota mensual:', error);
                // Si hay un error, mantener el valor predeterminado (10000)
            });
    }, []); // El array vacío [] asegura que esto solo se ejecute una vez al montar el componente

    const handleSubmit = (e) => {
        e.preventDefault();

        // Asignar la deuda inicial igual a la cuota mensual
        const deudaInicial = cuota_mensual;

        axios.post('/api/clientes', {
            nombre,
            telefono,
            profesor_id,
            estado: 'activo',
            deuda: deudaInicial,
            cuota_mensual,
            fecha
        })
        .then(response => {
            onClienteAdded(response.data);
            setNombre('');
            setTelefono('');
            setProfesorId('');
            setFecha(new Date().toISOString().split('T')[0]);
        })
        .catch(error => {
            console.error('Error al agregar cliente:', error);

            if (error.response) {
                console.error('Datos del error:', error.response.data);
                console.error('Estado del error:', error.response.status);
                console.error('Cabeceras del error:', error.response.headers);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                console.error('Error al configurar la solicitud:', error.message);
            }
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
                placeholder="Cuota Mensual"
                value={cuota_mensual}
                onChange={(e) => setCuotaMensual(parseFloat(e.target.value))}
                required
            />
            <input
                type="date"
                placeholder="Fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
            />
            <button type="submit">Agregar Cliente</button>
        </form>
    );
};

export default ClienteForm;