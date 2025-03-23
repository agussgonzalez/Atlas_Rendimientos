import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Clientes.css';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [cuotaMensualGeneral, setCuotaMensualGeneral] = useState('');

    // Obtener la lista de clientes al cargar el componente
    useEffect(() => {
        axios.get('/api/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener clientes:', error);
            });
    }, []);

    // Función para saldar la deuda de un cliente
    const handleSaldarDeuda = (id) => {
        axios.post(`/api/clientes/${id}/saldar-deuda`)
            .then(response => {
                alert(response.data.message);
                // Actualizar la lista de clientes en tiempo real
                const updatedClientes = clientes.map(cliente =>
                    cliente.id === id ? { ...cliente, deuda: 0 } : cliente
                );
                setClientes(updatedClientes);
            })
            .catch(error => {
                console.error('Error al saldar deuda:', error);
            });
    };
    // Función para actualizar la cuota mensual general
    const handleUpdateCuotaMensualGeneral = () => {
        axios.put('/api/clientes/cuota-mensual', { cuota_mensual: cuotaMensualGeneral })
            .then(response => {
                alert(response.data.message);
                // Obtener la lista actualizada de clientes desde el backend
                axios.get('/api/clientes')
                    .then(response => {
                        setClientes(response.data);
                    })
                    .catch(error => {
                        console.error('Error al obtener clientes:', error);
                    });
            })
            .catch(error => {
                console.error('Error al actualizar cuota mensual general:', error);
            });
    };

    return (
        <div className="clientes-container">
            <h1>Clientes</h1>
            <div className="cuota-mensual-form">
                <h2>Actualizar Cuota Mensual General</h2>
                <input
                    type="number"
                    value={cuotaMensualGeneral}
                    onChange={(e) => setCuotaMensualGeneral(e.target.value)}
                    placeholder="Nueva cuota mensual"
                />
                <button onClick={handleUpdateCuotaMensualGeneral}>
                    Actualizar Cuota Mensual
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Fecha de Ingreso</th>
                        <th>Profesor ID</th>
                        <th>Deuda</th>
                        <th>Cuota Mensual</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.fecha}</td>
                            <td>{cliente.profesor_id}</td>
                            <td>${cliente.deuda}</td>
                            <td>${cliente.cuota_mensual}</td>
                            <td>{cliente.estado}</td>
                            <td>
                                <button
                                    onClick={() => handleSaldarDeuda(cliente.id)}
                                    disabled={cliente.deuda === 0} // Deshabilitar si la deuda es 0
                                >
                                    Saldar Deuda
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;