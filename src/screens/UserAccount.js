import React, { createContext, useContext, useEffect, useState } from 'react'

import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator()
const userContext = createContext()

function MainScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.editText}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={{ color: '#0000ff', fontWeight: '500' }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Email Address:</Text>
        <Text style={styles.info}>Dummy Email</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>First Name:</Text>
        <Text style={styles.info}>Dummy First Name</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Last Name:</Text>
        <Text style={styles.info}>Dummy Last Name</Text>
      </View>
    </View>
  )
}

function EditScreen({ navigation }){
  const userData = useContext(userContext)
  const [firstName, setFirstName] = useState(null);
  
  return (
    <View>
      <TextInput
        placeholder="Input your First Name"
        value={firstName}
        onChangeText={fName => setFirstName(fName)}
      />
      <Button title="Done" />
    </View>
  )
}

export default function UserAccount() {
  const [clicked, setClicked] = useState(false);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const handleClicked = () => {
    setClicked(true);
  }

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(!user) {
    if(!clicked) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Login / Register" onPress={() => handleClicked()} />
        </View>
      )
    }
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    )
  }

    
  
  return (
    // <View style={styles.root}>
    //   <View style={styles.editText}>
    //     <TouchableOpacity>
    //       <Text style={{ color: '#0000ff', fontWeight: '500' }}>Edit</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.rowContainer}>
    //     <Text style={styles.text}>Email Address:</Text>
    //     <Text style={styles.info}>Dummy Email</Text>
    //   </View>
    //   <View style={styles.rowContainer}>
    //     <Text style={styles.text}>First Name:</Text>
    //     <Text style={styles.info}>Dummy First Name</Text>
    //   </View>
    //   <View style={styles.rowContainer}>
    //     <Text style={styles.text}>Last Name:</Text>
    //     <Text style={styles.info}>Dummy Last Name</Text>
    //   </View>
    // </View>
    <userContext.Provider value={user}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ headerShown: false}} />
      </Stack.Navigator>
    </userContext.Provider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  rowContainer: {
    top: 210,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    left: 50,
  },
  text: {
    width: 100,
    fontWeight: 'bold',
    marginRight: 10
  },
  info: {
    width: 200
  },
  editText: {
    top: 200,
    left: '80%',
  }
})