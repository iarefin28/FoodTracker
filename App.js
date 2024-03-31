import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Home from './src/screens/Home';

import AsyncStorage from '@react-native-async-storage/async-storage'

const listAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('All keys in AsyncStorage:', keys);
  } catch (e) {
    console.log('Error listing all keys:', e);
  }
};

listAllKeys();

const getData = async (item) => {
  try {
    const jsonValue = await AsyncStorage.getItem(item);
    console.log(JSON.parse(jsonValue))
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

getData("Item1")

// Code below is initializing database with globalCount
// AsyncStorage.setItem('globalItemCount', JSON.stringify({itemCount: 0}))

// Code to get the global count
// globalCount = 0 
// AsyncStorage.getItem('globalItemCount')
// .then(value => {
//     globalCount = JSON.parse(value).count
// })
// .catch(error => console.error('Error retrieving count:', error))
// console.log(globalCount)


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


