import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import * as Location from 'expo-location';

export default function Mapa({ enderecos }) {
  const [coordinates, setCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error('Erro ao obter localização:', error.message);
    }
  };

  const fetchCoordinates = async () => {
    try {
      const promises = enderecos.map(async (endereco) => {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}`
          )}&key=${GOOGLE_MAPS_APIKEY}`
        );
        const { location } = response.data.results[0].geometry;
        return { latitude: location.lat, longitude: location.lng };
      });

      const results = await Promise.all(promises);
      setCoordinates(results);
    } catch (error) {
      console.error('Erro ao converter endereços:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentLocation(); // Buscar localização do usuário
  }, []);

  useEffect(() => {
    if (enderecos.length > 0) {
      fetchCoordinates(); // Buscar coordenadas dos endereços
    }
  }, [enderecos]);

  if (loading || !currentLocation) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#308DBF" />
      </View>
    );
  }

  const pontoPartida = currentLocation;
  const destino = coordinates.length > 0 ? coordinates[coordinates.length - 1] : null;
  const paradas = coordinates.slice(0, -1);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          ...pontoPartida,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador de ponto de partida */}
        <Marker title="Partida (Sua Localização)" coordinate={pontoPartida} />
        {/* Marcador de destino */}
        {destino && <Marker title="Destino" coordinate={destino} />}
        {/* Marcadores de paradas */}
        {paradas.map((parada, index) => (
          <Marker key={index} title={`Parada ${index + 1}`} coordinate={parada} />
        ))}
        {/* Direções no mapa */}
        {destino && (
          <MapViewDirections
            origin={pontoPartida}
            waypoints={paradas}
            destination={destino}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#308DBF"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
