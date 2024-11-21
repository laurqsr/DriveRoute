import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link } from 'expo-router';
import * as Location from 'expo-location';
import { DRIVEROUTE_API, GOOGLE_MAPS_APIKEY } from '@env';

export default function HomeMotorista() {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enderecoPartida, setEnderecoPartida] = useState('');
  const [motoristaId, setMotoristaId] = useState(null);

  // Busca o ID do motorista armazenado no AsyncStorage
  const fetchMotoristaId = async () => {
    try {
      const id = await AsyncStorage.getItem('@motorista_id');
      if (id) {
        const parsedId = parseInt(id, 10); // Converte o ID para inteiro
        setMotoristaId(parsedId);
        console.log('Motorista ID recuperado:', parsedId);
      } else {
        Alert.alert('Erro', 'ID do motorista não encontrado no armazenamento.');
      }
    } catch (error) {
      console.error('Erro ao buscar o ID do motorista:', error.message);
    }
  };

  // Busca a localização atual do motorista para definir o endereço de partida
  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Habilite a permissão de localização nas configurações.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log('Localização atual:', latitude, longitude);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data && response.data.results && response.data.results.length > 0) {
        const fullAddress = response.data.results[0].formatted_address;
        setEnderecoPartida(fullAddress);
        console.log('Endereço de partida atualizado:', fullAddress);
      } else {
        console.error('Resposta da API:', response.data);
        Alert.alert('Erro', 'Não foi possível obter o endereço atual.');
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error.message);
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  // Busca os endereços relacionados ao ID do motorista
  const fetchEnderecos = async () => {
    if (!motoristaId) return;

    try {
      setLoading(true);
      console.log('Buscando endereços para o motorista ID:', motoristaId);

      const response = await axios.get(`${DRIVEROUTE_API}/enderecos/listar`, {
        params: { motoristaId },
      });

      if (response.status === 200) {
        if (response.data.length > 0) {
          setEnderecos(response.data);
          console.log('Endereços encontrados:', response.data);
        } else {
          setEnderecos([]);
          console.log('Nenhum passageiro cadastrado.');
        }
      } else {
        Alert.alert('Erro', 'Resposta inesperada do servidor.');
        console.warn('Resposta inesperada:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição de endereços:', error.message);
      Alert.alert('Erro', 'Não foi possível buscar os endereços.');
    } finally {
      setLoading(false);
    }
  };

  // Inicializa o ID do motorista e a localização ao carregar o componente
  useEffect(() => {
    fetchMotoristaId();
    fetchCurrentLocation();
  }, []);

  // Atualiza a lista de endereços ao recuperar o ID do motorista
  useEffect(() => {
    if (motoristaId) {
      fetchEnderecos();
    }
  }, [motoristaId]);

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
        <Text style={styles.h3}>Lista de passageiros</Text>
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
        <TouchableOpacity disabled={enderecos.length < 2}>
          <Image style={{ width: 40, height: 40 }} source={require('../../../../assets/images/routeBtn.png')} />
          <Text style={[styles.text, enderecos.length < 2 ? { color: '#A9A9A9' } : {}]}>
            {enderecos.length < 2 ? 'Adicione pelo menos 2 passageiros' : 'Gerar rota'}
          </Text>
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
    flexDirection: 'column',
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
    maxHeight: 350,
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
