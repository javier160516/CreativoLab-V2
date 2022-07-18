import React, { useState, useEffect } from 'react'
import { Text, Pressable, TouchableOpacity, Modal, View, ScrollView, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import DetectarTema from '../../helpers/DetectarTema';
import Theme from '../../Theme/Theme';
import TextInput from '../TextInput';
import { Entypo } from '@expo/vector-icons';
import ImageProduct from './ImageProduct';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../helpers/Logout';

const ModalProducts = ({ showModal, setShowModal, getProducts, setListProducts, products, setProducts }) => {
    const [showImageProduct, setShowImageProduct] = useState(false);
    const [image, setImage] = useState('');
    const [name, setName] = useState({ value: '', error: '' });
    const [location, setLocation] = useState({ value: '', error: '' });
    const [type, setType] = useState('');
    const [price, setPrice] = useState({ value: '', error: '' });
    const [details, setDetails] = useState({ value: '', error: '' });
    const [typeError, setTypeError] = useState('');
    const [imageError, setImageError] = useState('');
    const [loader, setLoader] = useState(false);
    const { setLogueado } = useLogin();
    const { themeCards, themeCardsText, themeBordeSelectPicker, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput } = DetectarTema();

    useEffect(() => {
        if (products?.id) {
            setName({ value: products.name, error: '' });
            setLocation({ value: products.location, error: '' });
            setType(products.type);
            setPrice({ value: products.price.toString(), error: '' });
            setDetails({ value: products.details, error: '' });
            setImage(products.photo);
        }
    }, [products]);

    const FormData = global.FormData;
    const createProduct = new FormData();
    const handleSubmit = async () => {
        setLoader(true);
        createProduct.append('name', name.value);
        createProduct.append('location', location.value);
        createProduct.append('type', type);
        createProduct.append('price', price.value);
        createProduct.append('details', details.value);
        if (image) {
            setImageError('');
            let nameImage = '';
            let trimURL = '';
            trimURL = (Platform.OS === 'android') ? image : image.replace("file://", "");
            nameImage = trimURL.split('/').pop();
            createProduct.append('image', { uri: trimURL, name: nameImage, type: 'image/jpeg' || 'image/png' });
        } else {
            createProduct.append('image', '');
        }
        // EDIT
        if (products.id) {
            createProduct.append('id', products.id);
            try {
                const response = await axios({
                    url: 'http://dev.creativolab.com.mx/api/v1/modules/products/edit',
                    method: 'POST',
                    data: createProduct,
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return createProduct;
                    }
                })
                if (response.data.status == 200) {
                    Alert.alert('¡Producto Actualizado!', 'El producto ha sido actualizado correctamente', [{ text: 'Ok' }]);
                    setListProducts([]);
                    setProducts({})
                    voidStates();
                }
            } catch (error) {
                setLoader(false)
                if (error.response.data.status == 400) {
                    setName({ ...name, error: error.response.data.errors.name });
                    setLocation({ ...location, error: error.response.data.errors.location })
                    setTypeError(error.response.data.errors.type)
                    setPrice({ ...price, error: error.response.data.errors.price })
                    setDetails({ ...details, error: error.response.data.errors.details })
                    setImageError(error.response.data.errors.image)
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
                } else if (error.response.data.statu == 403) {
                    Alert.alert('¡Error!', error.response.data.message, [{
                        text: 'Ok', onPress: () => {
                            setLogueado(false);
                            Logout();
                        }
                    }]);
                }
            }

        } else {
            // CREACION
            try {
                const response = await axios({
                    url: 'http://dev.creativolab.com.mx/api/v1/modules/products',
                    method: 'POST',
                    data: createProduct,
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return createProduct;
                    }
                })
                if (response.data.status == 201) {
                    Alert.alert('¡Producto Creado!', 'El producto ha sido creado correctamente', [{ text: 'Ok' }]);
                    setListProducts([]);
                    voidStates();
                }
            } catch (error) {
                setLoader(false)
                if (error.response.data.status == 400) {
                    setName({ ...name, error: error.response.data.errors.name });
                    setLocation({ ...location, error: error.response.data.errors.location })
                    setTypeError(error.response.data.errors.type)
                    setPrice({ ...price, error: error.response.data.errors.price })
                    setDetails({ ...details, error: error.response.data.errors.details })
                    setImageError(error.response.data.errors.image)
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
                    if (error.response.data.errors.out_of_bounds) {
                        Alert.alert('¡Error!', error.response.data.errors.out_of_bounds, [{ text: 'Ok' }]);
                    } else {
                        Alert.alert('¡Error!', error.response.data.message, [{ text: 'Ok' }]);
                    }
                }
            }
        }
        getProducts();
    }

    const voidStates = () => {
        setProducts({});
        setName({ value: '', error: '' })
        setLocation({ value: '', error: '' })
        setType('')
        setPrice({ value: '', error: '' })
        setDetails({ value: '', error: '' });
        setImage('')
        setTypeError('')
        setImageError('');
        setLoader(false);
        setShowModal(false)
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
            <View style={[Theme.styles.flex1, themeCards]}>
                <ScrollView>
                    <Text style={[Theme.styles.textCenter, themeCardsText, Theme.styles.bold, Theme.styles.fs20, Theme.styles.pv10]}>Agregar Producto</Text>
                    <View style={[Theme.styles.mh20, Theme.styles.pv20]}>
                        <View>
                            <Text style={[Theme.styles.fs17, themeCardsText, Theme.styles.bold]}>Nombre</Text>
                            <TextInput
                                placeholder="Nombre"
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
                                value={name.value}
                                onChangeText={(value) => setName({ value: value, error: '' })}
                                error={!!name.error}
                                errorText={name.error}
                            />
                        </View>
                        <View>
                            <Text style={[Theme.styles.mt10, themeCardsText, Theme.styles.fs17, Theme.styles.bold]}>Ubicación</Text>
                            <TextInput
                                placeholder="Ubicación"
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
                                value={location.value}
                                onChangeText={(value) => setLocation({ value: value, error: '' })}
                                error={!!location.error}
                                errorText={location.error}
                            />
                        </View>

                        <View style={[Theme.styles.pv10]}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Tipo</Text>
                            <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, typeError ? Theme.styles.bordeRojo : null]}>
                                <Picker
                                    mode='dropdown'
                                    style={[themeCards, themeCardsText]}
                                    dropdownIconColor={themeCardsText.color}
                                    selectedValue={type}
                                    onValueChange={(value) => {
                                        setType(value)
                                        setTypeError('')
                                    }}

                                >
                                    <Picker.Item label='---Seleccionar Tipo---' value='' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='Casa' value='Casa' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='Departamento' value='Departamento' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='Terreno' value='Terreno' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                </Picker>
                            </View>
                            {typeError ? <Text style={styles.error}>{typeError}</Text> : null}

                        </View>
                        <View>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Precio</Text>
                            <View style={[themeCards, Theme.styles.flexRow, Theme.styles.alignCenter]}>
                                <Text style={[Theme.styles.fs20, themeCardsText, Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 10, top: 30, height: '50%' }]}>$</Text>
                                <TextInput
                                    textAlign={'Center'}
                                    mode="outlined"
                                    keyboardType='numeric'
                                    selectionColor={themeBorderSelectionInput}
                                    outlineColor={themeBorderOutlineInput}
                                    activeOutlineColor={themeBorderActiveInput}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    placeholderTextColor={Theme.colors.gris}
                                    style={[Theme.styles.mt10, themeCards, Theme.styles.ph20]}
                                    theme={{ colors: { text: themeCardsText.color } }}
                                    value={price.value}
                                    onChangeText={(value) => setPrice({ value: value, error: '' })}
                                    error={!!price.error}
                                    errorText={price.error}
                                />
                                <Text style={[Theme.styles.fs20, themeCardsText, Theme.styles.positionAbsolute, Theme.styles.zindex, { right: 20, top: 30, height: '50%' }]}>.00</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[Theme.styles.mt10, Theme.styles.fs17, Theme.styles.bold, themeCardsText]}>Descripción</Text>
                            <TextInput
                                multiline={true}
                                placeholder="Descripción"
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
                                value={details.value}
                                onChangeText={(value) => setDetails({ value: value, error: '' })}
                                error={!!details.error}
                                errorText={details.error}
                            />
                        </View>
                        {/* IMAGE */}
                        <View style={[Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.pv20]}>
                            <TouchableOpacity style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundGray3, Theme.styles.pv10, Theme.styles.ph10]}
                                onPress={() => setShowImageProduct(true)}
                            >
                                {image ?
                                    (<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />) :
                                    (
                                        <Entypo name="camera" size={24} color="black" />
                                    )

                                }
                            </TouchableOpacity>
                            {imageError ? <Text style={styles.error}>{imageError}</Text> : null}

                        </View>
                        {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : null}
                        <View style={[Theme.styles.alignCenter, Theme.styles.flexRow, Theme.styles.justifyCenter]}>
                            <Pressable style={[Theme.styles.mh30, Theme.colors.backgroundRed, Theme.styles.pv10, Theme.styles.ph30, Theme.styles.bordeRedondo1]}
                                onPress={() => voidStates()}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs16, Theme.styles.textCenter, Theme.styles.semiBold]}>Cerrar</Text>
                            </Pressable>
                            <Pressable style={[Theme.styles.mh30, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30, Theme.styles.bordeRedondo1]}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs16, Theme.styles.textCenter, Theme.styles.semiBold]}>Guardar</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <ImageProduct
                showImageProduct={showImageProduct}
                setShowImageProduct={setShowImageProduct}
                image={image}
                setImage={setImage}
            />
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

export default ModalProducts