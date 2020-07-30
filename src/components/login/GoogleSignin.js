import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import React, {Component} from 'react';
import {requestAuthenticateUser} from '../../redux/actions/loginAction';
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
      alert('login success');
      this.setState(
        {
          userInfo: info.user,
        },
        () => this.props.requestAuthenticateUser(info.user),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log('error: ', error);
      alert('login error');
    }
  };
  render() {
    return (
      <GoogleSigninButton
        style={{width: 250, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => this._signIn()}
        // disabled={this.state.isSigninInProgress}
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
