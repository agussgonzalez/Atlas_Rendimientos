import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Clientes from '../components/Clientes/Clientes';
import ClienteForm from '../components/Clientes/ClienteForm';

const ClientesScreen = () => {
    const [clientes, setClientes] = useState([]);

    const handleClienteAdded = (nuevoCliente) => {
        setClientes([...clientes, nuevoCliente]);
    };

    return (
        <View style={styles.container}>
            <ClienteForm onClienteAdded={handleClienteAdded} />
            <Clientes />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default ClientesScreen;