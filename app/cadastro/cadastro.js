import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, CheckBox, Text, View, TouchableOpacity, Image, Button, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import axios from 'axios';


const Cadastro = () => {
  const [ nome, setNome ] = useState(null);
  const [ sobrenome, setSobrenome ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ senha, setSenha ] = useState(null);

  const inserir = async () => {
    try{
      const retorno = await axios({
        method: "post",
        url: "http://192.168.5.183:5000/motoristas",
        data: {
          nome: nome,
          sobrenome: sobrenome,
          email: email,
          senha: senha,
        },
      });
  
      if(retorno.status == 201){
        alert('Cadastro criado com sucesso!')
        router.replace("../appMotorista/(tabs)/home/home")
      }
    }
    catch (error){
      if(error.response) alert(error.response.data)
    }
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/images/logo_branco.png')}/>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Informe o seu nome"
        placeholderTextColor="#308DBF"
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Informe o seu sobrenome"
        placeholderTextColor="#308DBF"
        onChangeText={setSobrenome}
      />
      <TextInput
        style={styles.input}
        placeholder="Informe o seu e-mail"
        placeholderTextColor="#308DBF"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Crie uma senha"
        placeholderTextColor="#308DBF"
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.btn}
        onPress={inserir}>
        <Text style={styles.btntext}>Fazer cadastro</Text>
      </TouchableOpacity>

      <View style={styles.textdiv}>
      <Link href={"login/login"} asChild>
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

export default Cadastro;