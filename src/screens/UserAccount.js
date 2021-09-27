import React, { useEffect, useState } from 'react'

import { Button, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator()

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

export default function UserAccount() {
  const [clicked, setClicked] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = (userEmail, userPass) => {
    auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .then(() => {
        console.log('User successfully login');
      })
      .catch((error) => {
        if(error.code === 'auth/invalid-email') {
          console.log('Email Address is invalid');
        }
        if(error.code === 'auth/user-not-found') {
          console.log('Email Address is registered');
        }
        if(error.code === 'auth/wrong-password') {
          console.log('Password is invalid');
        }
        console.error(error);
      })
  }

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  function handleClick() {
    setClicked(true);
  }

  console.log(clicked);

  if(clicked){
    if(!user) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )
    }
  }
  // if(!user) {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //       <Stack.Screen name="Register" component={RegisterScreen} />
  //     </Stack.Navigator>
  //   )
  // }

  return (
    <Button title="Login/Register" onPress={() => handleClick()} />
    // <Stack.Navigator>
    //   <Stack.Screen name="Login" component={LoginScreen} />
    // </Stack.Navigator>
    // <View>
    //   <Text>Welcome</Text>
    //   <Button title="Logout" onPress={() => handleLogout()} />
    // </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     paddingTop: 50
//   },
//   inputContainer: {
//     marginTop: 5,
//     marginBottom: 10,
//     width: Dimensions.get('window').width / 1.5,
//     height: Dimensions.get('window').height / 15,
//     borderColor: '#ccc',
//     borderRadius: 3,
//     borderWidth: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   input: {
//     padding: 10,
//     fontSize: 16,
//     color: '#333',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })