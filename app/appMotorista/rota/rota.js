import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Mapa from '../../../components/mapa/mapa';
import { Link } from 'expo-router';
import axios from 'axios';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_APIKEY, DRIVEROUTE_API } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Rota() {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enderecoPartida, setEnderecoPartida] = useState('');
  const [enderecoChegada, setEnderecoChegada] = useState('R. Guilherme Lahm, 1778 - Jardim do Prado, Taquara - RS, 95600-000');
  const [tempoEstimado, setTempoEstimado] = useState('');
  const [motoristaId, setMotoristaId] = useState(null);

  const fetchMotoristaId = async () => {
    try {
      const id = await AsyncStorage.getItem('@motorista_id');
      if (id) {
        setMotoristaId(parseInt(id, 10));
        console.log('ID do motorista:', id);
      } else {
        Alert.alert('Erro', 'ID do motorista não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar o ID do motorista:', error.message);
    }
  };

  const fetchEnderecos = async () => {
    if (!motoristaId) return;

    try {
      setLoading(true);
      console.log(`Buscando endereços para o motorista ID: ${motoristaId}`);
      const response = await axios.get(`${DRIVEROUTE_API}/enderecos/listar`, {
        params: { motoristaId },
      });

      if (response.status === 200) {
        setEnderecos(response.data);
        console.log('Endereços encontrados:', response.data);
      } else {
        setEnderecos([]);
        console.warn('Nenhum endereço encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os endereços.');
      console.error('Erro ao buscar endereços:', error.message);
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
        const fullAddress = response.data.results[0].formatted_address;
        setEnderecoPartida(fullAddress);
        console.log('Endereço de partida atualizado:', fullAddress);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o endereço atual.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
      console.error(error.message);
    }
  };

  const optimizeWaypoints = async (partida, chegada, waypoints) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
          partida
        )}&destination=${encodeURIComponent(chegada)}&waypoints=optimize:true|${encodeURIComponent(
          waypoints.join('|')
        )}&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const optimizedWaypoints = response.data.routes[0].waypoint_order.map((index) => waypoints[index]);
        return optimizedWaypoints;
      } else {
        console.warn('Não foi possível otimizar os waypoints:', response.data);
        return waypoints;
      }
    } catch (error) {
      console.error('Erro ao otimizar waypoints:', error.message);
      return waypoints;
    }
  };

  const calcularTempoEstimado = async () => {
    try {
      if (!enderecoPartida || !enderecoChegada) {
        Alert.alert('Erro', 'Por favor, preencha os endereços de partida e chegada.');
        return;
      }

      const waypoints = enderecos
        .map((endereco) => `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`)
        .filter(Boolean);

      const optimizedWaypoints = await optimizeWaypoints(enderecoPartida, enderecoChegada, waypoints);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
          enderecoPartida
        )}&destination=${encodeURIComponent(enderecoChegada)}&waypoints=${encodeURIComponent(
          optimizedWaypoints.join('|')
        )}&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const duration = response.data.routes[0].legs.reduce((total, leg) => total + leg.duration.value, 0);
        setTempoEstimado(`${Math.round(duration / 60)} min`);
      } else {
        Alert.alert('Erro', 'Não foi possível calcular o tempo estimado.');
        console.warn('Resposta inesperada:', response.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao calcular o tempo estimado.');
      console.error(error.message);
    }
  };

  const iniciarRota = async () => {
    if (!tempoEstimado) {
      Alert.alert('Erro', 'Por favor, atualize a rota antes de iniciar.');
      return;
    }

    const waypoints = enderecos
      .map((endereco) => `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`)
      .filter(Boolean);

    const optimizedWaypoints = await optimizeWaypoints(enderecoPartida, enderecoChegada, waypoints);

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      enderecoPartida
    )}&destination=${encodeURIComponent(enderecoChegada)}&waypoints=${encodeURIComponent(
      optimizedWaypoints.join('|')
    )}&travelmode=driving`;

    Linking.openURL(googleMapsUrl).catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o Google Maps.')
    );
  };

  useEffect(() => {
    fetchMotoristaId();
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (motoristaId) {
      fetchEnderecos();
    }
  }, [motoristaId]);

  return (
    <View style={styles.container}>
      <Link href="../home/home" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </Link>

      <View style={styles.mapaContainer}>
        <Mapa enderecos={enderecos} />
      </View>

      <View style={styles.containerInformacoes}>
        <Text style={styles.title}>Informações da Rota</Text>

        <View style={styles.topic}>
          <Text style={styles.topicLabel}>Tempo Estimado</Text>
          <Text style={styles.topicValue}>{tempoEstimado || 'Clique em Atualizar Rota'}</Text>
        </View>

        <View style={styles.topic}>
          <Text style={styles.topicLabel}>Partida</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço de partida"
            value={enderecoPartida}
            onChangeText={(text) => setEnderecoPartida(text)}
          />
        </View>

        <View style={styles.topic}>
          <Text style={styles.topicLabel}>Chegada</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço de chegada"
            value={enderecoChegada}
            onChangeText={(text) => setEnderecoChegada(text)}
          />
          <TouchableOpacity style={styles.updateBtn} onPress={calcularTempoEstimado}>
            <Text style={styles.updateBtnText}>Atualizar Rota</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={iniciarRota}>
          <Text style={styles.startBtnText}>Iniciar Rota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  mapaContainer: {
    height: '50%',
  },
  containerInformacoes: {
    borderRadius: 30,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    marginTop: -20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  topic: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  topicLabel: {
    fontSize: 16,
    color: '#666',
  },
  topicValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#308DBF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  updateBtn: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#308DBF',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  updateBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  startBtn: {
    padding: 15,
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#308DBF',
    marginTop: 20,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
