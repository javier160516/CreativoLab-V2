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

const Menu = ({modules, firstNameUser, firstLastNameUser, modulesEnable}) => {
    const { themeTextStyle, themeColorIcons, themeContainerStyle } = DetectarTema();
    
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
                initialParams={{enable: modulesEnable.educationEnable}}
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
                // moduleSkills={moduleSkills}
                // initialParams={moduleSkills}
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
                // moduleExperiences={moduleExperiences}
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
                    // moduleServices={moduleServices}
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
                    // moduleProducts={moduleProducts}
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
                    // modulePortfolio={modulePortfolio}
                    key={module}
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
            ) : null)}


            <Drawer.Screen
                name="Testimonios"
                component={Testimonials}
                // moduleTestimonials={moduleTestimonials}
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
    const [modules, setModules] = useState([]);
    const [firstNameUser, setFirstNameUser] = useState('');
    const [middleNameUser, setMiddleNameUser] = useState('');
    const [firstLastNameUser, setFirstLastNameUser] = useState('');
    const [secondLastNameUser, setSecondLastNameUser] = useState('');
    const [modulesEnable, setModulesEnable] = useState({
        educationEnable: 0,
        skillsEnable: 0,
        experiencesEnable: 0,
        productsEnable: 0,
        servicesEnable: 0,
        portfolioEnable: 0,
        testimonialsEnable: 0,
    });
    
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules');
                setModules(response.data.modules);
                setFirstNameUser(response.data.user.first_name);
                setMiddleNameUser(response.data.user.middle_name);
                setFirstLastNameUser(response.data.user.first_last_name);
                setSecondLastNameUser(response.data.user.second_last_name);
                //Modules enabled
                setModulesEnable({educationEnable: response.data.user.is_education_enabled});
                setModulesEnable({skillsEnable: response.data.user.are_skills_enabled});
                setModulesEnable({experiencesEnable: response.data.user.are_experiences_enabled});
                setModulesEnable({productsEnable: response.data.user.are_products_enabled});
                setModulesEnable({servicesEnable: response.data.user.are_services_enabled});
                setModulesEnable({portfolioEnable: response.data.user.is_portfolio_enabled});
                setModulesEnable({testimonialsEnable: response.data.user.are_testimonials_enabled});
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
            modulesEnable={modulesEnable}
        />
    )
}

export default Home