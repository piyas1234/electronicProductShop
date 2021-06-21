import React, { useContext, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import CartScreen from './src/screens/CartScreen';
import OrderedScreen from './src/screens/OrderedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Context, { NavbarContext } from './src/Context';
import BottomNav from './src/components/BottomNav';
const Tab = createMaterialBottomTabNavigator();
// const Tab = createBottomTabNavigator()

const App = () => {
   
  return (
    <Context>
     <BottomNav></BottomNav>
    </Context>
      );
};

export default App;
