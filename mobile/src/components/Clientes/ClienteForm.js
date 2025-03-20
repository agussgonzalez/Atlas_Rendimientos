import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ClienteForm = ({ onClienteAdded }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [profesor_id, setProfesorId] = useState('');
    const [deuda, setDeuda] = useState('0');

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/clientes', {
            nombre,
            telefono,
            email,
            profesor_id,
            estado: 'activo',
            deuda: parseFloat(deuda),
        })
        .then(response => {
            onClienteAdded(response.data);
            setNombre('');
            setTelefono('');
            setEmail('');
            setProfesorId('');
            setDeuda('0');
        })
        .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Profesor ID"
                value={profesor_id}
                onChangeText={setProfesorId}
            />
            <TextInput
                style={styles.input}
                placeholder="Deuda"
                value={deuda}
                onChangeText={setDeuda}
                keyboardType="numeric"
            />
            <Button title="Agregar Cliente" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default ClienteForm;