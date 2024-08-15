import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Cadastro() {
  const [selectedDays, setSelectedDays] = useState({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
  });

  const [shifts, setShifts] = useState({
    segunda: { ida: '', volta: '' },
    terca: { ida: '', volta: '' },
    quarta: { ida: '', volta: '' },
    quinta: { ida: '', volta: '' },
    sexta: { ida: '', volta: '' },
  });

  const handleDayToggle = (day, value) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: value,
    }));
  };

  const handleShiftChange = (day, type, value) => {
    setShifts((prevShifts) => ({
      ...prevShifts,
      [day]: {
        ...prevShifts[day],
        [type]: value,
      },
    }));
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Passageiro</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.input}
          placeholder="Nome do passageiro"
          placeholderTextColor="#308DBF"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#308DBF"
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#308DBF"
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#308DBF"
        />
        <TextInput
          style={styles.input}
          placeholder="Rua"
          placeholderTextColor="#308DBF"
        />
        <TextInput
          style={styles.input}
          placeholder="Número da casa"
          placeholderTextColor="#308DBF"
        />

        <View style={styles.checkboxContainer}>
          {Object.keys(selectedDays).map((day) => (
            <View key={day} style={styles.dayContainer}>
              <Switch
                value={selectedDays[day]}
                onValueChange={(newValue) => handleDayToggle(day, newValue)}
              />
              <Text style={styles.checkboxLabel}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
              {selectedDays[day] && (
                <View style={styles.pickerContainer}>
                  <View style={styles.pickerWrapper}>
                    <Text style={styles.pickerLabel}>Ida:</Text>
                    <Picker
                      selectedValue={shifts[day].ida}
                      style={styles.picker}
                      onValueChange={(value) => handleShiftChange(day, 'ida', value)}
                    >
                      <Picker.Item label="Manhã" value="manhã" />
                      <Picker.Item label="Tarde" value="tarde" />
                      <Picker.Item label="Noite" value="noite" />
                    </Picker>
                  </View>
                  <View style={styles.pickerWrapper}>
                    <Text style={styles.pickerLabel}>Volta:</Text>
                    <Picker
                      selectedValue={shifts[day].volta}
                      style={styles.picker}
                      onValueChange={(value) => handleShiftChange(day, 'volta', value)}
                    >
                      <Picker.Item label="Manhã" value="manhã" />
                      <Picker.Item label="Tarde" value="tarde" />
                      <Picker.Item label="Noite" value="noite" />
                    </Picker>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Passageiro cadastrado com sucesso')}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
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
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  checkboxContainer: {
    marginTop: 20,
    width: '100%',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 18,
    color: '#308DBF',
    marginLeft: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  pickerWrapper: {
    flex: 1,
    marginRight: 5,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#308DBF',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
