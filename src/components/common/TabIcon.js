import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

function TabIcon({color, focused, name}) {
  let iconName;
  if (name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (name === 'Profile') {
    iconName = focused ? 'menu' : 'menu-outline';
  } else if (name === 'Chatbot') {
    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
  }
  return <Icon name={iconName} size={24} color={color} />;
}

export default TabIcon;
