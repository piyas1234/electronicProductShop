import React, { useContext } from 'react'
import { StyleSheet, TextInput, View, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavbarContext } from '../../Context'
import SideBar from './SideBar'
function TopNav() {

    const {sildeNav, setSildeNav} = useContext(NavbarContext)
    return (
        <View style={styles.container}>
            <Image 
            source={{uri:'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo.png'}}
            style={{width:150,height:45,resizeMode:'cover', marginTop:10}}
            />
              <View style={styles.main}> 
             
             <MaterialIcons onPress={()=>setSildeNav(!sildeNav)} style={styles.icon}  color={'white'}    size={50} name="menu"/>
             <View style={styles.input} ><TextInput   placeholder="#Search Products" /></View>
             <MaterialIcons style={styles.icon} size={50} color={'white'} name="message"/>
             
         </View>
  
        </View>
          )
}

export default TopNav;

const styles = StyleSheet.create({
    input:{
        elevation: 5,
        backgroundColor:'white',
        borderColor:'gray',
        width:'74%',
         
        

    },
    icon:{
        elevation: 5,
        padding:5
    },
    main:{
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
         
    },
    container:{
        backgroundColor:'#03c2ff'
    }

})
