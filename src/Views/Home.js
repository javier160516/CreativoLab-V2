import React, { useEffect } from 'react'
import { BackHandler, Alert } from 'react-native'
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
import Portfolio from './Portfolio';

import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import { color } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

const Menu = () => {
    const { themeTextStyle, themeColorIcons, themeContainerStyle, themeDrawerNavigatorText } = DetectarTema();

    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={props => <ComponentMenu {...props} />}
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
            <Drawer.Screen
                name="Servicio"
                component={Services}
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
            <Drawer.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<AntDesign name="folderopen" size={24} color={themeColorIcons} />)
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