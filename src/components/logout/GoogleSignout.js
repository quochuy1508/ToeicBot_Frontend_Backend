import {
    GoogleSignin,
  } from '@react-native-community/google-signin';
  import React, {Component} from 'react';
  import {Alert} from 'react-native';
  import {signOut} from '../../redux/actions/loginAction';
  import {connect} from 'react-redux';
  import AsyncStorage from '@react-native-community/async-storage';
  import Icon from 'react-native-vector-icons/Ionicons';

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
        'Đăng xuất',
        'Bạn muốn đăng xuất?',
        [
          {
            text: 'Hủy',
            style: 'cancel'
          },
          { text: 'Đồng ý', onPress: () => this._signOut()}
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
        Alert.alert("Đăng xuất","Đăng xuất thành công!");
      } catch (error) {
        console.error(error);
      }
    };
    render() {
      return (
        <Icon name='log-out-outline' size={30} color='black' onPress={this._onPress}/>
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