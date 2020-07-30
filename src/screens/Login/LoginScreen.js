import * as React from 'react';
import {View, Text} from 'react-native';
import GoogleSignin from '../../components/login/GoogleSignin';

function Login() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <GoogleSignin />
    </View>
  );
}

export default Login;
