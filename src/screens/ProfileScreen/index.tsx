import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
} from 'react-native';
import Api from '../../Axios/Api';
import TopNav from '../../components/TopNav';
import {NavbarContext} from '../../Context';

const ProfileScreen = () => {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const {Auth, setAuth} = useContext(NavbarContext);

  const Msg = useRoute().params?.msg || false;

  const onPressHandler = () => {
    email && password
      ? AuthRequest()
      : Alert.alert('warning', 'Fill all the fields');
  };

  const AuthRequest = async () => {
    try {
      const AuthUser = await Api.post('/auth/login', {
        email,
        password,
      });
      setAuth(AuthUser.data);
    } catch (err) {
      console.warn(err);
    }
  };
  console.log(Auth);
  return (
    <View>
      <TopNav />

      {!Auth?.auth && (
        <View style={styles.main}>
          {Msg && <Text style={styles.msg}>{Msg}</Text>}
          <Image
            style={{width: 200, height: 60}}
            source={{
              uri: 'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo.png',
            }}
          />

          <Text style={styles.loginbox}>Login</Text>
          <TextInput
            onChangeText={text => setEmail(text)}
            placeholder="Enter Your Email"
            style={styles.input}
          />
          <TextInput
            onChangeText={text => setPassword(text)}
            placeholder="Enter Your Password"
            style={styles.input}
          />
          <View style={styles.input}>
            <Button onPress={onPressHandler} title="Login" />
          </View>
        </View>
      )}

      {Auth?.auth && (
        <View style={styles.card}>
          <Text style={styles.user}>Name - {email.slice(0, 5)}</Text>
          <Text style={styles.user}>Email - {email}</Text>
          <View style={styles.button}>
            <Button onPress={() => setAuth([])} color="red" title="logout" />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '30%',
    backgroundColor: 'white',
    paddingVertical: 50,
    borderRadius: 10,
    margin: 20,
  },
  loginbox: {
    backgroundColor: 'tomato',
    padding: 10,
    margin: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    backgroundColor: '#fdde',
    margin: 15,
  },
  user: {
    backgroundColor: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    margin: 10,
  },
  button: {
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 100,
    padding: 20,
    margin: 20,
  },
  msg: {
    fontSize: 26,
    fontWeight: 'bold',
    backgroundColor: 'gold',
    color: 'red',
    marginVertical: 20,
    textAlign: 'center',
    padding: 7,
    margin: 10,
  },
});
