import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class GeneralLogin extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TouchableOpacity onPress={this.handleLogin}>
          <View style={styles.signupBtn}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Don't have an account? Sign Up"
          color="transparent"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingSection: {
    borderColor: 1,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  heading: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 8,
    color: '#fff',
  },
  signupBtn: {
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: 100,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
