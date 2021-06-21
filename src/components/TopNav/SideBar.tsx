import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SideBar = () => {
    return (
        <View style={styles.container}>
             <View style={styles.main} >
            <Text style={styles.text}>+Mobile</Text>
            <Text style={styles.text}>+Leptop</Text>
            <Text style={styles.text}>+Tv</Text>
            <Text style={styles.text}>+Desktop</Text>
            <Text style={styles.text}>+Accesories</Text>
        </View>
        </View>
    )
}

export default SideBar;

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.30)',
        
        
    },
    main:{
        width:'60%',
        height:'100%',
        backgroundColor:'white'

    },
    text:{
        fontSize:24,
        letterSpacing:5,
        padding:10,
        color:'gray',
        fontWeight:'bold',
        backgroundColor:'#afff',
        marginTop:10,
        elevation:5

    }
})
