import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

function TabIcon({color, focused, name}) {
  let iconName;
  if (name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
    return <Icon2 name={iconName} size={24} color={color} />;
  } else if (name === 'Profile') {
    iconName = focused ? 'ios-list' : 'ios-list';
  }
  return <Icon name={iconName} size={24} color={color} />;
}

export default TabIcon;