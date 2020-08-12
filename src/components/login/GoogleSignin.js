import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import React, {Component} from 'react';
import {requestAuthenticateUser} from '../../redux/actions/loginAction';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class GoogleButton extends Component {
  state = {
    userInfo: {},
  };

  _storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  _signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '202766130146-hir8v2igp1pasribup82slm0j08tnmlq.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      Alert.alert('Log In', 'Logged in successfully!');
      this.setState(
        {
          userInfo: info.user,
        },
        () => this.props.requestAuthenticateUser(info.user),
      );
      this._storeUser(info.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Log In', 'Login failed!\nPlease select your Google account');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Log In', 'Login failed!\nSign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Log In', 'Login failed!\nPlay services not available or outdated');
      } else {
        Alert.alert('Log In', 'Login failed!\nSomething went wrong');
      }
      console.log('error: ', error);
    }
  };
  render() {
    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={() => this._signIn()}
      />
    );
  }
}
const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  requestAuthenticateUser,
};

const GoogleButtonConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleButton);

export default GoogleButtonConnected;
