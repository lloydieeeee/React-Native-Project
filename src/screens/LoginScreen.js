import React, { useEffect, useState } from 'react';
import {Button, Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';

import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = (userEmail, userPass) => {
    auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .then(() => {
        console.log('User successfully login');
        // setEmail(null);
        // setPassword(null);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          numberOfLines={1}
          autoCorrect={false}
          style={styles.input}
          value={email}
          onChangeText={userEmail => setEmail(userEmail)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={userPassword => setPassword(userPassword)}
        />
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={() => handleLogin(email, password)} />
      </View>
      <View style={styles.button}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 3.5,
    height: Dimensions.get('window').height / 20,
    marginBottom: 10,
  }
});
