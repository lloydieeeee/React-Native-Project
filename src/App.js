import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserAccount from './screens/UserAccount';

function DashboardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard!</Text>
    </View>
  );
}

function MessageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Message!</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <UserAccount />
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false, tabBarHideOnKeyboard: true }} />
      <Tab.Screen name="Message" component={MessageScreen} options={{ headerShown: false, tabBarHideOnKeyboard: true }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false, tabBarHideOnKeyboard: true }} />
    </Tab.Navigator>
  );
}

export default function App() {  
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
