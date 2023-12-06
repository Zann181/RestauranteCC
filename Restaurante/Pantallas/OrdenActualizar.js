import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const OrdenActualizar = ({ route, navigation }) => {
  const { orders } = route.params;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedData, setUpdatedData] = useState('');
  const [updatedOrderConfirmation, setUpdatedOrderConfirmation] = useState('');
  const [updatedIdProduct, setUpdatedIdProduct] = useState('');
  const [updatedUnits, setUpdatedUnits] = useState('');
  const [updatedTable, setUpdatedTable] = useState('');

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setUpdatedData(order.data);
    setUpdatedOrderConfirmation(order.order_confirmation);
    setUpdatedIdProduct(order.id_product);
    setUpdatedUnits(order.units);
    setUpdatedTable(order.table);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/orders/${selectedOrder.id}`, {
        data: updatedData,
        order_confirmation: updatedOrderConfirmation,
        id_product: updatedIdProduct,
        units: updatedUnits,
        table: updatedTable,
      });
      Alert.alert('Order updated successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to update order');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/orders/${selectedOrder.id}`);
      Alert.alert('Order deleted successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to delete order');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {orders.map((order) => (
          <Button key={order.id} title={`Order ${order.id}`} onPress={() => handleSelectOrder(order)} color="#CC6600"  />
        ))}
        {selectedOrder && (
          <View>
            <Text>Selected Order: {selectedOrder.id}</Text>
            <Text>Numero de orden:</Text>
            <TextInput value={updatedOrderConfirmation} onChangeText={setUpdatedOrderConfirmation} placeholder="Order Confirmation" />
            <Text>ID del producto:</Text>
            <TextInput value={updatedIdProduct} onChangeText={setUpdatedIdProduct} placeholder="Product ID" />
            <Text>Unidades:</Text>
            <TextInput value={updatedUnits} onChangeText={setUpdatedUnits} placeholder="Units" />
            <Text>Mesa:</Text>
            <TextInput value={updatedTable.id} onChangeText={value => setUpdatedTable({...updatedTable, id: value})} placeholder="Table ID" />
            <Text>Mesero:</Text>
            <TextInput value={updatedData} onChangeText={setUpdatedData} placeholder="Data" />
            <Button title="Update Order" onPress={handleUpdate} color='#CC6600'/>
            <Button title="Delete Order" onPress={handleDelete} color="#CC6600" />
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Button title="Volver" onPress={() => navigation.goBack()} color="#CC6600" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  footer: {
    marginBottom: 10,
  },
});

export default OrdenActualizar;
