import React,{useEffect} from "react"
import { View,Text,ActivityIndicator,AsyncStorage } from "react-native"

export default ({navigation}) =>{
    useEffect (() =>{
        AsyncStorage.getItem("token")
        .then(x =>{
            navigation.navigate(x ? "Root" : "OnBoarding")
        })
    },[])
    return (
        <View>
            <ActivityIndicator/>
        </View>
    )
}