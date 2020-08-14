import React, {useState, useEffect} from 'react';
import AuthTab from './AuthTab';
import AppTab from './AppTab';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';

const Navigation = ({users}) => {
  const [info, setInfo] = useState(null);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        setInfo(JSON.parse(jsonValue));
        GoogleSignin.configure({
          webClientId:
            '202766130146-hir8v2igp1pasribup82slm0j08tnmlq.apps.googleusercontent.com',
        });
        console.log('users: ', jsonValue);
      }
      else {
        setInfo(users);
        console.log('users: ', users);
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getUser()
  }, [users]);
  return info && Object.keys(info).length > 0 ? <AppTab /> : <AuthTab />;
};

const mapStateToProps = (state) => state;
const NavigationConnected = connect(mapStateToProps, null)(Navigation);
export default NavigationConnected;
