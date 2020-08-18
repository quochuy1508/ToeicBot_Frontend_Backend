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
      <View style={styles.supportContainer}>
        <Text>Having trouble? </Text>
        <Text style={styles.support}>Contact Support.</Text>
      </View>
      <View style={styles.signUpContainer}>
        <Text>DON'T HAVE ANY ACCOUNTS? </Text>
        <Text style={styles.signUp}>SIGN UP</Text>
      </View>
      <StatusBar backgroundColor="deepskyblue"/>
    </View>
  );
}

export default Login;
