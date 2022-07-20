import React, { useState, useEffect } from 'react'
import { Text, View, Modal, Pressable, Image, TouchableOpacity, ActivityIndicator, Platform, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import { Entypo } from '@expo/vector-icons';
import TextInput from '../TextInput';
import { Picker } from '@react-native-picker/picker';
import ImagesProjects from './ImagesProjects'
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../helpers/Logout'

const ModalPorjects = ({ showProjects, setShowProjects, listCategories, getAllData, projectSelected }) => {
    const { themeCards, themeBordeSelectPicker, themeCardsText, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput, themeFormularios, themeColorIconsModals, themeColorIcons } = DetectarTema();
    const [image, setImage] = useState(null);
    const [showImagesProjects, setShowImagesProjects] = useState(false);
    const [name, setName] = useState({ value: '', error: '' });
    const [link, setLink] = useState({ value: '', error: '' })
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState({ value: '', error: '' });
    const [loader, setLoader] = useState(false);

    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        if (projectSelected?.id) {
            setName({ value: projectSelected.name, error: '' });
            setLink({ value: projectSelected.link, error: '' });
            listCategories.filter(categoryState => categoryState.id === projectSelected.category ? setCategory(projectSelected.category) : null)
            setDetails({ value: projectSelected.details, error: '' });
            setImage(projectSelected.image)
        }
    }, [projectSelected])

    const handleSubmit = async () => {
        setLoader(true);
        const FormData = global.FormData;
        const createProject = new FormData();
        createProject.append('name', name.value);
        createProject.append('link', link.value);
        createProject.append('category', category);
        createProject.append('details', details.value);
        if (image) {
            let nameImage = '';
            let trimURL = '';
            trimURL = (Platform.OS === 'android') ? image : image.replace("file://", "");
            nameImage = trimURL.split('/').pop();
            createProject.append('image', { uri: trimURL, name: nameImage, type: 'image/jpeg' || 'image/png' });
        }

        if (projectSelected.id) {
            createProject.append('id', projectSelected.id);
            try {
                console.log(createProject);
                const response = await axios({
                    url: 'http://dev.creativolab.com.mx/api/v1/modules/projects/edit',
                    method: 'POST',
                    data: createProject,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return createProject;
                    }
                });
                if (response.data.status == 200) {
                    Alert.alert('¡Proyecto Editado!', 'El Proyecto ha sido editado correctamente', [{ text: 'Ok', onPress: () => voidStates() }])
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                console.log(error.response);
                if (error.response.data.status == 400) {
                    setName({ ...name, error: error.response.data.errors.name });
                    setLink({ ...link, error: error.response.data.errors.link });
                    setDetails({ ...details, error: error.response.data.errors.details });
                    setCategoryError(error.response.data.errors.category);
                    setImageError(error.response.data.errors.image);
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
                    Alert.alert('¡Lo sentimos!', error.response.data.message, [{ text: 'Ok', onPress: () => Logout() }]);
                }
            }
        } else {
            try {
                const response = await axios({
                    url: 'http://dev.creativolab.com.mx/api/v1/modules/projects',
                    method: 'POST',
                    data: createProject,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return createProject;
                    }
                });
                if (response.data.status == 201) {
                    Alert.alert('¡Proyecto Creado!', 'El Proyecto ha sido creado correctamente', [{ text: 'Ok', onPress: () => voidStates() }])
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                if (error.response.data.status == 400) {
                    setName({ ...name, error: error.response.data.errors.name });
                    setLink({ ...link, error: error.response.data.errors.link });
                    setDetails({ ...details, error: error.response.data.errors.details });
                    setCategoryError(error.response.data.errors.category);
                    setImageError(error.response.data.errors.image);
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
                    Alert.alert('¡Lo sentimos!', error.response.data.message, [{ text: 'Ok', onPress: () => Logout() }]);
                }
            }
        }
        getAllData();
    }

    const voidStates = () => {
        setShowProjects(false);
        setName({ value: '', error: '' });
        setLink({ value: '', error: '' });
        setDetails({ value: '', error: '' });
        setCategory('');
        setCategoryError('');
        setImage(null);
        setImageError('');
        setLoader(false);
    }
    return (
        <Modal
            animationType='slide'
            visible={showProjects}
            onRequestClose={() => setShowProjects(!showProjects)}
        >
            <StatusBar style='auto' />
            <View style={[themeCards, Theme.styles.flex1]}>
                <ScrollView>
                    <View style={[Theme.styles.flex1, Theme.styles.mh20]}>
                        <Text style={[Theme.styles.fs22, Theme.styles.textCenter, Theme.styles.mt40, Theme.styles.mb20, Theme.styles.semiBold, themeCardsText]}>Añadir Proyecto</Text>
                        <View style={[Theme.styles.alignCenter, Theme.styles.mv20]}>
                            <View>
                                <TouchableOpacity onPress={() => setShowImagesProjects(!showImagesProjects)}>
                                    {image ? (
                                        <View style={Theme.styles.alignCenter}>
                                            <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                                            <Button mode='outlined' color={themeColorIcons} style={[Theme.styles.mv10]}>
                                                <Text style={[Theme.styles.WhiteColor]}>Subir otra imagen</Text>
                                            </Button>
                                        </View>
                                    ) : (
                                        <View style={[themeFormularios, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.bordeRedondo1]}>
                                            <Entypo name="camera" size={30} color={themeColorIconsModals} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                            {imageError ? <Text style={styles.error}>{imageError}</Text> : null}
                        </View>
                        <View style={[Theme.styles.mb10]}>
                            <View style={[Theme.styles.pv10]} >
                                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Nombre del Proyecto</Text>
                                <TextInput
                                    placeholder="Nombre del Proyecto"
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
                                    value={name.value}
                                    onChangeText={(value) => setName({ value: value, error: '' })}
                                    error={!!name.error}
                                    errorText={name.error}
                                />
                            </View>
                            <View>
                                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Enlace</Text>
                                <TextInput
                                    placeholder="Enlace"
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
                                    value={link.value}
                                    onChangeText={(value) => setLink({ value: value, error: '' })}
                                    error={!!link.error}
                                    errorText={link.error}
                                />
                            </View>
                            <View style={[Theme.styles.pv10]}>
                                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Categoría</Text>
                                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, categoryError ? Theme.styles.bordeRojo : null]}>
                                    <Picker
                                        mode='dropdown'
                                        style={[themeCards, themeCardsText]}
                                        dropdownIconColor={themeCardsText.color}
                                        selectedValue={category}
                                        onValueChange={(value) => {
                                            setCategory(value)
                                            setCategoryError('');
                                        }}
                                    >
                                        <Picker.Item label='---Seleccionar Tipo---' value='' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                        {listCategories.map(categories => (
                                            <Picker.Item label={categories.category} value={categories.id} key={categories.id} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />

                                        ))}
                                    </Picker>
                                </View>
                                {categoryError ? <Text style={styles.error}>{categoryError}</Text> : null}

                            </View>
                            <View>
                                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Descripción</Text>
                                <TextInput
                                    placeholder="Descripción...."
                                    textAlign='center'
                                    mode="outlined"
                                    multiline={true}
                                    keyboardType='default'
                                    selectionColor={themeBorderSelectionInput}
                                    outlineColor={themeBorderOutlineInput}
                                    activeOutlineColor={themeBorderActiveInput}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    placeholderTextColor={Theme.colors.gris}
                                    style={[Theme.styles.mt10, themeCards]}
                                    theme={{ colors: { text: themeCardsText.color } }}
                                    value={details.value}
                                    onChangeText={(value) => setDetails({ value: value, error: '' })}
                                    error={!!details.error}
                                    errorText={details.error}
                                />
                            </View>
                        </View>
                        {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : null}
                        <View style={[Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.mv20]}>
                            <Pressable onPress={() => voidStates()} style={[Theme.styles.mh10, Theme.colors.backgroundRed, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                                <Text style={[Theme.styles.bold, Theme.styles.fs15, Theme.colors.WhiteColor]}>Cancelar</Text>
                            </Pressable>
                            <Pressable onPress={() => handleSubmit()} style={[Theme.styles.mh10, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                                <Text style={[Theme.styles.bold, Theme.styles.fs15, Theme.colors.WhiteColor]}>Guardar</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ImagesProjects
                        showImagesProjects={showImagesProjects}
                        setShowImagesProjects={setShowImagesProjects}
                        image={image}
                        setImage={setImage}
                    />
                </ScrollView>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    error: {
        fontSize: 13,
        color: '#F32424',
        paddingTop: 8,
    },
})

export default ModalPorjects