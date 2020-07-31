import React, {Component} from 'react';
import {Button} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import {requestAuthenticateUser} from '../../redux/actions/loginAction';
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
      <Button
        onPress={this.handleFacebookLogin}
        title="Continue with fb"
        color="#4267B2"
      />
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
