import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const OrdenCurso = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders');
      const groupedOrders = groupBy(response.data, 'table.id');
      setOrders(groupedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      const keys = key.split('.');
      let value = currentValue;
      keys.forEach((k) => {
        value = value[k];
      });
      (result[value] = result[value] || []).push(currentValue);
      return result;
    }, {});
  };

  const handlePress = (tableId) => {
    navigation.navigate('OrdenActualizar', { orders: orders[tableId] });
  };

  return (
    <View>
      <FlatList
        data={Object.keys(orders)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text>Mesa Numero: {item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default OrdenCurso;
