import { View, StyleSheet, Text} from 'react-native';
import Mapa from '../../../components/mapa/mapa';


export default function Rota() {

  return (
    <View style={styles.container}>
      <Mapa/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

