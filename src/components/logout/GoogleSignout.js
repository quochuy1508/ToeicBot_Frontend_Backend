import {
    GoogleSignin,
  } from '@react-native-community/google-signin';
  import React, {Component} from 'react';
  import {Button, Alert} from 'react-native';
  import {signOut} from '../../redux/actions/loginAction';
  import {connect} from 'react-redux';

  class GoogleLogout extends Component {
    _signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this.props.signOut();
        Alert.alert("Logged out successfully!");
      } catch (error) {
        console.error(error);
      }
    };
    render() {
      return (
        <Button title="Log out!" onPress={() => this._signOut()}/>
      );
    }
  }  
  const mapDispatchToProps = {
    signOut,
  };
  
  const GoogleLogoutConnected = connect(
    null,
    mapDispatchToProps,
  )(GoogleLogout);
  
  export default GoogleLogoutConnected;  