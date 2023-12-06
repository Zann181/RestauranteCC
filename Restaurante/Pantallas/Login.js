import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/api/login', {
          email: email,
          password: password,
        })
          .then((response) => {
            Alert.alert('Bienvenido', 'Inicio de sesión correcto.');
            const token = response.data.token;
            AsyncStorage.setItem('token', token)
              .then(() => {
                // Obtén el role_id del usuario
                axios.get('http://127.0.0.1:8000/api/user')
                  .then((response) => {
                    // Filtra para obtener solo el usuario con el correo electrónico ingresado
                    const user = response.data.find(user => user.email === email);
                    const role_id = user.role_id;
                    const user_id = user.id; // <-- Guardar el user_id en el almacenamiento asincrónico
                    AsyncStorage.setItem('user_id', user_id);
      
                    // Navega a diferentes pantallas según el role_id
                    switch (role_id) {
                      case 1:
                        navigation.navigate('Admin'); // admin
                        break;
                      case 2:
                        navigation.navigate('Ordenes'); // mesero
                        break;
                      case 3:
                        navigation.navigate('Cocina'); // chef
                        break;
                      case 4:
                        navigation.navigate('Registradora'); // regist
                        break;
                      default:
                        Alert.alert('Error', 'Usuario no encontrado.');
                        break;
                    }
                  })
                  .catch((error) => {
                    Alert.alert(error.message, 'Error al obtener el role_id. Inténtalo de nuevo.');
                  });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              alert('Contraseña incorrecta. Inténtalo de nuevo.');
              navigation.navigate('Login');
            } else {
              Alert.alert(error.message, 'Error al iniciar sesión. Inténtalo de nuevo.');
              navigation.navigate('Login');
            }
          });
      };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, marginBottom: 40 }}>Iniciar sesión</Text>
            <TextInput
                style={styles.inputs}
                placeholder="Correo electrónico"
                onChangeText={(text) => setEmail(text)}
                value={email} 
            />
            <TextInput
                style={styles.inputs}
                placeholder="Contraseña"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                value={password} 
            />
            <Button title="Iniciar sesión" onPress={handleLogin} color="#000000" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CC6600'
    },
    inputs: {
        backgroundColor: '#fff',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000',
        width: 200,
        height: 40,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    }
});
