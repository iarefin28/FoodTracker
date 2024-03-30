import { StyleSheet, Text, View, TouchableOpacity, Vibration, Modal, SafeAreaView, TextInput } from 'react-native';
import { useFocusEffect, useNavigation, DrawerActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'


const Home = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    }

    const handleAddPress = () => {
        setModalVisible(true)
    }

    const handleCloseModalPress = () => {
        setModalVisible(false);
    }

    useFocusEffect(() => {
        navigation.setOptions({
            headerTitle: 'Food Tracker',
            headerRight: () => (
                <TouchableOpacity onPress={handleAddPress}>
                    <Ionicons name="add" color={"white"} size={30} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={handleOpenDrawer}>
                    <Ionicons name="settings-sharp" color={"white"} size={25} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white"
        });
    });

    const handleSelectFridge = () => {

    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={{ height: "5%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={handleCloseModalPress}>
                            <Ionicons name="close" color={"white"} size={30} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>Add New Food Item</Text>
                        <TouchableOpacity onPress={handleCloseModalPress} disabled={true}>
                            <Ionicons name="close" color={"black"} size={30} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalMainContents}>
                        <View style={styles.inputContainer}>
                            <View style={styles.overlay} />
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Bananas, apples, chicken"
                                autoFocus={true}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.overlay} />
                            <TextInput
                                style={styles.input}
                                placeholder="Expiration date"
                            />
                        </View>
                        <View style={styles.storageMethod}>
                            <TouchableOpacity style={styles.storageButtons} onPress={handleSelectFridge}>
                                <View style={styles.overlay}/>
                                <Text style={{color: "white"}}>Hello</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.storageButtons} onPress={handleSelectFridge}>
                                <View style={styles.overlay}/>
                                <Text style={{color: "white"}}>Hello</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.storageButtons} onPress={handleSelectFridge}>
                                <View style={styles.overlay}/>
                                <Text style={{color: "white"}}>Hello</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.storageButtons} onPress={handleSelectFridge}>
                                <View style={styles.overlay}/>
                                <Text style={{color: "white"}}>Hello</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Text color="white">hi</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "black"
    },
    modalMainContents: {
        alignItems: "center",
        flex: 1,
    },
    inputContainer: {
        width: "90%",
        height: "9%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderRadius: 15,
        borderTopWidth: "2px",
        borderRightWidth: "2px",
        borderLeftWidth: "2px",
        marginBottom: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'gray',
        borderRadius: 15,
        opacity: 0.2
    },
    input: {
        flex: 1,
        width: "100%",
        height: "100%",
        color: "white",
        borderRadius: 15,
        paddingLeft: 15
    },
    storageMethod: {

        height: "9%",
        width: "90%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    storageButtons: {
        height: "100%",
        width: "22.5%",
        borderRadius: 15,
        marginRight: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Home;

/*
When it comes to data that goes in need to keep track of 
- Food name 
- Expiration Date
- If it should go in freezer, fridge, or pantry 


*/