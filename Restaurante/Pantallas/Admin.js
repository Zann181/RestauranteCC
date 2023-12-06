import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ordenes from "./Ordenes";
import Cocina from "./Cocina";
import Registradora from "./Registradora";
const Tab =createBottomTabNavigator();
function Admin(){

    return(
        <Tab.Navigator
        
        screenOptions={{
            headerStyle: {
                backgroundColor: '#CC6600', 
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
           
            <Tab.Screen name ="Ordenes" component={Ordenes} />            
            <Tab.Screen name ="Cocina" component={Cocina} />
            <Tab.Screen name ="Registradora" component={Registradora} />
           
        </Tab.Navigator>
    );
}
export default Admin;