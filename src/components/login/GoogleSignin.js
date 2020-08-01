import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import React, {Component} from 'react';
import {requestAuthenticateUser} from '../../redux/actions/loginAction';
import {Alert} from 'react-native';
import {connect} from 'react-redux';

class GoogleButton extends Component {
  state = {
    userInfo: {},
  };
  _signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '202766130146-hir8v2igp1pasribup82slm0j08tnmlq.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      Alert.alert('Logged in successfully!', 'Welcome');
      this.setState(
        {
          userInfo: info.user,
        },
        () => this.props.requestAuthenticateUser(info.user),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login unsuccessful!', 'Please select your Google account');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
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
