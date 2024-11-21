import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DRIVEROUTE_API } from '@env';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${DRIVEROUTE_API}/motoristas/login`, {
        email,
        senha,
      });
    
      if (response.status === 200) {
        const motorista = response.data;
        await AsyncStorage.setItem('@motorista_id', String(motorista.id));
        alert('Bem-vindo ao DriveRoute!');
        router.replace('../appMotorista/(tabs)/home/home');
      }
    } catch (error) {
      console.error('Erro ao conectar:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Detalhes: ' + (error.response ? error.response.data : error.message));
      if (error.response) {
        const errorMessage = typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data.message || 'Erro desconhecido';
        alert(`Erro: ${errorMessage}`);
      } else {
        alert('Erro ao tentar se conectar. Verifique sua conexão com a internet.');
      }
    }
    
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/images/logo_branco.png')} />
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Insira o seu e-mail"
        placeholderTextColor="#308DBF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Insira a sua senha"
        placeholderTextColor="#308DBF"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btntext}>Fazer login</Text>
      </TouchableOpacity>
      <View style={styles.textdiv}>
        <Link href="/cadastro/cadastro" asChild>
          <TouchableOpacity>
            <Text style={styles.text}>Não tem uma conta? Cadastre-se</Text>
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
  img: {
    margin: 100,
    width: 100,
    height: 100,
  },
});
