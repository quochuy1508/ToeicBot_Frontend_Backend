import {
    GoogleSignin,
  } from '@react-native-community/google-signin';
  import React, {Component} from 'react';
  import {Button, Alert} from 'react-native';
  import {signOut} from '../../redux/actions/loginAction';
  import {connect} from 'react-redux';
  import AsyncStorage from '@react-native-community/async-storage';

  class GoogleLogout extends Component {
    _removeUser = async () => {
      try {
        await AsyncStorage.removeItem('user')
      } catch(e) {
        // remove error
      }
    }
    _onPress = () => {
      Alert.alert(
        'Log Out',
        'Do you want to log out?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          { text: 'OK', onPress: () => this._signOut()}
        ],
        { cancelable: true }
      );
    };
    _signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this._removeUser();
        this.props.signOut();
        Alert.alert("Logged out successfully!");
      } catch (error) {
        console.error(error);
      }
    };
    render() {
      return (
        <Button title="Log out!" onPress={() => this._onPress()}/>
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