import React, { useState, useEffect } from 'react'
import { Text, View, Modal, TouchableOpacity, Pressable, Alert } from 'react-native'
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema';
import TextInput from './TextInput';

import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalHabilidadesCategoria = ({ showModal, setShowModal, listCategories, setListCategories, categorySelected, setCategorySelected }) => {
    const { themeCards, themeCardsText, themeBorderActiveInput, themeColorIcons, themeBorderOutlineInput, themeBorderSelectionInput } = DetectarTema();
    const [nameCategory, setNameCategory] = useState({ value: '', error: '' });
    const { setLogueado } = useLogin();

    useEffect(() => {
        if (categorySelected?.id) {
            setNameCategory({ value: categorySelected.category, error: '' });
        }
    }, [categorySelected])

    // ADD CATEGORY
    const handleSubmit = async () => {
        const createCategory = {
            category: nameCategory.value,
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (categorySelected.id) {
            createCategory.id = categorySelected.id;
            try {
                await axios.put('http://dev.creativolab.com.mx/api/v1/modules/skills/categories', createCategory, config);
                const categoriesUpdated = listCategories.map(listCategoriesState => listCategoriesState.id === createCategory.id ? createCategory : listCategoriesState);
                setListCategories(categoriesUpdated);
                setCategorySelected({})
                Alert.alert('¡Categoría Editada!', 'La categoría ha sido editada correctamente', [{
                    text: 'Ok', onPress: () => {
                        setNameCategory({ value: '', error: '' });
                        setShowModal(false);
                    }
                }]);
            } catch (error) {
                if (error.response.data.status == 400) {
                    setNameCategory({ ...nameCategory, error: error.response.data.errors.category });
                } else if (error.response.data.status == 401) {
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
                    Alert.alert('Lo sentimos', 'Solo se pueden agregar 5 categorías', [{ text: 'Ok' }])
                } else {
                    Alert.alert('Lo sentimos', 'Hubo un error, por favor, intentelo más tarde', [{ text: 'Ok' }])
                }
            }
        } else {
            try {
                await axios.post('http://dev.creativolab.com.mx/api/v1/modules/skills/categories', createCategory, config);
                Alert.alert('¡Categoría Agregada!', 'La categoría se ha agregado correctamente', [{ text: 'Ok' }]);
                setListCategories([])
                setShowModal(false);
                setNameCategory({ value: '', error: '' });
            } catch (error) {
                if (error.response.data.status == 400) {
                    setNameCategory({ ...nameCategory, error: error.response.data.errors.category });
                } else if (error.response.data.status == 401) {
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
                    Alert.alert('Lo sentimos', 'Solo se pueden agregar 5 categorías', [{ text: 'Ok' }])
                } else {
                    Alert.alert('Lo sentimos', 'Hubo un error, por favor, intentelo más tarde', [{ text: 'Ok' }])
                }

            }
        }
    }

    const cancelAdd = () => {
        setShowModal(false)
        setNameCategory({ value: '', error: '' });
    }

    return (
        <View style={[Theme.styles.flex1]}>
            <StatusBar style='auto' />
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                    <View style={[Theme.styles.bordeRedondo1, themeCards, Theme.styles.pv30, Theme.styles.ph20, { width: '90%' }]}>
                        <View style={Theme.styles.pb20}>
                            <Text
                                style={[Theme.styles.bold, Theme.styles.fs20, Theme.styles.mv10, Theme.styles.textCenter, themeCardsText]}>
                                Crear Categoría
                            </Text>
                            <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                                <TouchableOpacity onPress={() => cancelAdd()}>
                                    <Feather name="x" size={24} color={themeColorIcons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Theme.styles.pb20}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Categoría</Text>
                            <TextInput
                                placeholder="Nombre Categoría"
                                textAlign='center'
                                mode="outlined"
                                keyboardType='default'
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={nameCategory.value}
                                onChangeText={(value) => setNameCategory({ value: value, error: '' })}
                                error={!!nameCategory.error}
                                errorText={nameCategory.error}
                            />
                        </View>
                        <View style={[Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.mv10]}>
                            <Pressable
                                style={[Theme.styles.flex1, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.pv10, { marginRight: 10 }]}
                                onPress={() => cancelAdd()}
                            >
                                <Text style={[Theme.styles.textCenter, Theme.styles.bold, Theme.colors.WhiteColor]}>
                                    Cancelar
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.pv10, { marginLeft: 10 }]}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={[Theme.styles.textCenter, Theme.styles.bold, Theme.colors.WhiteColor]}>
                                    Guardar
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default ModalHabilidadesCategoria