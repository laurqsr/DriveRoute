import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DRIVEROUTE_API } from '@env';

export default function CadastroPassageiro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
  });
  const [motoristaId, setMotoristaId] = useState(null);

  const fetchMotoristaId = async () => {
    try {
      const id = await AsyncStorage.getItem('@motorista_id');
      console.log('ID do motorista recuperado do AsyncStorage:', id);
      if (id) {
        setMotoristaId(id);
      } else {
        Alert.alert('Erro', 'ID do motorista não encontrado. Faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar o ID do motorista:', error.message);
    }
  };

  useEffect(() => {
    fetchMotoristaId();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCadastro = async () => {
    if (!motoristaId) {
      Alert.alert('Erro', 'ID do motorista não encontrado. Faça login novamente.');
      return;
    }

    try {
      const payload = { ...formData, motorista: motoristaId }; 
      console.log('Enviando dados para o backend:', payload); 

      const response = await axios.post(`${DRIVEROUTE_API}/enderecos/new`, payload);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Passageiro cadastrado com sucesso!');
        setFormData({
          nome: '',
          email: '',
          cidade: '',
          bairro: '',
          rua: '',
          numero: '',
        });
      } else {
        console.error('Erro ao cadastrar passageiro:', response.data);
      }
    } catch (error) {
      console.error('Erro ao cadastrar passageiro:', error.message);
      Alert.alert('Erro', error.response ? error.response.data : error.message);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Passageiro</Text>
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
          placeholder="Número"
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
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
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
    fontWeight: 'bold',
    color: 'white',
  },
});
