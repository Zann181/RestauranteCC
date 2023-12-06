import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer  } from "@react-navigation/native";


import Ordenes from "../Pantallas/Ordenes";
import OrdenCrear from "../Pantallas/OrdenCrear";
import OrdenCurso from "../Pantallas/OrdenCurso";
import Login from "../Pantallas/Login";
import Cocina from "../Pantallas/Cocina";
import OrdenActualizar from "../Pantallas/OrdenActualizar";
import Registradora from "../Pantallas/Registradora";
import FacturaCrear from "../Pantallas/FacturaCrear";
import Admin from "../Pantallas/Admin";
import Cocinasincontacto from "../Pantallas/Cocinasincontacto";
import Logout from "./logout";

const HomeStack =createNativeStackNavigator();

function MyStack(){
    return(
        <HomeStack.Navigator
        initialRouteName="Admin"       
    >   
            
            <HomeStack.Screen name="Admin"     component={Admin}   options={{ headerShown: false }} />
            <HomeStack.Screen name="Login"         component={Login}       options={{ headerShown: false }} />
            <HomeStack.Screen name="Ordenes"        component={Ordenes}      options={{ headerShown: false }} />
            <HomeStack.Screen name="OrdenCrear"     component={OrdenCrear}   options={{ headerShown: false }} />
            <HomeStack.Screen name="OrdenCurso"     component={OrdenCurso}   options={{ headerShown: false }} />
            <HomeStack.Screen name="OrdenActualizar"     component={OrdenActualizar}   options={{ headerShown: false }} />
            <HomeStack.Screen name="Cocina"     component={Cocina}   options={{ headerShown: false }} />
            <HomeStack.Screen name="Cocinasincontacto"     component={Cocinasincontacto}   options={{ headerShown: false }} />            
            <HomeStack.Screen name="Registradora"     component={Registradora}   options={{ headerShown: false }} />
            <HomeStack.Screen name="FacturaCrear"     component={FacturaCrear}   options={{ headerShown: false }} />
            <HomeStack.Screen name="Logout"     component={Logout}   options={{ headerShown: false }} />
           
         </HomeStack.Navigator>
    );
}





export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    );
}