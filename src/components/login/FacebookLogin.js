import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import {requestAuthenticateUser} from '../../redux/actions/loginAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
  }

  handleFacebookLogin = () => {
    const authenAction = this.props.requestAuthenticateUser;
    return LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result) {
        console.log('result', result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' + result.grantedPermissions,
          );
          authenAction(result.grantedPermissions);
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  render() {
    return (
      <TouchableOpacity 
        onPress={this.handleFacebookLogin}
        style={styles.container}
        delayPressIn={0}
      >
        <Icon name='facebook' size={24} color="white" style={styles.icon} />
        <Text style={styles.text}>Đăng nhập bằng Facebook</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  requestAuthenticateUser,
};

const FacebookButtonConnected = connect(
  null,
  mapDispatchToProps,
)(FacebookLogin);
export default FacebookButtonConnected;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4267B2", 
    flexDirection: "row", 
    width: 305, 
    height: 40, 
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    },
  icon: {
    left: 15,
    position: 'absolute'
  },
  text: {
    color: 'white',
    left: 95,
    position: 'absolute'
  } 
});