import React, { useState, useEffect } from 'react'
import { Text, View, Modal, ScrollView, Pressable, TouchableOpacity, Image, Platform, Alert, ActivityIndicator } from 'react-native'
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema'
import TextInput from './TextInput';
import ComponentImage from './ComponentImage';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { Button } from 'react-native-paper';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ModalTestimonials = ({ showModal, setShowModal, listTestimonial, setListTestimonials, testimonial, setTestimonial }) => {
    const { themeCards, themeCardsText, themeBorderActiveInput, themeBorderSelectionInput, themeBorderOutlineInput, themeFormularios, themeColorIconsModals } = DetectarTema();
    const [showComponentImage, setShowComponentImage] = useState(false);
    const [image, setImage] = useState('');
    const [fullName, setFullName] = useState({ value: '', error: '' });
    const [position, setPosition] = useState({ value: '', error: '' });
    const [company, setCompany] = useState({ value: '', error: '' });
    const [comment, setComment] = useState({ value: '', error: '' });
    const [loader, setLoader] = useState(false);
    const { setLogueado } = useLogin();

    useEffect(() => {
        if (testimonial?.id) {
            setFullName({ value: testimonial.full_name, error: '' });
            setPosition({ value: testimonial.position, error: '' });
            setCompany({ value: testimonial.company, error: '' });
            setComment({ value: testimonial.comment, error: '' });
            setImage(testimonial.photo);
        }
    }, [testimonial])


    const handleSubmit = async () => {
        // setLoader(true);
        const FormData = global.FormData;
        const createTestimonial = new FormData();
        createTestimonial.append('full_name', fullName.value);
        createTestimonial.append('position', position.value);
        createTestimonial.append('company', company.value);
        createTestimonial.append('comment', comment.value);
        if (image) {
            let nameImage = '';
            let trimURL = '';
            trimURL = (Platform.OS === 'android') ? image : image.replace("file://", "");
            nameImage = trimURL.split('/').pop();
            createTestimonial.append('photo', { uri: trimURL, name: nameImage, type: 'image/jpeg' || 'image/png' });
        } else {
            createTestimonial.append('photo', { uri: '', name: '', type: '' });
        }

        if (testimonial.id) {
            createTestimonial.append('id', testimonial.id);
            console.log(createTestimonial);
            try {
                const response = await axios({
                    url: 'http://dev.creativolab.com.mx/api/v1/modules/testimonials',
                    method: 'POST',
                    data: createTestimonial,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return createTestimonial;
                    }
                })
                if (response.data.status == 200) {
                    Alert.alert('¡Testimonial Actualizado!', 'El testimonial se ha actualizado correctamente', [{ text: 'Ok', onPress: () => clearFields() }])
                    setListTestimonials([])
                    setTestimonial({});
                }
            } catch (error) {
                if (error.response.data.status == 400) {
                    setFullName({ ...fullName, error: error.response.data.errors.full_name });
                    setPosition({ ...position, error: error.response.data.errors.position });
                    setCompany({ ...company, error: error.response.data.errors.company });
                    setComment({ ...comment, error: error.response.data.errors.comment });
                    if (error.response.data.errors.photo) {
                        Alert.alert('Error', error.response.data.errors.photo, [{ text: 'Ok' }]);
                    }
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
                    Alert.alert('¡Error!', 'Solo puedes crear 5 testimoniales', [{ text: 'Ok', onPress: () => clearFields() }]);
                } else {
                    Alert.alert('¡Error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok', onPress: () => clearFields() }]);
                }
            }
        } else {
            try {
                const response = await axios({
                    url: 'http://dev.creativolab.com.mx/api/v1/modules/testimonials',
                    method: 'POST',
                    data: createTestimonial,
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return createTestimonial;
                    }
                })
                if (response.data.status == 201) {
                    Alert.alert('¡Testimonial Creado!', 'El testimonial se ha creado correctamente', [{ text: 'Ok', onPress: () => clearFields() }])
                    setListTestimonials([])
                }
            } catch (error) {
                console.log(error.response)
                if (error.response.data.status == 400) {
                    setFullName({ ...fullName, error: error.response.data.errors.full_name });
                    setPosition({ ...position, error: error.response.data.errors.position });
                    setCompany({ ...company, error: error.response.data.errors.company });
                    setComment({ ...comment, error: error.response.data.errors.comment });
                    if (error.response.data.errors.photo) {
                        Alert.alert('Error', error.response.data.errors.photo, [{ text: 'Ok' }]);
                    }
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
                    Alert.alert('¡Error!', 'Solo puedes crear 5 testimoniales', [{ text: 'Ok', onPress: () => clearFields() }]);
                } else {
                    Alert.alert('¡Error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok', onPress: () => clearFields() }]);
                }
            }
        }
    }

    const clearFields = () => {
        setShowModal(false);
        setFullName({ value: '', error: '' });
        setPosition({ value: '', error: '' });
        setCompany({ value: '', error: '' });
        setComment({ value: '', error: '' });
        setImage(null);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(false);
            }}
        >
            <StatusBar style='auto' />
            <View style={[themeCards, Theme.styles.flex1]}>
                <ScrollView >
                    <Text style={[Theme.styles.fs22, Theme.styles.textCenter, Theme.styles.mt40, Theme.styles.mb20, Theme.styles.semiBold, themeCardsText]}>Añadir Testimonio</Text>
                    <View style={[Theme.styles.mh20]}>
                        <View style={[Theme.styles.alignCenter]}>
                            <View>
                                <TouchableOpacity style={[Theme.styles.mv20]}
                                    onPress={() => setShowComponentImage(true)}>
                                    {image ? (
                                        <View>
                                            <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                                            <Text style={[Theme.colors.WhiteColor, Theme.styles.backgroundBlue]}>Subir otra imagen</Text>
                                        </View>
                                    ) : (
                                        <View style={[themeFormularios, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.bordeRedondo1]}>
                                            <Entypo name="camera" size={30} color={themeColorIconsModals} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={[themeCardsText, Theme.styles.fs17]}>Nombre</Text>
                            <TextInput
                                placeholder="Nombre Completo"
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
                                value={fullName.value}
                                onChangeText={(fullName) => setFullName({ value: fullName, error: '' })}
                                error={!!fullName.error}
                                errorText={fullName.error}
                            />
                        </View>
                        <View style={[Theme.styles.mv10]}>
                            <Text style={[themeCardsText, Theme.styles.fs17]}>Puesto</Text>
                            <TextInput
                                placeholder="Puesto"
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
                                value={position.value}
                                onChangeText={(position) => setPosition({ value: position, error: '' })}
                                error={!!position.error}
                                errorText={position.error}
                            />
                        </View>
                        <View>
                            <Text style={[themeCardsText, Theme.styles.fs17]}>
                                Empresa
                            </Text>
                            <TextInput
                                placeholder="Empresa"
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
                                value={company.value}
                                onChangeText={(company) => setCompany({ value: company, error: '' })}
                                error={!!company.error}
                                errorText={company.error}
                            />
                        </View>
                        <View style={[Theme.styles.mv10]}>
                            <Text style={[themeCardsText, Theme.styles.fs17]}>Comentarios</Text>
                            <TextInput
                                placeholder="Comentarios"
                                textAlign='center'
                                mode="outlined"
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                multiline={true}
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={comment.value}
                                onChangeText={(comment) => setComment({ value: comment, error: '' })}
                                error={!!comment.error}
                                errorText={comment.error}
                            />
                        </View>
                    </View>
                    {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : <></>}
                    <View style={[Theme.styles.flexRow, Theme.styles.mv20, Theme.styles.mh30]}>
                        <Pressable style={[Theme.colors.backgroundRed, Theme.styles.flex1, Theme.styles.pv10, Theme.styles.bordeRedondo1, Theme.styles.mh10]}
                            onPress={() => clearFields()}
                        >
                            <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter]}>Cancelar</Text>
                        </Pressable>


                        <Pressable
                            onPress={() => handleSubmit()}
                            style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.bordeRedondo1, Theme.styles.mh10]}
                        >
                            <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter]}>Guardar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
            <ComponentImage
                showComponentImage={showComponentImage}
                setShowComponentImage={setShowComponentImage}
                image={image}
                setImage={setImage}
            />
        </Modal>
    )
}

export default ModalTestimonials