import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.navItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Clientes')}>
                <Text style={styles.navItem}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Ingresos')}>
                <Text style={styles.navItem}>Ingresos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Egresos')}>
                <Text style={styles.navItem}>Egresos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    navItem: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Navbar;