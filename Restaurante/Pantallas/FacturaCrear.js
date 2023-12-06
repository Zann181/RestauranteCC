import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const FacturaCrear = ({ route, navigation }) => {
  const { orders } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductName = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.name : 'Product not found';
  };

  const getProductPrice = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? Number(product.price) : 0;
  };

  const getTotal = () => {
    let total = 0;
    orders.forEach(order => {
      const price = getProductPrice(order.id_product);
      const units = Number(order.units);
      if (!isNaN(price) && !isNaN(units)) {
        total += price * units;
      }
    });
    return total;
  };

  const handlePagar = async () => {
    try {
      // Crear un nuevo array de órdenes con los datos en el orden deseado
      const newOrders = orders.map(order => {
        return {
          product: getProductName(order.id_product),
          units: order.units,
          price: getProductPrice(order.id_product),
          waiter_id: order.waiter_id,
          id_table: order.id_table,
          total_order: order.units*price,
        };
      });
  
      
      const response = await axios.post('http://127.0.0.1:8000/api/cash-registers', { newOrders });
  
      
      orders.forEach(async (order) => {
        await axios.delete(`http://127.0.0.1:8000/api/orders/${order.id}`);
      });
  
      setOrders([]);
  
      navigation.navigate('Registradora');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>Order ID: {item.id}</Text>
            <Text style={styles.cell}>Product: {getProductName(item.id_product)}</Text>
            <Text style={styles.cell}>Units: {item.units}</Text>
            <Text style={styles.cell}>Price: {getProductPrice(item.id_product)}</Text>
            <Text style={styles.cell}>Waiter ID: {item.waiter_id}</Text>
            
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.total}>Total: {getTotal()}</Text>
      
      
      
      <View style={styles.footer}>
      <Text style={styles.total}>Total: {getTotal()}</Text>
      <Button title="Pagar" onPress={handlePagar} color="#CC6600" />
        <Button title="Volver" onPress={() => navigation.navigate('Registradora')} color="#CC6600" />
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
    marginBottom: 10,
  },
  cell: {
    flex: 1,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    
  },
});

export default FacturaCrear;
