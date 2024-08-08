import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Login } from './screens/login';

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={"./screens/login"} asChild>
        <TouchableOpacity >
          <Text style={styles.text}>Não tem token de validação ainda, clica aqui</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#308DBF',
    marginTop: 5,
  },
  textdiv: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 150,
  },
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    color: '#308DBF',
    borderRadius: 10,
    borderColor: '#308DBF',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  btn: {
    marginTop: 20,
    padding: 15,
    width: 300,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#308DBF',
  },

  btnText: {
    fontWeight: 'bold',
  },

  img: {
    margin: 100,
    width: 100,
    height: 100,
  }
});