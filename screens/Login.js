import React from "react"
import {Text,TextInput,View,StyleSheet,Button, Alert, AsyncStorage} from "react-native"
import useForm from "../hooks/useForm"
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:55,
    },
    input:{
        height:40,
        borderColor: "#ccc",
        borderWidth: 1,
        alignSelf:"stretch",
        marginBottom:10,
        paddingHorizontal:5,
    },
    title:{
        fontSize:26,
        marginBottom:16
    },
    boton:{
        backgroundColor:"white"
    }
})
export default ({navigation}) =>{
    const initialState ={
        email:"",
        password:"",
    }
    const onSubmit = values =>{
        fetch('https://enemiga-yeremi528.vercel.app/api/auth/login',{
            method: "POST",
            headers: {
                "Content-Type" : "Application/json",
            },
            body: JSON.stringify(values),
        })
        .then(x => x.text())
        .then(x => {
            try {
                return JSON.parse(x)
            }catch{
                throw x
            }
        })
        .then(x =>  {
            AsyncStorage.setItem("token",x.token)
            navigation.navigate("Meals")
        })
        .catch(e =>Alert.alert("Error", e))
    }
    const {subscribe, inputs, handleSubmit} = useForm(initialState, onSubmit)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesion</Text>
            <TextInput 
            autoCapitalize="none"
            style={styles.input}
             placeholder="Email"
             onChangeText={subscribe("email")}
             value={inputs.email}/>
            <TextInput autoCapitalize="none"
            style={styles.input}
             placeholder="Contraseña"
             onChangeText={subscribe("password")}
             value={inputs.password}
             secureTextEntry={true}/>
            <Button styles={styles.boton} title="Iniciar Sesion" onPress={handleSubmit}/>
            <Button title="Registrarse" onPress={()=>navigation.navigate("Register")}/>
        </View>
        
    )
}