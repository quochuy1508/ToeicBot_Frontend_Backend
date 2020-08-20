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
      Alert.alert('Đăng nhập', 'Đăng nhập thành công!');
      this.setState(
        {
          userInfo: info.user,
        },
        () => this.props.requestAuthenticateUser(info.user),
      );
      this._storeUser(info.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Đăng nhập', 'Hãy chọn tài khoản Google của bạn!');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Đăng nhập', 'Đang đăng nhập!');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Đăng nhập', 'Dịch vụ Play không khả dụng hoặc lỗi thời!');
      } else {
        Alert.alert('Đăng nhập', 'Đã xảy ra lỗi vui lòng thử lại sau!');
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
