import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: 'whitesmoke',
    width: 300
  },
  text: {
    position: 'absolute',
    left: 50,
  },
  icon: {
    marginLeft: 10,
  }
});

function LogSignButton({name}) {
  let icon, text;
  if(name === 'phone') {
    icon = 'mobile-phone';
    text = 'SIGN IN WITH PHONE';
  }
  else if(name === 'email') {
    icon = 'envelope-o';
    text = 'SIGN IN WITH EMAIL';
  }
  else if(name === 'facebook') {
    icon = 'facebook';
    text = 'SIGN IN WITH FACEBOOK';
  }
  else if(name === 'preset') {
    icon = 'user';
    text = 'PRESET ACCOUNT';
  }

  return (
    <TouchableOpacity style={styles.container}>
      <Icon style={styles.icon} name={icon} size={35} color="deepskyblue" />
      <Text style={styles.text}>   {text}</Text>
    </TouchableOpacity>
  );
}

export default LogSignButton;
