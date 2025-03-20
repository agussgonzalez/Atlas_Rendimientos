import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registra la aplicación
AppRegistry.registerComponent(appName, () => App);