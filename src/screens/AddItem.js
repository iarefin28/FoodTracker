import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation, DrawerActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState } from 'react';

const AddItem = () => {
    return(
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AddItem;