import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, CheckBox, Text, View, TouchableOpacity, Image, Button, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Cadastro() {

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../../assets/images/logo_branco.png')} />
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Informe o seu e-mail"
        placeholderTextColor="#308DBF"
      />
      <TextInput
        style={styles.input}
        placeholder="Informe o seu e-mail"
        placeholderTextColor="#308DBF"
      />
      <TextInput
        style={styles.input}
        placeholder="Crie uma senha"
        placeholderTextColor="#308DBF"
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btntext}>Fazer cadastro</Text>
      </TouchableOpacity>
      <View style={styles.textdiv}>
        <Link href={"screens/login/login"} asChild>
          <TouchableOpacity >
            <Text style={styles.text}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    marginTop: 50,
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