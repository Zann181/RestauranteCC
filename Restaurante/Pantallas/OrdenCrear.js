import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Picker, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrdenCrear = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [tableIds, setTableIds] = useState([]);
    const [selectedTableId, setSelectedTableId] = useState();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/product')
            .then(response => {
                const dataWithCount = response.data.map(item => ({ ...item, count: 0 }));
                setProducts(dataWithCount);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://127.0.0.1:8000/api/tables')
            .then(response => {
                setTableIds(response.data);
                setSelectedTableId(response.data[0].id);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    

    const handleOrder = () => {
        const orderedProducts = products.filter(item => item.count > 0);
        setOrder(orderedProducts);
        console.log(orderedProducts);
    
        // Recupera el ID del usuario del almacenamiento asincrónico
        AsyncStorage.getItem('user_id').then((user_id) => {
          const id_user = user_id;
          let N_order = 1;
          let order_confirmation = 0;
    
          const promises = orderedProducts.map(item => {
            const dataToSend = {
                id_user: id_user, // <-- Reemplaza el valor con el ID del usuario recuperado
              N_order: N_order,
              order_confirmation: order_confirmation,
              id_product: item.id,
              units: item.count,
              id_table: selectedTableId,
            };
    
            return axios.post('http://127.0.0.1:8000/api/orders', dataToSend);
          });
    
          Promise.all(promises)
            .then(responses => {
              console.log(responses);
              N_order++;
              alert('Orden creada');
            })
            .catch(errors => {
              console.error(errors);
            });
        });
    };
    
    const handleIncrease = (id) => {
        setProducts(products.map(item => item.id === id ? {...item, count: item.count + 1} : item));
    };

    const handleDecrease = (id) => {
        setProducts(products.map(item => item.id === id ? {...item, count: Math.max(0, item.count - 1)} : item));
    };

    const renderOrder = ({ item }) => (
        <View style={styles.order}>
            <Text style={styles.tabletext}>{item.name}</Text>
            <Text style={styles.tabletext}>{item.price}</Text>
            <Text style={styles.tabletext}>Cantidad: {item.count}</Text>
            <Button title="+" onPress={() => handleIncrease(item.id)} color="#CC6600" />
            <Button title="-" onPress={() => handleDecrease(item.id)} color="#CC6600" />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>productos</Text>
            <Picker
                selectedValue={selectedTableId}
                onValueChange={(itemValue, itemIndex) => setSelectedTableId(itemValue)}
            >
                <Picker.Item label="Seleccionar mesa" value={null} />
                {tableIds.map((item, index) => (
                    <Picker.Item key={index} label={item.id.toString()} value={item.id} />
                ))}
            </Picker>
            <FlatList
                data={products}
                renderItem={renderOrder}
                keyExtractor={item => item.id}
            />
            <Button title="Crear orden" onPress={handleOrder} color="#CC6600" />
            <Button title="Volver" onPress={() => navigation.navigate('ordenes')} color="#CC6600" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    order: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tabletext: {
          fontSize: 14,
    },
});

export default OrdenCrear;
