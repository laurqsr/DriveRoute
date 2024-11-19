import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import axios from 'axios';
import { DRIVEROUTE_API } from '@env';


const Cadastro = () => {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inserir = async () => {
    if (isLoading) return;

    if (!nome || !sobrenome || !email || !senha) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    if (!email.includes("@")) {
      alert("Por favor, insira um e-mail válido!");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const retorno = await axios.post(`${DRIVEROUTE_API}/motoristas/new`, {
        nome,
        sobrenome,
        email,
        senha,
      });

      if (retorno.status === 201) {
        alert("Cadastro criado com sucesso! Bem-vindo ao DriveRoute!");
        router.replace("../appMotorista/(tabs)/home/home");
      }

    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert("Erro ao tentar se cadastrar. Tente novamente mais tarde.");
      }
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/images/logo_branco.png')} />
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
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Crie uma senha"
        placeholderTextColor="#308DBF"
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.btn, isLoading ? { backgroundColor: "#A9A9A9" } : {}]}
        onPress={inserir}
        disabled={isLoading}
      >
        <Text style={styles.btntext}>{isLoading ? "Carregando..." : "Fazer cadastro"}</Text>
      </TouchableOpacity>

      <View style={styles.textdiv}>
        <Link href={"login/login"} asChild>
          <TouchableOpacity>
            <Text style={styles.text}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    alignItems: 'center',
    marginTop: 10,
  },
  btntext: {
    fontSize: 16,
    fontWeight: 'bold',
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
  btn: {
    marginTop: 20,
    padding: 15,
    width: 300,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#308DBF',
  },
  img: {
    marginBottom: 30,
    width: 100,
    height: 100,
  },
});

export default Cadastro;
