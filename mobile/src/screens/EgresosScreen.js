import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EgresosScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Egresos</Text>
            {/* Aquí puedes agregar el componente de egresos */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default EgresosScreen;