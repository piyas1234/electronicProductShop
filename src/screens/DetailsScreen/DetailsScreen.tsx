import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView, Alert } from 'react-native'
import TopNav from '../../components/TopNav'
import SideBar from '../../components/TopNav/SideBar';
import { NavbarContext } from '../../Context';

const DetailsScreen = ()=> {
   
    const {sildeNav, cart, setCart} = useContext(NavbarContext);
    const {params} = useRoute()

    const { _id ,image, title, description , price} = params?.data || {};


  
 
    
    const addToCart = ()=>{
         const findbyId =   cart.find((itm)=>itm._id=== _id) || false
         findbyId?Alert.alert('warning','already added!'): setCart([...cart,{...params.data,qty:1} ])
    }
    return (
        <View>
            <TopNav/>
            {sildeNav && <SideBar/>}
            {params?.data && 
            
            <ScrollView style={styles.main}>
            <View style={styles.main}>
            <View style={styles.imagemain}>
            <Image 
            source={{uri:image}}
            style={styles.image} 
            />
                </View>
            <View style={styles.buttonMain}>

            <View style={styles.button}>
            <Button title= {`$${price}`} /> 
            </View>
             <View style={styles.button}>
            <Button onPress={addToCart} color="gold" title= {`Add To Cart`} /> 
            </View>
            </View>
            <Text style={styles.title}>Model - {title}</Text>
            <Text style={styles.description}>{description}</Text>
            </View>
      
            </ScrollView>
         }
               </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    main:{
        height:'85%',
        margin:20,
    },
    imagemain:{
        
        borderWidth:7,
        borderColor:'gray',
        shadowColor: "white",
        elevation:10,

    },
    image:{
        width:'100%',
        height:300 
    },
    title:{
        color:'white',
        fontWeight:'bold',
        fontSize:30,
        marginVertical:30
    },
    description:{
        color:'white',
        fontSize:18,
        
    },
    buttonMain:{
        flexDirection:'row',
        marginVertical:20
    },
    button:{
        margin:3
    }
})
