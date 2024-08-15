    import React, { useState } from 'react';
    import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Animated, Easing, Pressable, TextInput } from 'react-native';
    import { Link } from 'expo-router';

    export default function HomeMotorista() {
        const [expanded, setExpanded] = useState(false);
        const [fadeAnim] = useState(new Animated.Value(0));
        const [text, onChangeText] = React.useState('Endereço');

        const toggleExpansion = () => {
            setExpanded(!expanded);
            Animated.timing(fadeAnim, {
                toValue: expanded ? 0 : 1,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        };

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#308DBF" />
                <View style={styles.cabecalho}>
                    <Text style={styles.h2}>Bem vindo, Motorista</Text>
                    <Image style={styles.profileImg} source={require('../../../../assets/images/profileDefault.png')} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.h3}>Endereço de partida</Text>
                    <View style={styles.infoContainer}>
                        <TextInput placeholder='Endereço'   onChangeText={onChangeText}
            value={text}></TextInput>
                    </View>
                    <Text style={styles.h3}>Passageiros de Hoje</Text>
                    <View style={styles.seeAllpassagers}>
                        <View style={styles.passengerRow}>
                            <View style={styles.passengerInfo}>
                                <View style={styles.passengerCard}>
                                    <Text style={styles.passengerName}>Aluno 1</Text>
                                    <Text style={styles.passengerAddress}>Endereço do Aluno 1</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={toggleExpansion} style={styles.expandButton}>
                                <Image
                                    style={styles.expandButtonImage}
                                    source={expanded ? require('../../../../assets/images/collapse.png') : require('../../../../assets/images/expand.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <Animated.View style={[styles.passengerList, { opacity: fadeAnim }]}>
                            {expanded && (
                                <View>
                                    <Text style={styles.passengerName}>Aluno 2</Text>
                                    <Text style={styles.passengerAddress}>Endereço do Aluno 2</Text>
                                    <Text style={styles.passengerName}>Aluno 3</Text>
                                    <Text style={styles.passengerAddress}>Endereço do Aluno 3</Text>
                                </View>
                            )}
                        </Animated.View>
                    </View>
                </View>
                <Link href='../../rota/rota' style={styles.btnRota} asChild>
                    <TouchableOpacity>
                        <Image style={{width: 40, height: 40}} source={require('../../../../assets/images/routeBtn.png')} />
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
        },
        cabecalho: {
            backgroundColor: '#308DBF',
            height: 120,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
        },
        edit: {
            position: 'relative',
            alignSelf: 'end',
        },
        h2: {
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
            paddingRight: 20,
        },
        profileImg: {
            width: 50,
            height: 50,
            borderRadius: 50,
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
        info: {
            fontSize: 16,
            marginTop: 10,
        },
        passengerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        passengerInfo: {
            flex: 1,
        },
    
        passengerName: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        passengerAddress: {
            fontSize: 16,
            color: '#555',
            marginBottom: 10,
        },
        expandButton: {
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        expandButtonImage: {
            width: 20,
            height: 13,
        },
        seeAllpassagers: {
            marginTop: 10,
            backgroundColor: '#f9f9f9', 
            borderRadius: 10, 
            padding: 10, 
            borderColor: '#ddd', 
            borderWidth: 1,
        },
        passenger: {
            fontSize: 16,
            marginVertical: 5,
        },
        btnRota: {
            position: 'absolute',
            bottom: 10, 
            left: '50%',
            transform: [{ translateX: -20 }],
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            borderColor: '#308DBF',
        },

        
    });
