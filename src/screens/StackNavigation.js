import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './LoginScreen'

const Stack = createStackNavigator();

export function FirstStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}