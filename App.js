import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Home from './src/screens/Home';



export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home' style={{backgroundColor: 'black'}}>
        <Drawer.Screen name="Food Tracker" component={Home}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


