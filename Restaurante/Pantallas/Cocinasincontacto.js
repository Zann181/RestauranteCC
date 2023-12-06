import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text , FlatList, Button} from 'react-native';

const Cocinasincontacto = () => {
  const [orders, setOrders] = useState([]);
  const [orderConfirmation, setOrderConfirmation] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/orders')
      .then((response) => {
        setOrders(response.data.sort((a, b) => a.id - b.id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 30, marginBottom: 40 }}>Ordenes pendientes</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', padding: 10 }}>
            <Text>ID de orden: {item.id}</Text>
            <Text>Número de orden: {item.N_order}</Text>
            <Text>Usuario: {item.id_user}</Text>
            <Text>Producto: {item.id_product}</Text>
            <Text>Unidades: {item.units}</Text>
            <Text>Mesa: {item.id_table}</Text>
            <Button title="Confirmar" onPress={() => confirmOrder(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

/* 
Funcion para confirmar las ordenes con el envio de la placa
const confirmOrder = (orderId) => {
  axios.put('https://api.example.com/orders/' + orderId, {
    order_confirmation: orderConfirmation,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
*/
export default Cocinasincontacto;
