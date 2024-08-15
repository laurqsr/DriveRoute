import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';

export default function Mapa() {
    const pontoPartida = {
        latitude: -23.550520,
        longitude: -46.633308,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const paradas =[
        { latitude: -23.579416, longitude: -46.647634 },
        { latitude: -23.570684, longitude: -46.655981 }, 
    ]
    const destino = {
        latitude: -23.561684,
        longitude: -46.655981,
    };

    const handleStart = (result) => {
        console.log("Rota Iniciada:", result);
    };

    const handleReady = (result) => {
        const { distance, duration } = result;
        alert("Rota pronta", `Distancia: ${distance} km, Duração: ${duration} minutos`);
    };

    const handleError = (errorMessage) => {
        alert("Erro ao gerar a rota", errorMessage);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={pontoPartida}
                
            >
                <Marker
                    title='Sua rota inicia aqui!'
                    coordinate={pontoPartida}
                />
                <Marker
                    title='Destino final'
                    coordinate={destino}
                />

                {paradas.map((parada, index) => (
                    <Marker
                        key={index}
                        title={`parada ${index + 1}`}
                        coordinate={parada}
                    />
                ))}
                <MapViewDirections
                    origin={pontoPartida}
                    waypoints={paradas}
                    destination={destino}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="#308DBF"
                    onStart={handleStart}
                    onReady={handleReady}
                    onError={handleError}
                />
                 
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
        height: '60%',
    },
});
