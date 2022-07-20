import React, { useState, useEffect } from 'react'
import { Text, Modal, Pressable, View, Alert, ActivityIndicator } from 'react-native'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import TextInput from '../TextInput'
import axios from 'axios'
import { useLogin } from '../../context/LoginProvider'
import { Logout } from '../../helpers/Logout'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ModalCategories = ({ showModal, setShowModal, category, getAllData }) => {
    const { themeCards, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput, themeCardsText } = DetectarTema();
    const [categoryState, setCategoryState] = useState({ value: '', error: '' });
    const { setLogueado } = useLogin();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (category?.id) {
            setCategoryState({ value: category.category, error: '' });
        }
    }, [category])

    const handleSubmit = async () => {
        setLoader(true);
        const createCategory = {
            category: categoryState.value
        }
        if (category.id) {
            createCategory.id = category.id;
            try {
                const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/projects/categories', createCategory);
                if (response.data.status == 200) {
                    Alert.alert('¡Categoría Editada!', 'La categoría ha sido editada correctamente', [{ text: 'Ok', onPress: () => voidStates() }]);
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false)
                if (error.response.data.status == 400) {
                    setCategoryState({ ...categoryState, error: error.response.data.errors.category })
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
                        }]
                    )
                } else if (error.response.data.status == 403) {
                    Alert.alert('¡Hubo un error!', error.response.data.message, [{
                        text: 'Ok', onPress: () => {
                            setLogueado(false);
                            Logout();
                        }
                    }]);
                } else if (error.response.data.status == 404) {
                    Alert.alert('¡Hubo un error!', error.response.data.errors.id, [{ text: 'Ok' }]);
                }
            }
        } else {
            try {
                const response = await axios.post('http://dev.creativolab.com.mx/api/v1/modules/projects/categories', createCategory);
                if (response.data.status == 201) {
                    Alert.alert('¡Categoría Creada', 'La categoría ha sido creada correctamente', [{ text: 'Ok', onPress: () => voidStates() }])
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false)
                if (error.response.data.status == 400) {
                    setCategoryState({ ...categoryState, error: error.response.data.errors.category })
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
                        }]
                    )
                } else if (error.response.data.status == 403) {
                    if (error.response.data.message) {
                        Alert.alert('¡Hubo un error!', error.response.data.message, [{
                            text: 'Ok', onPress: () => {
                                setLogueado(false);
                                Logout();
                            }
                        }]);
                    } else {
                        Alert.alert('¡Hubo un error!', error.response.data.errors.out_of_bounds, [{ text: 'Ok' }]);
                    }
                }
            }
        }
        getAllData();
    }

    const voidStates = () => {
        setCategoryState({ value: '', error: '' });
        setShowModal(false);
    }
    return (
        <View style={[Theme.styles.flex1]}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                    <View style={[Theme.styles.bordeRedondo1, themeCards, Theme.styles.pv30, Theme.styles.ph20, { width: '90%' }]}>
                        <Text style={[Theme.styles.bold, Theme.styles.textCenter, Theme.styles.fs17, themeCardsText]}>Crear Categoria</Text>
                        <View style={[Theme.styles.pv10]}>
                            <Text style={[themeCardsText, Theme.styles.fs16, Theme.styles.semiBold]}>Categoria</Text>
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
                                value={categoryState.value}
                                onChangeText={(value) => setCategoryState({ value: value, error: '' })}
                                error={!!categoryState.error}
                                errorText={categoryState.error}
                            />
                        </View>
                        {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : null}
                        <View style={Theme.styles.flexRow}>
                            <Pressable onPress={() => voidStates()} style={[Theme.styles.flex1, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1, Theme.colors.backgroundRed, Theme.styles.alignCenter, { marginRight: 10 }]}>
                                <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]} >Cancelar</Text>
                            </Pressable>
                            <Pressable onPress={() => handleSubmit()} style={[Theme.styles.flex1, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue, Theme.styles.alignCenter, { marginLeft: 10 }]}>
                                <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Crear</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default ModalCategories