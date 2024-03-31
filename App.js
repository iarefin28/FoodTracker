import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Home from './src/screens/Home';

// Async Storage Import 
import AsyncStorage from '@react-native-async-storage/async-storage'

// This function lists all of the keys in AsyncStorage... For Development Use Only
// const listAllKeys = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     console.log('All keys in AsyncStorage:', keys);
//   } catch (e) {
//     console.log('Error listing all keys:', e);
//   }
// };
// listAllKeys();

//If this is the first launch then global counter is not set up in async storage, create global counter if this is the first launch
const initializeCounter = async () => {
	try {
		const counter = await AsyncStorage.getItem('globalItemCounter');

		// Create the counter if it doesn't exist. Default value is zero. 
		if (counter === null) {
			await AsyncStorage.setItem('globalItemCounter', JSON.stringify({ itemCount: 0 }));
			console.log("Global counter initialized to 0")
		} else {
			console.log('Global counter exists with value of: ' + JSON.parse(counter).itemCount)
		}
	} catch (error) {
		console.error('Error initializing the counter', error)
	}
}

initializeCounter();

export default function App() {
	const Stack = createNativeStackNavigator();
	const Drawer = createDrawerNavigator();


	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName='Home' style={{ backgroundColor: 'black' }}>
				<Drawer.Screen name="Food Tracker" component={Home} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}


