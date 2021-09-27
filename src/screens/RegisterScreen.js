import React from 'react';
import {Button, Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          numberOfLines={1}
          autoCorrect={false}
          style={styles.input}
          // value={email}
          // onChangeText={userEmail => setEmail(userEmail)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
          // value={password}
          // onChangeText={userPassword => setPassword(userPassword)}
        />
      </View>
      <Button title="Register" />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
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
});
