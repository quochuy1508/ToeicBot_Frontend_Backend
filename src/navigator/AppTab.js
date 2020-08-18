import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile';
import Notification from '../screens/Notifications';
import Settings from '../screens/Setting';
import Logo from '../components/common/Logo';
import TabIcon from '../components/common/TabIcon';
import HomeNavigator from './HomeNavigator';
import ChatNavigator from './ChatNavigator';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function AppTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => (
          <TabIcon color={color} focused={focused} name={route.name} />
        ),
      })}
      tabBarOptions={{
        activeTintColor: 'deepskyblue',
        inactiveTintColor: 'gainsboro',
        showIcon: true,
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Chatbot" component={ChatNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AllNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Header"
        component={AppTab}
        options={{
          headerTitle: () => (
            <Logo logosize={30} textsize={20} color="deepskyblue" />
          ),
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <Stack.Screen name="Notifications" component={Notification} options={{headerTitle: 'Thông báo'}} />
      <Stack.Screen name="Settings" component={Settings} options={{headerTitle: 'Cài đặt'}}/>
    </Stack.Navigator>
  );
}

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default AllNavigator;
