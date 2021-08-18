import React from "react"
import { View,Text,StyleSheet, Button, AsyncStorage } from "react-native"
import useFetch from "../hooks/useFetch"

export default ({navigation}) =>{
    const id = navigation.getParam("_id")
    const {loading, data} = useFetch(`https://enemiga-yeremi528.vercel.app/api/meals/${id}`)
    
    return(
        <View style={styles.container}>
            {loading ? <Text>Cargando..</Text> :
            <>  
            <Text>{data._id}</Text>
            <Text>{data.name}</Text>
            <Text>{data.desc}</Text>
            <Button title="Aceptar" onPress={()=>{
                AsyncStorage.getItem("token")
                .then(x =>{
                    if(x){
                        fetch('https://enemiga-yeremi528.vercel.app/api/orders',{
                    method: "POST",
                    headers:{
                        'Content-type':'application/json',
                        authorization: x,
                    },
                    body: JSON.stringify({
                        meal_id:id,
                    })
                }).then(x =>{
                    if(x.status !==201){
                        return alert("La orden no pudo ser generada")
                    }
                    alert("Orden fue generada con exito")
                    navigation.navigate('Meals')
                })
                    }
                })
                
            }} />
            <Button title="cancelar" onPress={() =>navigation.navigate("Meals")}/>
            </>
            
}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})