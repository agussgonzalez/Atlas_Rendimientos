import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ClientesScreen from './screens/ClientesScreen';
import IngresosScreen from './screens/IngresosScreen';
import EgresosScreen from './screens/EgresosScreen';
import Navbar from './components/Navbar';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Navbar />
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Clientes" component={ClientesScreen} />
                <Stack.Screen name="Ingresos" component={IngresosScreen} />
                <Stack.Screen name="Egresos" component={EgresosScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;