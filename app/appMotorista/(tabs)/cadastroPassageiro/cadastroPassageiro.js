import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCadastro = async () => {
    try {
      const response = await axios.post('https://driveroute-backend.onrender.com/enderecos/new', formData);
      Alert.alert('Sucesso', response.data);
      
      setFormData({
        nome: '',
        email: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
      });
    } catch (error) {
      Alert.alert('Erro', error.response ? error.response.data : error.message);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Endereço</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#308DBF"
          value={formData.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#308DBF"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#308DBF"
          value={formData.cidade}
          onChangeText={(value) => handleInputChange('cidade', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#308DBF"
          value={formData.bairro}
          onChangeText={(value) => handleInputChange('bairro', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rua"
          placeholderTextColor="#308DBF"
          value={formData.rua}
          onChangeText={(value) => handleInputChange('rua', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número da casa"
          placeholderTextColor="#308DBF"
          keyboardType="numeric"
          value={formData.numero}
          onChangeText={(value) => handleInputChange('numero', value)}
        />

        <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
          <Text style={styles.btntext}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#308DBF',
    marginTop: 10,
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
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: 20,
    padding: 15,
    width: 300,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#308DBF',
  },
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
