import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://driveroute-backend.onrender.com/motoristas/login', {
        email,
        senha,
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Bem-vindo ao DriveRoute!', [
          {
            text: 'OK',
            onPress: () => {
              router.replace('/appMotorista/(tabs)/home/home'); 
            },
          },
        ]);
      } else {
        Alert.alert('Erro', response.data || 'Erro desconhecido!');
      }

      
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data || 'Credenciais inválidas!');
      } else {
        Alert.alert('Erro', 'Falha na conexão. Tente novamente mais tarde.');
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
        <Text style={styles.text}>Esqueci a senha</Text>
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