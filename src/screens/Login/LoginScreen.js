import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './style';
import Logo from '../../components/common/Logo';
import GoogleSignin from '../../components/login/GoogleSignin';
import FacebookLogin from '../../components/login/FacebookLogin';
import GeneralLogin from '../../components/login/GeneralLogin';

function Login() {
  return (
    <View style={styles.container}>
      <Logo logosize={100} textsize={30} color="black" />
      <View style={styles.buttonContainer}>
        <GoogleSignin />
        <FacebookLogin />
      </View>
      <Text style={styles.author}>Một sản phẩm của The Lord Of Phoenix</Text>
      <StatusBar backgroundColor="deepskyblue"/>
    </View>
  );
}

export default Login;
