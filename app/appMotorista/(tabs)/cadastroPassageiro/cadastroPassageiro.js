import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, CheckBox, Text, View, TouchableOpacity, Image, Button, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function Cadastro() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Passageiro</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Nome do passageiro"
        placeholderTextColor="#308DBF"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#308DBF"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#308DBF"
      />
        <TextInput
        style={styles.input}
        placeholder="Bairro"
        placeholderTextColor="#308DBF"
      />
        <TextInput
        style={styles.input}
        placeholder="Rua"
        placeholderTextColor="#308DBF"
      />
        <TextInput
        style={styles.input}
        placeholder="Número da casa"
        placeholderTextColor="#308DBF"
      />
      <TouchableOpacity style={styles.btn} onPress={()=>Alert.alert('Passageiro cadastrado com sucesso')}>
        <Text style={styles.btntext}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    title: {   
        fontSize: 24,
        color: '#308DBF',
        marginTop: 10, 
    },
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
    marginTop: 25,
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