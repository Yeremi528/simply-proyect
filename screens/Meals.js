import React from "react"
import { View,FlatList,StyleSheet,Text} from "react-native"
import ListItem from "../components/ListItem"
import useFetch  from "../hooks/useFetch"

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
        alignItems:"flex-start",
        justifyContent:"flex-start",
    },
    list:{
        alignSelf :"stretch",
    }
})

const Meals = ({navigation}) =>{
   const{loading,data : drogas} = useFetch("https://enemiga-yeremi528.vercel.app/api/meals")
    return(
        <View styles={styles.container}>
            {loading ? <Text>Cargando...</Text> :
           <FlatList
           style={styles.list}
           data={drogas}
           keyExtractor={x =>x._id}
           renderItem={({item}) =>
           <ListItem
           onPress={()=> navigation.navigate("Modal",{_id:item._id})}
           name={item.name}
           />}
           />}
        </View>
    )
}
Meals.navigationOptions =({
    title:"Comidas disponibles",
})
export default Meals