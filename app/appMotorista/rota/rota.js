import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Mapa from '../../../components/mapa/mapa';
import { Link } from 'expo-router';

export default function Rota({ navigation }) {

  return (
    <View style={styles.container}>
      <Link href="../home/home" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </Link>
     
      
      <View style={styles.mapaContainer}>
        <Mapa />
      </View>
      
      <View style={styles.containerInformacoes}>
        <Text style={styles.title}>Informações da Rota</Text>
        
        <View style={styles.topic}>
          <Text style={styles.topicLabel}>Tempo</Text>
          <Text style={styles.topicValue}>15 min</Text>
        </View>
        
        <View style={styles.topic}>
          <Text style={styles.topicLabel}>Partida</Text>
          <Text style={styles.topicValue}>Rua Fictícia, 123</Text>
        </View>
        
        <View style={styles.topic}>
          <Text style={styles.topicLabel}>Chegada</Text>
          <Text style={styles.topicValue}>Av. Imaginária, 456</Text>
        </View>
        
        <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Iniciando Rota')}>
          <Text style={styles.btntext}>Iniciar</Text>
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
    height: '60%',
    marginTop: 60,
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
  btn: {
    marginTop: 20,
    padding: 15,
    width: 200,
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
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  topic: {
    flexDirection: 'row',
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
});

