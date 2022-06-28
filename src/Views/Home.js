import React, { useEffect } from 'react'
import { Text, BackHandler, Alert } from 'react-native'
import { useLogin } from '../context/LoginProvider';
import { Logout } from '../helpers/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    const {setLogueado} = useLogin();
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Cerrar Sesión", "¿Desea cerrar sesión?", [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                { text: "YES", 
                    onPress: () => {
                        Logout()
                        AsyncStorage.clear();
                        setLogueado(false)
                    }
                }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);
    return (
        <Text>Desde Home</Text>
    )
}

export default Home