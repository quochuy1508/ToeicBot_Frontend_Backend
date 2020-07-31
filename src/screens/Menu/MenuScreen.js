import * as React from 'react';
import {View} from 'react-native';
import GoogleLogout from '../../components/logout'

function MenuScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GoogleLogout />
    </View>
  );
}

export default MenuScreen;
