import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';


export default function Config() {
    return (
        <View>
          <View style={styles.cabecalho}>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Alterar informações pessoais</Text>
            </TouchableOpacity>
            <Link href='/login/login' asChild>
                <TouchableOpacity style={styles.btnQuit} onPress={()=>{}}>
                    <Text style={styles.btnTextQuit}>Sair</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles=StyleSheet.create({
    cabecalho: {
        backgroundColor: '#308DBF',
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    btn: {
        height: 50,
        width: 360,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        color: '#308DBF',
        borderRadius: 10,
        borderColor: '#308DBF',
      },
    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#308DBF',
        textAlign: 'center',
    },
    btnQuit: {
        height: 50,
        width: 360,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        color: '#308DBF',
        borderRadius: 10,
        borderColor: 'red',
      },
    btnTextQuit: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'red',
        textAlign: 'center',
    },
})