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
import Experiences from './Experiences';
import Services from './Services';
import Testimonials from './Testimonials';
import ComponentMenu from '../components/ComponentMenu';
import Profile from './Profile';
import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import axios from 'axios'
import Products from './Products';
import Portfolio from './Portfolio';

const Drawer = createDrawerNavigator();

const Menu = ({modules, firstNameUser, firstLastNameUser, avatarUser}) => {
    const { themeTextStyle, themeColorIcons, themeContainerStyle } = DetectarTema();
    const modulesViews = {
        "Education": Education,
        "Skills": Skills,
        "Experiences": Experiences,
        "Services": Services,
        "Products": Products,
        "Portfolio": Portfolio,
        "Testimonials": Testimonials,
    }
    const iconsMenu = {
        "Education": <FontAwesome5 name="graduation-cap" size={24} color={themeColorIcons} />,
        "Skills": <FontAwesome name="hand-scissors-o" size={24} color={themeColorIcons} />,
        "Experiences": <Entypo name="briefcase" size={24} color={themeColorIcons} />,
        "Services": <FontAwesome5 name="building" size={24} color={themeColorIcons} />,
        "Products": <FontAwesome5 name="building" size={24} color={themeColorIcons} />,
        "Portfolio": <Entypo name="briefcase" size={24} color={themeColorIcons} />,
        "Testimonials": <Fontisto name="persons" size={24} color={themeColorIcons} />,
    }
    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={props => <ComponentMenu {...props}
                firstNameUser={firstNameUser}
                firstLastNameUser={firstLastNameUser}
                avatarUser={avatarUser}
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

            {modules.map(moduleState =>  (
                <Drawer.Screen
                name={moduleState}
                component={modulesViews[moduleState]}
                key={moduleState}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (iconsMenu[moduleState]),
                }}
            />
            ))}

            <Drawer.Screen 
                name='Perfil'
                component={Profile}
                options={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: themeTextStyle.color,
                    headerStyle: {
                        backgroundColor: themeContainerStyle.backgroundColor
                    },
                    drawerIcon: () => (<Fontisto name="person" size={24} color={themeColorIcons} />)
                }}
            />
        </Drawer.Navigator>
    )
}


const Home = () => {
    const { setLogueado } = useLogin();
    const [modules, setModules] = useState([]);
    const [firstNameUser, setFirstNameUser] = useState('');
    const [firstLastNameUser, setFirstLastNameUser] = useState('');
    const [avatarUser, setAvatarUser] = useState('');
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules');
                setModules(response.data.modules);
                setFirstNameUser(response.data.user.first_name);
                setFirstLastNameUser(response.data.user.first_last_name);
                setAvatarUser(response.data.user.avatar);

            } catch (error) {
                console.log(error.response.data.status);
            }
        }
        getData();
    }, [])
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
        <Menu 
            modules={modules}
            firstNameUser={firstNameUser}
            firstLastNameUser={firstLastNameUser}
            avatarUser={avatarUser}
        />
    )
}

export default Home