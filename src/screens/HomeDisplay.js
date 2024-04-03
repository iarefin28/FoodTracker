import { View, Text, StyleSheet, Animated, ScrollView, Dimensions, TouchableOpacity } from 'react-native'

const Item = ({itemName, expirationInDays, weight}) => {
    return (
        <TouchableOpacity style={{ width: "90%", height: Dimensions.get("screen").height * 0.08, borderRadius: 15, marginBottom: 15, flexDirection: "row", backgroundColor: 'rgb(28, 28, 30)' }}>
            <View style={{width: "50%", height: "100%", justifyContent: "center"}}>
                <Text style={{color: "white", fontSize: 16, marginLeft: 10}}>{itemName}</Text>
            </View>
            <View style={{width: "50%", height: "100%", justifyContent: "center", flexDirection: "row"}}>
                <View style={{width: "50%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Text style={{color: "white"}}>Expiration</Text>
                    <Text style={{color: "white"}}>{expirationInDays}</Text>
                </View>
                <View style={{width: "50%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Text style={{color: "white"}}>Weight</Text>
                    <Text style={{color: "white"}}>8 oz.</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const HomeDisplay = () => {
    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <View style={{ flex: 1, alignItems: "center", paddingTop: 15 }}>
                <Item itemName="Octopus Legs" expirationInDays="1d" weight="8 oz."/>
                <Item itemName="Ribeye Steak" expirationInDays="2-3d" weight="16 oz."/>
                <Item itemName="Mozerella Cheese" expirationInDays="5d" weight="8 oz."/>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    overlayItem: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'gray',
        borderRadius: 15,
        opacity: 0.2
    }
});

export default HomeDisplay;