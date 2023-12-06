import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Cocina = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [servedOrders, setServedOrders] = useState([]);
  const [apiData, setApiData] = useState('nan'); 

  useEffect(() => {
    fetchOrders();
    fetchProducts();

   /* const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/microservicio');
        setApiData(response.data); 
      } catch (error) {
        console.error(error);
        setApiData('nan');
      }
    }; 

    fetchData()

    const intervalId = setInterval(fetchData, 60000); 
    return () => clearInterval(intervalId);*/
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = (orderId) => {
    setServedOrders([...servedOrders, orderId]);
    Alert.alert(`Order ${orderId} served!`);
  };

  const getProductName = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.name : 'Product not found';
  };

  return (
    <View style={styles.container}>
      {orders.filter(order => !servedOrders.includes(order.id)).map((order) => (
        <View key={order.id} style={styles.row}>
          <Text style={styles.cell}>Order ID: {order.id}</Text>
          <Text style={styles.cell}>Product: {getProductName(order.id_product)}</Text>
          <Text style={styles.cell}>Units: {order.units}</Text>
          <Button title="OK" color="#CC6600" onPress={() => handleOk(order.id)} />
          <Button 
      title= "Ordenes en curso" 
      onPress={()=>navigation.navigate('Logout')}
      color="#000000" 
      />
        </View>
      ))}

      <View style={styles.apiDataButton}>
        <Button title={apiData} color="#CC6600" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
  },
  apiDataButton: { 
    position: 'absolute',
    color: '#CC6600',
    left: 10,
    bottom: 10,
  },
});

export default Cocina;
