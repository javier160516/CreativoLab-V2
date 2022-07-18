import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import { Card } from 'react-native-paper'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import { FontAwesome } from '@expo/vector-icons';
import ModalSkillsCategories from './ModalSkillsCategories'
import Category from './Category'
import axios from 'axios'
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CategoriesComponent = ({ listCategories, setListCategories, categorySelected, setCategorySelected, getCategories, getSkills }) => {
    const [showModal, setShowModal] = useState(false);
    const { themeCards, themeCardsText } = DetectarTema();
    const { setLogueado } = useLogin();
    
    //GET CATEGORY
    const getCategory = async (id) => {
        setShowModal(true);
        try {
            const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/skills/categories/${id}`);
            if(response.data.status == 200){
                setCategorySelected(response.data.category);
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
                Alert.alert('¡Categoría no encontrada!', 'Lo sentimos, la categoría no está disponible', [{ text: 'Ok', onPress: () => setShowModal(false) }]);
            }
        }
    }

    // DELETE CATEGORY
    const deleteCategory = async (id) => {
        Alert.alert('¿Deseas eliminar esta categoría?', 'Si eliminas esta categoría no se podrá recuperar', [{ text: 'No', style: 'cancel' }, {
            text: 'Si, Eliminar', onPress: async () => {
                try {
                    const response = await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/skills/categories', 
                                                        { data: { id: parseInt(id) } });
                    if(response.data.status == 200){
                        Alert.alert('¡Categoria Eliminada!', 'La categoria se ha eliminado correctamente', [{ text: 'Ok' }]);
                        getCategories();
                        getSkills();
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
                        Alert.alert('Estudio no encontrado', 'Lo sentimos, el estudio no fue encontrado', [{ text: 'Ok' }])
                    } else {
                        Alert.alert('Lo sentimos', 'Hubo un error, por favor, intentelo más tarde', [{text: 'Ok'}])
                    }
                }
            }
        }])

    }

    return (
        <Card style={[Theme.styles.mh20, Theme.styles.mv20, Theme.styles.bordeRedondo1, themeCards, Theme.styles.pt10, Theme.styles.pb20]} elevation={5}>
            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.mb10]}>
                <View style={[Theme.styles.flex1, Theme.styles.mh10]}>
                    <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10, themeCardsText]}>Mis Categorías</Text>
                    <Text style={[{ flexWrap: 'wrap' }, themeCardsText]}>
                        Esta sección permite la creación de categorías con el fin de clasificar tus habilidades. Cantidad máxima son 5.
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
            {listCategories.map(categories => (
                <Category
                    key={categories.id}
                    categories={categories}
                    getCategory={getCategory}
                    deleteCategory={deleteCategory}
                />
            ))}
            <ModalSkillsCategories
                showModal={showModal}
                setShowModal={setShowModal}
                listCategories={listCategories}
                setListCategories={setListCategories}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                getCategories={getCategories}
            />
        </Card>
    )
}

export default CategoriesComponent