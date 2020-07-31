import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/HomeScreen';
import Logo from '../components/common/Logo';
import NotiSet from '../components/common/NotiSet';
import TabIcon from '../components/common/TabIcon';
import Menu from '../screens/Menu';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function MenuNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
}

function AppNavigator({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NotiSet navigation={navigation} />
    });
  }, [navigation]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => <TabIcon color={color} focused={focused} name={route.name} />
      })}
      tabBarOptions={{
        activeTintColor: "deepskyblue",
        inactiveTintColor: "gainsboro",
        showIcon: true,
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Profile" component={MenuNavigator} />
    </Tab.Navigator>
  );
}

function AllNavigator() {
  return (
  <Stack.Navigator>
    <Stack.Screen 
      name="Header" 
      component={AppNavigator} 
      options={{
        headerTitle: () => <Logo logosize={30} textsize={20} color='deepskyblue'/>,
        headerStyle: {
          elevation: 0,
        },
      }}
      />
    <Stack.Screen name="Notifications" component={Home}/>
    <Stack.Screen name="Settings" component={Home}/>
  </Stack.Navigator>
  )
}

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default AllNavigator;
