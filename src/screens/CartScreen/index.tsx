import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Cart from '../../components/Cart';
import TopNav from '../../components/TopNav';
import SideBar from '../../components/TopNav/SideBar';
import {NavbarContext} from '../../Context';
import Payment from '../../components/Payment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [patyment, setPatyment] = useState(false);
  const [response, setResponse] = useState();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [msg, setMsg] = useState(false);
  const {cart, setCart, sildeNav, setSildeNav,Auth} = useContext(NavbarContext);
  const totalPrice = cart.reduce((a, b) => a + parseInt(b.price), 0);
  const navigator = useNavigation()


   
  msg && Alert.alert('Payment done');
  msg && setMsg(false);
  const cartInfo = {
    id: '5eruyt35eggr76476236523t3',
    description: 'T Shirt - With react Native Logo',
    amount: 1,
  };

  const onPressHandler =()=>{
    if(Auth.auth){
      setPatyment(true)
    }else{
       navigator.navigate('Profile',{msg:'please login frist'})
    }
  }

  const onCheckStatus = async paymentResponse => {
    setPaymentStatus('Please wait while confirming your payment!');
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status

    try {
      const stripeResponse = await axios.post('http://localhost:8000/payment', {
        email: 'codergogoi@gmail.com',
        product: cartInfo,
        authToken: jsonResponse,
      });

      if (stripeResponse) {
        const {paid} = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus('Payment Success');
        } else {
          setPaymentStatus('Payment failed due to some issue');
        }
      } else {
        setPaymentStatus(' Payment failed due to some issue');
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(' Payment failed due to some issue');
    }
  };
  return (
    <View>
      <TopNav></TopNav>
      {!patyment && (
        <View>
          {sildeNav && <SideBar />}
          {cart.length > 0 && (
            <View>
              <View style={styles.button}>
                <Text style={styles.text}>Total price - ${totalPrice}</Text>
                <Button
                  onPress={onPressHandler}
                  title="Process to checkout"
                />
              </View>
              <FlatList
                data={cart}
                renderItem={({item, index}) => <Cart item={item}></Cart>}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {!cart.length && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}> Cart is Empty</Text>
              <Image
                style={styles.emptyimage}
                source={require('../../image/shopping-cart.png')}
              />
            </View>
          )}
        </View>
      )}

      {/* {
        response !== undefined && <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
              <Text style={{ fontSize: 25, margin: 10}}> { paymentStatus} </Text>
              <Text style={{ fontSize: 16, margin: 10}}> { response} </Text>
          </View>

     
       } */}
      {patyment && (
        <View style={styles.paymentMain}>
          <Payment
            onCheckStatus={onCheckStatus}
            amount={totalPrice}
            setPatyment={setPatyment}
            setCart={setCart}
            setMsg={setMsg}
          />
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'aril',
    margin: 5,
  },
  empty: {
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  emptyimage: {
    height: 200,
    width: 200,
  },
  emptyTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray',
  },
  paymentMain: {
    height: '100%',
  },
});
