import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert} from 'react-native';
import {NavbarContext} from '../../Context';
import ImgSlider from '../ImgSlider';

interface ProductCardProps {
  items: {
    _id: String;
    title: String;
    image: String;
    price: String;
    description: String;
  };
}
const ProductCard = (props: ProductCardProps) => {
  const {cart, setCart} = useContext(NavbarContext);
  const {items} = props;
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.navigate('DetailsScreen', {
      data: items,
    });
  };

  const addToCart = () => {
    const findbyId = cart.find(itm => itm._id === items._id) || false;
    findbyId
      ? Alert.alert('warning', 'already added!')
      : setCart([...cart, {...items, qty: 1}]);
  };
  console.log(cart);
  return (
    <View style={styles.container}>
      
      <View style={styles.main}>
        <Text style={styles.price}>price - ${items.price}</Text>
        <Image style={styles.image} source={{uri: items.image}} />
        <Text style={styles.title}>{items.title}</Text>
        <View style={styles.buttonContiner}>
          <View style={styles.button}>
            <Button onPress={onPressHandler} color={'tomato'} title="details" />
          </View>
          <View style={styles.button}>
            <Button onPress={addToCart} color={'gold'} title="CART" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  main: {
    marginTop: 20,
    borderWidth: 2,
    width: '100%',
    height: 330,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  price: {
    backgroundColor: '#c507f9',
    padding: 5,
    color: 'white',
    borderRadius: 4,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  image: {
    height: 200,
    width: 200,
  },
  buttonContiner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '40%',
    margin: 5,
  },
});
