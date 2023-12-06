import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';


const STR = ({ navigation }) => {
  const [rgb, setRgb] = useState({ red: 0, green: 0, blue: 0 });
  const [temperature, setTemperature] = useState('');
  const [buttonStatus, setButtonStatus] = useState(false);

  const sendRgbData = async () => {
    // Envía los datos RGB al servidor
    try {
      const response = await fetch('http://192.168.0.1/setRGB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rgb),
      });
      const data = await response.json();
      // Actualiza el estado del botón según la respuesta
      setButtonStatus(data.status === 'GREEN');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTemperature = async () => {
    // Obtiene la temperatura del servidor
    try {
      const response = await fetch('http://192.168.0.1/get_temperature');
      const data = await response.json();
      setTemperature(data.temperature);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTemperature();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Red"
        onChangeText={(text) => setRgb({ ...rgb, red: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Green"
        onChangeText={(text) => setRgb({ ...rgb, green: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Blue"
        onChangeText={(text) => setRgb({ ...rgb, blue: text })}
        keyboardType="numeric"
      />
      <Button title="Send RGB" onPress={sendRgbData} />
      <Text>Temperature: {temperature}°C</Text>
      <Button
        title="Toggle LED"
        color={buttonStatus ? 'green' : 'red'}
        onPress={sendRgbData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 200,
    padding: 10,
  },
});

export default STR;
