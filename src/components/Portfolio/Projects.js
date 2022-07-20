import React, { useState } from 'react'
import { Pressable, Text, View, Image, Linking, Alert } from 'react-native'
import ThemedCard from 'react-native-elements/dist/card/Card'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import ModalPorjects from './ModalProjects'
import Project from './Project'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Logout } from '../../helpers/Logout';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Projects = ({ listProjects, setListProjects, getAllData, listCategories }) => {
    const { themeCards, themeCardsText, themeColorIcons } = DetectarTema();
    const [showProjects, setShowProjects] = useState(false);
    const [projectSelected, setProjectSelected] = useState({});
    const { setLogueado } = useLogin();
    const getProject = async id => {
        setShowProjects(true);
        try {
            const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/projects/${id}`);
            if (response.data.status == 200) {
                setProjectSelected(response.data.project);
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
                Alert.alert('¡Error!', error.response.data.message, [{ text: 'Ok', onPress: () => Logout() }]);
            } else if (error.response.data.status == 404) {
                Alert.alert('¡Error!', error.response.data.errors.id, [{ text: 'Ok' }]);
            }
        }
    }

    const deleteProject = id => {
        Alert.alert('¿Deseas eliminar este proyecto?', 'Una vez eliminado no se podrá recuperar', [{ text: 'Cancelar', style: 'cancel' }, {
            text: 'Si, eliminar', onPress: async () => {
                try {
                    const response = await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/projects', { data: { id: parseInt(id) } })
                    if (response.data.status == 200) {
                        Alert.alert('¡Proyecto Eliminado!', 'El Proyecto ha sido eliminado correctamente', [{ text: 'Ok', onPress: () => getAllData() }]);
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
                    } else if (error.response.data.status == 404) {
                        Alert.alert('Proyecto no encontrado', 'Lo sentimos, el proyecto no fue encontrado', [{ text: 'Ok' }])
                    } else if (error.response.data.status == 403) {
                        Alert.alert('¡Error!', error.response.data.message, [{ text: 'Ok', onPress: () => Logout() }]);
                    } else {
                        Alert.alert('Lo sentimos', 'Hubo un error, por favor, intentelo más tarde', [{ text: 'Ok' }])
                    }
                }

            }
        }
        ])
    }

    return (
        <Card style={[Theme.styles.flex1, themeCards, Theme.styles.justifyCenter, Theme.styles.pv20, Theme.styles.mv20, Theme.styles.mh20]}>
            <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.mh20]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Mis proyectos</Text>
                <Pressable onPress={() => setShowProjects(true)} style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                    <Text style={[Theme.colors.WhiteColor, Theme.styles.bold]}>
                        <AntDesign name="plus" size={15} color="white" />
                        {' '}Agregar
                    </Text>
                </Pressable>
            </View>
            <Text style={[themeCardsText, Theme.styles.mh10, Theme.styles.mv10]}>
                Este módulo es una recopilación de todos los proyectos en los que te has involucrado.
                La cantidad máxima de proyectos son 5.
            </Text>

            {listProjects.map(projects => (
                <Project
                    key={projects.id}
                    projects={projects}
                    getProject={getProject}
                    deleteProject={deleteProject}
                />
            ))}

            <ModalPorjects
                showProjects={showProjects}
                setShowProjects={setShowProjects}
                listCategories={listCategories}
                getAllData={getAllData}
                projectSelected={projectSelected}
            />
        </Card>
    )
}

export default Projects