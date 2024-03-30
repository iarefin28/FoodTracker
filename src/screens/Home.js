import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { useFocusEffect, useNavigation, DrawerActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => { 
    const navigation = useNavigation();

    const handleOpenDrawer = () => { 
        navigation.openDrawer();
    }

    useFocusEffect(() => {
        navigation.setOptions({
            headerTitle: 'Food Tracker',
            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons name="add" color={"black"} size={30} style={{marginRight: 10}}/>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={handleOpenDrawer}>
                    <Ionicons name="settings-sharp" color={"black"} size={25} style={{marginLeft: 10}}/>
                </TouchableOpacity>
            ),
        });
    });

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Home; 