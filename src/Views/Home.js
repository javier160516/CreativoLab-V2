import React, { useEffect, useState } from 'react'
import { BackHandler, Alert, Text } from 'react-native'
import { useLogin } from '../context/LoginProvider';
import { Logout } from '../helpers/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
//Screen
import Education from './Education';
import Dashboard from './Dashboard';
import Skills from './Skills';
import Experience from './Experience';
import Services from './Services';
import Testimonials from './Testimonials';
import ComponentMenu from '../components/ComponentMenu';

import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import axios from 'axios'
import Products from './Products';
import Portfolio from './Portfolio';

const Drawer = createDrawerNavigator();

const Menu = () => {
    const { themeTextStyle, themeColorIcons, themeContainerStyle, themeDrawerNavigatorText } = DetectarTema();
    const [modules, setModules] = useState([]);
    const [firstNameUser, setFirstNameUser] = useState('');
    const [middleNameUser, setMiddleNameUser] = useState('');
    const [firstLastNameUser, setFirstLastNameUser] = useState('');
    const [secondLastNameUser, setSecondLastNameUser] = useState('');


    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('http://dev.creativolab.com.mx/api/v1/dashboard');
                setModules(response.data.modules);
                setFirstNameUser(response.data.user.first_name);
                setMiddleNameUser(response.data.user.middle_name);
                setFirstLastNameUser(response.data.user.first_last_name);
                setSecondLastNameUser(response.data.user.second_last_name);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos();
    }, [])
    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={props => <ComponentMenu {...props}
                firstNameUser={firstNameUser}
                firstLastNameUser={firstLastNameUser}
            />}
            screenOptions={{
                headerTitleAlign: 'center',
                drawerActiveBackgroundColor: Theme.colors.azul,
                drawerActiveTintColor: Theme.colors.blanco,
                drawerInactiveTintColor: themeColorIcons,
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<AntDesign name="dashboard" size={24} color={themeColorIcons} />),
                }}
            />
            <Drawer.Screen
                name="Estudios"
                component={Education}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<FontAwesome5 name="graduation-cap" size={24} color={themeColorIcons} />),
                }}
            />
            <Drawer.Screen
                name="Habilidades"
                component={Skills}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<FontAwesome name="hand-scissors-o" size={24} color={themeColorIcons} />),
                }}
                
            />
            <Drawer.Screen
                name="Experiencia Laboral"
                component={Experience}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<Entypo name="briefcase" size={24} color={themeColorIcons} />)
                }}
            />
            {modules.map(module => module === 'services' ? (
                <Drawer.Screen
                    name="Servicio"
                    component={Services}
                    key={module}
                    options={{
                        headerMode: 'screen',
                        headerTitleAlign: 'center',
                        headerTintColor: themeTextStyle.color,
                        headerStyle: {
                            backgroundColor: themeContainerStyle.backgroundColor
                        },
                        drawerIcon: () => (<FontAwesome5 name="building" size={24} color={themeColorIcons} />)
                    }}
                />
            ) : null)}
            {modules.map(module => module === 'products' ? (

                <Drawer.Screen
                    name="Productos"
                    component={Products}
                    key={module}
                    options={{
                        headerMode: 'screen',
                        headerTitleAlign: 'center',
                        headerTintColor: themeTextStyle.color,
                        headerStyle: {
                            backgroundColor: themeContainerStyle.backgroundColor
                        },
                        drawerIcon: () => (<FontAwesome5 name="building" size={24} color={themeColorIcons} />)
                    }}
                />
            ) : null)}
            {modules.map(module => module === 'portfolio' ? (

                <Drawer.Screen
                    name="Portafolio"
                    component={Portfolio}
                    key={module}
                    options={{
                        headerMode: 'screen',
                        headerTitleAlign: 'center',
                        headerTintColor: themeTextStyle.color,
                        headerStyle: {
                            backgroundColor: themeContainerStyle.backgroundColor
                        },
                        drawerIcon: () => (<FontAwesome5 name="building" size={24} color={themeColorIcons} />)
                    }}
                />
            ) : null)}


            <Drawer.Screen
                name="Testimonios"
                component={Testimonials}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<Fontisto name="persons" size={24} color={themeColorIcons} />)
                }}
            />
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