import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image, Button} from 'react-native';
import {NavbarContext} from '../../Context';

interface CartProps {
  item: {
    _id: String;
    title: String;
    image: String;
    price: number;
    description: String;
    qty: number;
  };
}
const Cart = (props: CartProps) => {
  const {title, image, price, description, qty} = props.item;
  const {cart, setCart} = useContext(NavbarContext);
  const onPressHandler = () => {
    const filterItems = cart.filter(itm => itm._id !== props.item._id);
    setCart(filterItems);
  };

  return (
    <View style={styles.main}>
      <Text style={styles.text}>{title}</Text>
      <Image style={styles.image} source={{uri: image}} />
      <Text style={styles.text}>Price : ${price}</Text>
      <Text style={styles.text}>Qty - {qty}</Text>
      <View>
        <Button onPress={onPressHandler} color="red" title="Delete" />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    padding: 5,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
  },
   
});
