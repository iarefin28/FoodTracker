import { StyleSheet, Text, View, TouchableOpacity, Vibration, Modal, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect, useNavigation, DrawerActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useState, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'

import AsyncStorage from '@react-native-async-storage/async-storage'

import DateTimePickerModal from "react-native-modal-datetime-picker";

import HomeDisplay from './HomeDisplay';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Home = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [storageSelect, setStorageSelect] = useState("") //Keeps track of where this item is being stored
    const [itemName, setItemName] = useState("") //Keeps track of the name of the item 
    const [modalCount, setModalCount] = useState(0)
    const [modalAmountUnit, setModalAmountUnit] = useState("oz.")
    const [expirationDate, setExpirationDate] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const nameRef = useRef(null)
    const Tab = createBottomTabNavigator();
    const [selectedTab, setSelectedTab] = useState("Fridge")

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    }

    const handleAddPress = () => {
        setModalVisible(true)
    }

    const handleCloseModalPress = () => {
        setModalVisible(false);
        setStorageSelect("");
        setItemName("");
        setModalCount(0);
        setModalAmountUnit("oz.")
        setExpirationDate(new Date())
    }

    const handleStoreItem = async () => {
        //console.log("Name of Item: " + itemName + "\nExpirationDate: " + expirationDate + "\nStorage Area: " + storageSelect + "\nAmount: " +modalCount);
        try {
            // Retrieve global count from AsyncStorage
            const value = await AsyncStorage.getItem('globalItemCounter');
            let globalCount = JSON.parse(value).itemCount || 0; // Initialize to 0 if no value is retrieved

            // Increment global count
            globalCount += 1;

            // Store item using incremented global count
            const jsonValue = JSON.stringify({ itemName: itemName, expDate: expirationDate, storageMethod: storageSelect, count: modalCount });
            await AsyncStorage.setItem('Item' + globalCount, jsonValue);

            // Update global count in AsyncStorage
            await AsyncStorage.setItem('globalItemCounter', JSON.stringify({ itemCount: globalCount }));

            handleCloseModalPress()
        } catch (error) {
            // Handle errors
            console.error('Failed to handle store item:', error);
        }
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
        setStorageSelect("Fridge")
    }

    const handleSelectFreezer = () => {
        setStorageSelect("Freezer")
    }

    const handleSelectPantry = () => {
        setStorageSelect("Pantry")
    }

    const handleSelectGrocery = () => {
        setStorageSelect("Grocery")
    }

    const handleNameChange = (e) => {
        setItemName(e);
    }

    const handleChangeUnits = () => {
        console.log("hi")
    }

    const handleSetCount = (e) => {
        setModalCount(e);
    }

    const addCount = () => {
        const count = parseFloat(modalCount);
        if (!isNaN(count) && count < 999) {
            setModalCount(count + 1);
        } else {
            // Handle the case when modalCount is not a valid number
            console.error('modalCount is not a valid number');
        }
    }

    const subCount = () => {
        const count = parseFloat(modalCount);
        if (!isNaN(count) && count > 0) {
            setModalCount(count - 1);
        } else {
            // Handle the case when modalCount is not a valid number
            console.error('modalCount is not a valid number');
        }
    }

    const handleDateUpdate = (date) => {
        setExpirationDate(date)
        handleCloseDatePicker()
    }

    const handleCloseDatePicker = () => { setDatePickerOpen(false) }
    const handleOpenDatePicker = () => { setDatePickerOpen(true); nameRef.current.blur(); }

    const handleTabPress = (tabName) => {
        setSelectedTab(tabName)
    }



    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={{ height: "50%" }}>
                        <View style={{ height: "10%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={handleCloseModalPress}>
                                <Ionicons name="close" color={"white"} size={30} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>New Food Item</Text>
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
                                    ref={nameRef}
                                    value={itemName}
                                    onChangeText={handleNameChange}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.overlay} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Expiration date"
                                    value={expirationDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', })}
                                    editable={false}
                                    onPressIn={handleOpenDatePicker}
                                />
                                <DateTimePickerModal
                                    isVisible={datePickerOpen}
                                    mode="date"
                                    onConfirm={handleDateUpdate}
                                    onCancel={handleCloseDatePicker}
                                />
                            </View>
                            <View style={styles.storageMethodContainer}>
                                <TouchableOpacity style={[styles.storageButtons, storageSelect === 'Fridge' ? { borderWidth: 2, borderColor: 'gold' } : {}]} onPress={handleSelectFridge}>
                                    <View style={styles.overlay} />
                                    <Text style={{ color: "white" }}>Fridge</Text>
                                    <MaterialCommunityIcons name='fridge' color={'white'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.storageButtons, storageSelect === 'Freezer' ? { borderWidth: 2, borderColor: 'gold' } : {}]} onPress={handleSelectFreezer}>
                                    <View style={styles.overlay} />
                                    <Text style={{ color: "white" }}>Freezer</Text>
                                    <Ionicons name='snow-outline' color={'white'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.storageButtons, storageSelect === 'Pantry' ? { borderWidth: 2, borderColor: 'gold' } : {}]} onPress={handleSelectPantry}>
                                    <View style={styles.overlay} />
                                    <Text style={{ color: "white" }}>Pantry</Text>
                                    <MaterialCommunityIcons name='library-shelves' color={'white'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.storageButtons, storageSelect === 'Grocery' ? { borderWidth: 2, borderColor: 'gold' } : {}]} onPress={handleSelectGrocery}>
                                    <View style={styles.overlay} />
                                    <Text style={{ color: "white" }}>Grocery</Text>
                                    <MaterialIcon name='local-grocery-store' color={'white'} size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.amountContainer}>
                                <View style={styles.amountBoxesContainer}>
                                    <View style={styles.overlay} />
                                    <TextInput
                                        style={styles.amountInputs}
                                        placeholder="Count"
                                        keyboardType='numeric'
                                        value={modalCount.toString()}
                                        onChangeText={handleSetCount}
                                    />
                                    <View style={{ width: "25%", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                        <TouchableOpacity
                                            style={{ height: "50%", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderLeftWidth: 1 }}
                                            onPress={addCount}
                                        >
                                            <Ionicons name='add' color={'white'} size={20} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ height: "50%", justifyContent: "center", alignItems: "center", borderLeftWidth: 1 }}
                                            onPress={subCount}
                                        >
                                            <MaterialCommunityIcons name='minus' color={'white'} size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.amountBoxesContainer}>
                                    <View style={styles.overlay} />
                                    <TextInput
                                        style={styles.amountInputs}
                                        placeholder="Weight"
                                        keyboardType='numeric'
                                    />
                                    <TouchableOpacity
                                        style={{ width: "25%", borderTopRightRadius: 15, borderBottomRightRadius: 15, height: "100%", justifyContent: "center", alignItems: "center", borderLeftWidth: 1 }}
                                        onPress={handleChangeUnits}
                                    >
                                        <Text style={{ color: "white" }}>{modalAmountUnit}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <KeyboardAvoidingView
                        style={styles.modalDone}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}>
                        <TouchableOpacity style={[styles.DoneButton, { height: datePickerOpen ? 0 : 60 }]} onPress={() => handleStoreItem()}>
                            <Text style={{ color: "white", fontSize: 16 }}>Add</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>
            <View style={{ flex: 1 }}>
                <View style={{height: "5%", justifyContent: "center", alignItems: "center", flexDirection: "row", borderRadius: 25, width: "100%"}}>
                    <View style={{width: "25%", justifyContent: "center", alignItems: "center", borderRadius: 25, height: "80%", backgroundColor: selectedTab === 'Fridge' ? '#0E7AFE' : '#000',}}><Text style={{color: "white"}}>Fridge</Text></View>
                    <View style={{width: "25%", justifyContent: "center", alignItems: "center", borderRadius: 25, height: "80%", backgroundColor: selectedTab === 'Freezer' ? '#0E7AFE' : '#000',}}><Text style={{color: "white"}}>Freezer</Text></View>
                    <View style={{width: "25%", justifyContent: "center", alignItems: "center", borderRadius: 25, height: "80%", backgroundColor: selectedTab === 'Pantry' ? '#0E7AFE' : '#000',}}><Text style={{color: "white"}}>Pantry</Text></View>
                    <View style={{width: "25%", justifyContent: "center", alignItems: "center", borderRadius: 25, height: "80%", backgroundColor: selectedTab === 'Groceries' ? '#0E7AFE' : '#000',}}><Text style={{color: "white"}}>Groceries</Text></View>
                </View>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            backgroundColor: 'black',
                            borderTopColor: 'gray'
                        },
                        tabBarActiveTintColor: '#0E7AFE', // active tab color
                        tabBarInactiveTintColor: 'gray', // inactive tab color
                        tabBarShowLabel: false,
                        headerShown: false
                    }}a
                >
                    <Tab.Screen
                        name="Fridge"
                        component={HomeDisplay}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name='fridge' color={color} size={26} />
                            ),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: () => {
                                // Update the selected tab when it is pressed
                                setSelectedTab('Fridge');
                            },
                        })}
                    />
                    <Tab.Screen
                        name="Freezer"
                        component={HomeDisplay}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name='snow-outline' color={color} size={26} />
                            ),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: () => {
                                // Update the selected tab when it is pressed
                                setSelectedTab('Freezer');
                            },
                        })}
                    />
                    <Tab.Screen
                        name="Pantry"
                        component={HomeDisplay}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name='library-shelves' color={color} size={26} />
                            ),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: () => {
                                // Update the selected tab when it is pressed
                                setSelectedTab('Pantry');
                            },
                        })}
                    />
                    <Tab.Screen
                        name="Grocery List"
                        component={HomeDisplay}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcon name='local-grocery-store' color={color} size={26}  />
                            ),
                        }}
                        listeners={({ navigation, route }) => ({
                            tabPress: () => {
                                // Update the selected tab when it is pressed
                                setSelectedTab('Groceries');
                            },
                        })}
                    />
                </Tab.Navigator>
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
        backgroundColor: "black",
        justifyContent: "space-between"
    },
    modalMainContents: {
        alignItems: "center",
        height: "90%",
    },
    inputContainer: {
        width: "90%",
        height: "18%",
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
    amountInputs: {
        flex: 1,
        width: "75%",
        height: "100%",
        color: "white",
        borderRadius: 15,
        paddingLeft: 15,
    },
    storageMethodContainer: {
        height: "18%",
        width: "90%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    storageButtons: {
        height: "100%",
        width: "22.5%",
        borderRadius: 15,
        marginRight: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    amountContainer: {
        height: "18%",
        width: "90%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    amountBoxesContainer: {
        height: "100%",
        width: "45%",
        borderRadius: 15,
        marginRight: 5,
        marginTop: 10,
        justifyContent: "center",
        flexDirection: "row"
    },
    modalDone: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    DoneButton: {
        width: "90%",
        height: 60,
        backgroundColor: '#0E7AFE',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Home;