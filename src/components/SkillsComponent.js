import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import { Card } from 'react-native-paper'
import DetectarTema from '../helpers/DetectarTema'
import Theme from '../Theme/Theme'
import ModalSkills from './ModalSkills'
import Skill from './Skill'
import axios from 'axios'
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SkillsComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const { themeCards, themeCardsText } = DetectarTema();
    const [listCategories, setListCategories] = useState([])
    const [listSkills, setListSkills] = useState([])
    const [skill, setSkill] = useState({});
    const { setLogueado } = useLogin();

    /** GET SKILLS **/
    const getSkills = async () => {
        try {
            const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/skills');
            setListSkills(response.data.skills);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getSkills()
    }, [])

    useEffect(() => {
        getSkills();
    }, [listSkills])

    /** GET CATEGORIES **/
    const getCategories = async () => {
        try {
            const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/skills/categories');
            setListCategories(response.data.categories);
        } catch (error) {
            if (error.reponse.data.status == 401) {
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
            } else {
                Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok', onPress: () => setShowModal(false) }])
            }
        }
    }

    /** GET SKILL **/
    const getSkill = async (id) => {
        setShowModal(true);
        try {
            const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/skills/${id}`);
            setSkill(response.data.skill);
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
                Alert.alert('¡Habilidad no encontrada!', error.response.data.errors.id, [{ text: 'Ok' }])
            } else {
                Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intente más tarde', [{ text: '' }]);
            }
        }
    }

    const deleteSkill = (id) => {
        Alert.alert('¿Deseas eliminar esta habilidad?', 'Una vez eliminado no se podrá recuperar', [{ text: 'Cancelar', style: 'cancel' }, {
            text: 'Si, eliminar', onPress: async () => {
                try {
                    await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/skills', { data: { id: parseInt(id) } })
                    Alert.alert('¡Habilidad Eliminada!', 'La Habilidad se ha eliminado correctamente', [{ text: 'Ok' }]);
                    const skillsUpdated = listSkills.filter(skillsState => skillsState.id !== id);
                    setListSkills(skillsUpdated);
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
                        Alert.alert('Habilidad no encontrada', 'Lo sentimos, la habilidad no fue encontrada', [{ text: 'Ok' }])
                    } else {
                        Alert.alert('Lo sentimos', 'Hubo un error, por favor, intentelo más tarde', [{ text: 'Ok' }])
                    }
                }

            }
        }
        ])
    }

    return (
        <Card style={[Theme.styles.mh20, Theme.styles.mv20, Theme.styles.bordeRedondo1, themeCards, Theme.styles.pv10]} elevation={5}>
            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.mb10]}>
                <View style={[Theme.styles.flex1, Theme.styles.mh10]}>
                    <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10, themeCardsText]}>Mis habilidades</Text>
                    <Text style={[{ flexWrap: 'wrap' }, themeCardsText]}>
                        En esta sección podrás agregar tus habilidades con sus respectiva categoría. Cantidad máxima son 5.
                    </Text>
                </View>
                <View style={[Theme.styles.mh10, Theme.styles.mv20]}>
                    <Pressable style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.mv10, Theme.styles.mh30, Theme.styles.bold]}>+ Crear</Text>
                    </Pressable>
                </View>
            </View>
            {listSkills.map(skills => (
                <Skill
                    key={skills.id}
                    skills={skills}
                    getSkill={getSkill}
                    deleteSkill={deleteSkill}
                />
            ))}
            <ModalSkills
                showModal={showModal}
                setShowModal={setShowModal}
                getCategories={getCategories}
                listCategories={listCategories}
                listSkills={listSkills}
                setListSkills={setListSkills}
                skill={skill}
                setSkill={setSkill}
            />
        </Card>
    )
}

export default SkillsComponent