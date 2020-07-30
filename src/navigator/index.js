import React, {useState, useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {connect} from 'react-redux';
const Navigation = ({users}) => {
  console.log('users: ', users);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(users);
  }, [users]);
  return info && Object.keys(info).length > 0 ? (
    <AppNavigator />
  ) : (
    <AuthNavigator />
  );
};

const mapStateToProps = (state) => state;
const NavigationConnected = connect(mapStateToProps, null)(Navigation);
export default NavigationConnected;
