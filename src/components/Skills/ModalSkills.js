import React, { useState, useEffect } from 'react'
import { Text, View, Modal, TouchableOpacity, Pressable, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import Theme from '../../Theme/Theme'
import { Picker } from "@react-native-picker/picker";
import { Feather } from '@expo/vector-icons';
import DetectarTema from '../../helpers/DetectarTema';
import TextInput from '../TextInput';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalSkills = ({ showModal, setShowModal, listCategories, listSkills, setListSkills, skill, setSkill, getSkills }) => {
    const [nameSkill, setNameSkill] = useState({ value: '', error: '' });
    const [progress, setProgress] = useState({ value: '', error: '' });
    const [selectCategory, setSelectCategory] = useState('');
    const [selectCategoryError, setSelectCategoryError] = useState('');
    const [loader, setLoader] = useState(false);
    const { setLogueado } = useLogin();
    const { themeCardsText, themeBorderSelectionInput, themeBorderOutlineInput,
        themeBorderActiveInput, themeCards, themeColorIcons,
        themeBordeSelectPicker } = DetectarTema();

    useEffect(() => {
        if (skill?.id) {
            setNameSkill({ value: skill.skill, error: '' });
            setProgress({ value: skill.percentage.toString(), error: '' });
            listCategories.filter(categoryState => categoryState.id === skill.category ? setSelectCategory(skill.category) : null)
        }
    }, [skill])

    const handleSubmit = async () => {
        setLoader(true);
        const createSkill = {
            skill: nameSkill.value,
            percentage: progress.value,
            category: selectCategory
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        /** EDIT SKILL **/
        if (skill.id) {
            createSkill.id = skill.id;
            try {
                const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/skills', createSkill, config);
                if (response.data.status == 200) {
                    setListSkills([]);
                    setSkill({});
                    Alert.alert('¡Habilidad Editada!', 'La habilidad ha sido editada correctamente', [{ text: 'Ok', onPress: () => clearStates() }]);
                    setLoader(false)
                }

            } catch (error) {
                setLoader(false);
                if (error.response.data.status == 400) {
                    setNameSkill({ ...nameSkill, error: error.response.data.errors.skill });
                    setProgress({ ...progress, error: error.response.data.errors.percentage });
                    setSelectCategoryError(error.response.data.errors.category);
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
                } else if (error.response.data.status == 404) {
                    Alert.alert('¡Lo sentimos!', 'No se encontró la habilidad a editar', [{ text: 'Ok', onPress: () => clearStates() }])
                } else {
                    Alert.alert('¡Lo sentimos!', 'Lo sentimos, por favor, intentelo más tarde', [{ text: 'Ok', onPress: () => clearStates() }])
                }
            }
        } else {
            /** CREACION SKILL **/
            try {
                const response = await axios.post('http://dev.creativolab.com.mx/api/v1/modules/skills', createSkill, config);
                if (response.data.status == 201) {
                    setListSkills([])
                    Alert.alert('¡Habilidad Creada!',
                        'La habilidad ha sido creada correctamente',
                        [{ text: 'Ok', onPress: () => clearStates() }]);
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                if (error.response.data.status == 400) {
                    setNameSkill({ ...nameSkill, error: error.response.data.errors.skill });
                    setProgress({ ...progress, error: error.response.data.errors.percentage });
                    setSelectCategoryError(error.response.data.errors.category);
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
                    Alert.alert('¡Lo sentimos!', 'Solo puedes crear 5 habilidades por categoría', [{ text: 'Ok', onPress: () => clearStates() }])
                } else {
                    Alert.alert('¡Lo sentimos!', 'Lo sentimos, por favor, intentelo más tarde', [{ text: 'Ok', onPress: () => clearStates() }])
                }
            }
        }
        getSkills();
    }

    const clearStates = () => {
        setShowModal(false);
        setNameSkill({ value: '', error: '' });
        setProgress({ value: '', error: '' });
        setSelectCategory('');
        setSelectCategoryError('');
    }
    return (
        <View style={[Theme.styles.flex1]}>
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
                        <View style={[Theme.styles.pb20]}>
                            <Text
                                style={[Theme.styles.bold, Theme.styles.fs17, Theme.styles.mb10, Theme.styles.textCenter, themeCardsText]}>
                                Añadir Habilidad
                            </Text>
                            <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                                <TouchableOpacity onPress={() => clearStates()}>
                                    <Feather name="x" size={24} color={themeColorIcons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Theme.styles.pb20}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Habilidad</Text>
                            <TextInput
                                placeholder="Habilidad"
                                textAlign='center'
                                mode="outlined"
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={nameSkill.value}
                                onChangeText={(name) => setNameSkill({ value: name, error: '' })}
                                error={!!nameSkill.error}
                                errorText={nameSkill.error}
                            />
                        </View>
                        <View style={[Theme.styles.mv10]}>
                            <Text style={[Theme.styles.bold, themeCardsText, Theme.styles.fs17]}>Progreso</Text>
                            <View style={[themeCards, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                                <TextInput
                                    placeholder="Progreso"
                                    textAlign='center'
                                    mode="outlined"
                                    keyboardType='numeric'
                                    selectionColor={themeBorderSelectionInput}
                                    outlineColor={themeBorderOutlineInput}
                                    activeOutlineColor={themeBorderActiveInput}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    placeholderTextColor={Theme.colors.gris}
                                    style={[Theme.styles.mt10, themeCards]}
                                    theme={{ colors: { text: themeCardsText.color } }}
                                    value={progress.value}
                                    onChangeText={(progress) => setProgress({ value: progress, error: '' })}
                                    error={!!progress.error}
                                    errorText={progress.error}
                                />
                                <Text style={[Theme.styles.bold, Theme.styles.fs20, themeCardsText, Theme.styles.positionAbsolute, { right: 15, top: 30 }]}>%</Text>
                            </View>
                        </View>
                        <View style={[Theme.styles.mt10, Theme.styles.mb20]}>
                            <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17]}>Categoría</Text>
                            <View style={[Theme.styles.borde1, themeBordeSelectPicker, Theme.styles.bordeRedondo1, Theme.styles.mt10, selectCategoryError ? Theme.styles.bordeRojo : null]}>
                                <Picker
                                    style={[themeCards, themeCardsText]}
                                    mode='dropdown'
                                    selectedValue={selectCategory}
                                    onValueChange={(valor) => { setSelectCategory(valor); setSelectCategoryError('') }}
                                    dropdownIconColor={themeCardsText.color}
                                >
                                    <Picker.Item label='-- Selecciona Categoría --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    {listCategories.map(categories => (
                                        <Picker.Item label={categories.category} key={categories.id} value={categories.id} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    ))}
                                </Picker>
                            </View>
                            {selectCategoryError ? <Text style={styles.error}>{selectCategoryError}</Text> : null}
                        </View>

                        {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : <></>}
                        <View style={[Theme.styles.mv10, Theme.styles.flexRow]}>
                            <Pressable
                                style={[Theme.styles.flex1, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.mr10, Theme.styles.pv10]}
                                onPress={() => clearStates()}
                            >
                                <Text style={[Theme.styles.bold, Theme.colors.WhiteColor, Theme.styles.textCenter]}>
                                    Cancelar
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.ml10, Theme.styles.pv10]}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={[Theme.styles.bold, Theme.colors.WhiteColor, Theme.styles.textCenter]}>
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

const styles = StyleSheet.create({
    error: {
        fontSize: 13,
        color: '#F32424',
        paddingTop: 8,
    },
})

export default ModalSkills