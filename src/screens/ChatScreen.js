import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7'
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -320,
    top: -20
  }
})
