import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ordenes from '../Pantallas/Ordenes';
import Cocina from '../Pantallas/Cocina';
import Registradora from '../Pantallas/Registradora';
// Importa el resto de tus pantallas aquí

const Drawer = createDrawerNavigator();

const Menu = () => {
  const [role_id, setRoleId] = useState(null);

  useEffect(() => {
    const fetchRoleId = async () => {
      const id = await AsyncStorage.getItem('role_id');
      setRoleId(id);
    };

    fetchRoleId();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {role_id === '1' && (
          <>
            <Drawer.Screen name="Ordenes" component={Ordenes} />
            <Drawer.Screen name="Cocina" component={Cocina} />
            <Drawer.Screen name="Registradora" component={Registradora} />
          
          </>
        )}
        {role_id === '2' && <Drawer.Screen name="Ordenes" component={Ordenes} />}
        {role_id === '3' && <Drawer.Screen name="Cocina" component={Cocina} />}
        {role_id === '4' && <Drawer.Screen name="Registradora" component={Registradora} />}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Menu;
