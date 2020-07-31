import React, {useState, useEffect} from 'react';
import AuthTab from './AuthTab';
import AppTab from './AppTab';
import {connect} from 'react-redux';
const Navigation = ({users}) => {
  console.log('users: ', users);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(users);
  }, [users]);
  return info && Object.keys(info).length > 0 ? <AppTab /> : <AuthTab />;
};

const mapStateToProps = (state) => state;
const NavigationConnected = connect(mapStateToProps, null)(Navigation);
export default NavigationConnected;
