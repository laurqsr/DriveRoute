import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { DRIVEROUTE_API } from '@env';

export default function HomeMotorista() {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enderecoPartida, setEnderecoPartida] = useState('');

  const fetchEnderecos = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`${DRIVEROUTE_API}/enderecos/listar`);
      if (response.status === 200) {
        setEnderecos(response.data); 
      } else {
        console.error('Erro ao buscar endereços:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição de endereços:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Habilite a permissão de localização nas configurações.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data.results.length > 0) {
        let fullAddress = response.data.results[0].formatted_address;
        const cleanedAddress = fullAddress.replace(/^[^,]+, /, ''); 
        setEnderecoPartida(fullAddress);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o endereço atual.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEnderecos();
    fetchCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#308DBF" />
      <View style={styles.cabecalho}>
        <Text style={styles.h2}>DriveRoute</Text>
        <Text style={styles.h2}>Gere suas rotas</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.h3}>Endereço de partida</Text>
        <View style={styles.infoContainer}>
          <TextInput
            placeholder="Endereço de partida"
            value={enderecoPartida}
            style={styles.input}
            editable={false} 
          />
        </View>
        <Text style={styles.h3}>Passageiros de Hoje</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#308DBF" />
          ) : enderecos.length > 0 ? (
            enderecos.map((endereco, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.passengerName}>{endereco.nome}</Text>
                <Text style={styles.passengerAddress}>Rua: {endereco.rua}, Nº: {endereco.numero}</Text>
                <Text style={styles.passengerAddress}>
                  Bairro: {endereco.bairro}, Cidade: {endereco.cidade}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Nenhum passageiro cadastrado.</Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.btn} onPress={fetchEnderecos}>
        <Text style={styles.btntext}>Atualizar Lista</Text>
      </TouchableOpacity>
      <Link href="../../rota/rota" style={styles.btnRota} asChild>
        <TouchableOpacity>
        <Image style={{ width: 40, height: 40 }} source={require('../../../../assets/images/routeBtn.png')} />
          <Text style={styles.text}>Gerar rota</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cabecalho: {
    backgroundColor: '#308DBF',
    height: 120,
    display: 'flex',
    flexDirection: 'collun',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: '#308DBF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  h2: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    paddingRight: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollView: {
    marginVertical: 10,
    maxHeight: 250,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  card: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  passengerAddress: {
    fontSize: 14,
    color: '#555',
  },
  btn: {
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#308DBF',
    alignItems: 'center',
  },
  btntext: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  btnRota: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
  },
});
