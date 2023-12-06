import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const RegistradoraVer = () => {
    const [Registradora, setRegistradora] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cash-registers')
            .then(response => {
                setRegistradora(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const renderOrder = ({ item }) => (
        <View style={styles.order}>
            <Text style={styles.tabletext}>{item.id}</Text>
            <Text style={styles.tabletext}>{item.Base_value}</Text>
            <Text style={styles.tabletext}>{item.Date_day}</Text>
            <Text style={styles.tabletext}>{item.id_bill}</Text>
            <Text style={styles.tabletext}>{item.total_day}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registradora</Text>
            <FlatList
                data={Registradora}
                renderItem={renderOrder}
                keyExtractor={item => item.id}
            />
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

export default RegistradoraVer;
