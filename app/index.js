import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Login from './login/login';

export default function Index() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

});

