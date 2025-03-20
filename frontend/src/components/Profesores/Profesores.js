import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profesores.css';

const Profesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        axios.get('/api/profesores')
            .then(response => {
                setProfesores(response.data);
            })
            .catch(error => {
                console.error('Error al obtener profesores:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/profesores', { nombre, telefono })
            .then(response => {
                setProfesores([...profesores, response.data]);
                setNombre('');
                setTelefono('');
            })
            .catch(error => {
                console.error('Error al agregar profesor:', error);
            });
    };

    return (
        <div className="profesores-container">
            <h1>Profesores</h1>
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
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <button type="submit">Agregar Profesor</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {profesores.map(profesor => (
                        <tr key={profesor.id}>
                            <td>{profesor.id}</td>
                            <td>{profesor.nombre}</td>
                            <td>{profesor.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Profesores;