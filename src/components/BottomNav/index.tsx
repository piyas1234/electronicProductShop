// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import HomeScreen from '../../screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../../screens/ProfileScreen';
import CartScreen from '../../screens/CartScreen';
import OrderedScreen from '../../screens/OrderedScreen';
import {NavbarContext} from '../../Context';
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from '../../screens/DetailsScreen/DetailsScreen';
import {color} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomNav = () => {
  const {cart, setCart} = useContext(NavbarContext);
  const cartLength = cart.length;
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: '#00161a'}}
          tabBarOptions={{
            style: {
              height: 60,
              width: '100%',
              backgroundColor: 'tomato',
            },
            inactiveTintColor: 'white',
            activeTintColor: 'white',
            inactiveBackgroundColor: '#00d1ff',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({color}) => (
                <>
                  <Text
                    style={{
                      backgroundColor: 'gold',
                      padding: 10,
                      borderRadius: 50,
                    }}>
                    {cartLength}
                  </Text>
                  <MaterialCommunityIcons name="cart" color={color} size={30} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              tabBarLabel: 'Detail',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="information"
                  color={color}
                  size={30}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({color}) => (
                <FontAwesome name="user" color={color} size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  DetailsScreen: {
    display: 'none',
  },
});
