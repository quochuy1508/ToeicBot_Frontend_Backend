import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatbotScreen from '../screens/Chat/Chatbot';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatbotScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
