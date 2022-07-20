import React, { useEffect, useState } from 'react'
import { Text, View, Pressable, Switch, ScrollView, Alert } from 'react-native'
import DetectarTema from '../helpers/DetectarTema'
import Theme from '../Theme/Theme';
import CategoriesPortfolio from '../components/Portfolio/CategoriesPortfolio';
import Projects from '../components/Portfolio/Projects';
import axios from 'axios';
import { Logout } from '../helpers/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';

const Portfolio = () => {
    const { themeContainerStyle, themeCardsText } = DetectarTema();
    const [listCategories, setListCategories] = useState([]);
    const [listProjects, setListProjects] = useState([]);
    const { setLogueado } = useLogin();
    const [switchVisible, setSwitchVisible] = useState(false);
    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        const url1 = 'http://dev.creativolab.com.mx/api/v1/modules/projects/categories';
        const url2 = 'http://dev.creativolab.com.mx/api/v1/modules/projects';
        const categoriesPromise = axios.get(url1);
        const projectsPromise = axios.get(url2);
        try {
            const response = await Promise.all([categoriesPromise, projectsPromise]);
            if (response[0].data.status === 200 && response[1].data.status == 200) {
                setListCategories(response[0].data.categories);
                setListProjects(response[1].data.projects)
                response[1].data.module_status === 1 ? setSwitchVisible(true) : setSwitchVisible(false);
            }
        } catch (error) {
            if (error.response.data.status == 401) {
                Alert.alert(
                    'No Autenticado',
                    'Parece que no estás autenticado, por favor, inicia sesión',
                    [{
                        text: 'Iniciar Sesión',
                        onPress: () => {
                            setLogueado(false);
                            AsyncStorage.clear();
                        }
                    }]
                )
            } else if (error.response.data.status == 403) {
                Alert.alert('¡Hubo un error!', error.response.data.message, [{
                    text: 'Ok', onPress: () => {
                        setLogueado(false);
                        Logout();
                    }
                }]);
            }
        }
    }

    const moduleEnable = async () => {
        try {
            const enable = { projects_enabled: !switchVisible }
            const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/projects/toggle', enable);
            if (response.data.status == 200) {
                Alert.alert('Cambio Exitoso', response.data.message, [{ text: 'Ok' }]);
                setSwitchVisible(!switchVisible);
            }
        } catch (error) {
            if (error.response.data.status == 401) {
                Alert.alert(
                  'No Autenticado',
                  'Parece que no estás autenticado, por favor, inicia sesión',
                  [{
                    text: 'Iniciar Sesión',
                    onPress: () => {
                      setLogueado(false);
                      AsyncStorage.clear();
                    }
                  }])
              } else if (error.response.data.status == 403) {
                Alert.alert('¡Hubo un error!', error.response.data.message, [{ text: 'Ok' }]);
              }
        }
    }
    return (
        <View style={[themeContainerStyle, Theme.styles.flex1]}>
            <View style={[Theme.styles.mh20, Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween]}>
                <Text style={[Theme.styles.fs20, themeCardsText, Theme.styles.bold]}>Portfolio</Text>
                <Switch
                    value={switchVisible}
                    onValueChange={moduleEnable}
                    color={Theme.colors.azul}
                    trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
                />
            </View>
            <ScrollView style={Theme.styles.mv20}>
                <CategoriesPortfolio
                    listCategories={listCategories}
                    setListCategories={setListCategories}
                    getAllData={getAllData}
                />
                <Projects
                    listProjects={listProjects}
                    setListProjects={setListProjects}
                    getAllData={getAllData}
                    listCategories={listCategories}
                />
            </ScrollView>
        </View>
    )
}

export default Portfolio;
