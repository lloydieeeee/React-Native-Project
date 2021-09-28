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
  const userData = useContext(userContext)

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userData.uid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
    
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setState(documentSnapshot.data())
        }
      });
  }, [userData])

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View style={styles.root}>
      <View style={styles.logoutText}>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={{ color: '#0000ff', fontWeight: '500' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editText}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={{ color: '#0000ff', fontWeight: '500' }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Email Address:</Text>
        <Text style={styles.info}></Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>First Name:</Text>
        <Text style={styles.info}></Text>
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
  
  const handleClick = (id, email) => {
    firestore()
      .collection('Users')
      .doc(id)
      .update({
        emailAddress: email,
        firstName: firstName
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  return (
    <View>
      <TextInput
        placeholder="Input your First Name"
        value={firstName}
        onChangeText={fName => setFirstName(fName)}
      />
      <Button title="Done" onPress={() => { handleClick(userData.uid, userData.email); navigation.navigate('Main'); } } />
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
    top: 180,
    left: '80%',
  },
  logoutText: {
    top: 180,
    left: '80%',
  }
})