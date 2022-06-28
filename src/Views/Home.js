import React, { useEffect } from 'react'
import { Text, BackHandler, Alert } from 'react-native'
import { useLogin } from '../context/LoginProvider';
import { Logout } from '../helpers/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

//Screen
import Education from './Education';
import Dashboard from './Dashboard';
import Skills from './Skills';
import Experience from './Experience';
import Services from './Services';
import Tesmonials from './Tesmonials';
import ComponentMenu from '../components/ComponentMenu';


const Drawer = createDrawerNavigator();

const Menu = () => {
    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={props => <ComponentMenu {...props}/>}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Educacion" component={Education} />
            <Drawer.Screen name="Habilidades" component={Skills} />
            <Drawer.Screen name="Experiencia" component={Experience} />
            <Drawer.Screen name="Servicio" component={Services} />
            <Drawer.Screen name="Testimonios" component={Tesmonials} />
        </Drawer.Navigator>
    )
}


const Home = () => {
    const { setLogueado } = useLogin();
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Cerrar Sesión", "¿Desea cerrar sesión?", [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                {
                    text: "YES",
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
        <Menu />
    )
}

export default Home