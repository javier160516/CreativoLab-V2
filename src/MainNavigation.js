import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BienvenidaScreen from './Views/BienvenidaScreen';
import Login from './Views/Login';
import Registro from './Views/Registro';
import { useLogin } from './context/LoginProvider';
import Home from './Views/Home';
import DetectarTema from './helpers/DetectarTema';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const StackNavigator = () => {
    const { themeTextStyle, themeContainerStyle } = DetectarTema();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='BienvenidaScreen'
                component={BienvenidaScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    }
                }}
            />
            <Stack.Screen
                name='Registro'
                component={Registro}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor:
                        themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const MainNavigation = () => {
    const { logueado, setLogueado } = useLogin();
    useEffect(() => {
        const getData = async () => {
            const asyncStorage = await AsyncStorage.getItem('@creativo_lab')
            if(asyncStorage === 'true'){
                setLogueado(asyncStorage)
            }
        }
        getData();
      }, []);
    return logueado ? <Home  /> : <StackNavigator />
}

export default MainNavigation