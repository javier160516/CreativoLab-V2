import React, { useState, useEffect } from 'react'
import { Text, Modal, View, Pressable, Alert } from 'react-native'
import { BottomSheet } from 'react-native-btr';
import Theme from '../../Theme/Theme';
import { MaterialIcons } from '@expo/vector-icons';
// import { BottomSheet } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';
const ImageBanner = ({ showImageBanner, setShowImageBanner, getDataProfile }) => {
    const [image, setImage] = useState('');
    const { setLogueado } = useLogin();
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setShowImageBanner(false);
        }
    };
    const selectPhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setShowImageBanner(false);
        }
    };

    useEffect(() => {
        changeCover();
    }, [image]);

    const changeCover = async () => {
        if (image) {
            const FormData = global.FormData;
            const changeImageCover = new FormData();
            let trimURL = (Platform.OS === 'android') ? image : image.replace("file://", "");
            let nameImage = trimURL.split('/').pop();
            changeImageCover.append('cover', { uri: trimURL, name: nameImage, type: 'image/jpeg' || 'image/png' });

            try {
                const response = await axios({
                    url: 'https://dev.creativolab.com.mx/api/v1/profile/cover',
                    method: 'POST',
                    data: changeImageCover,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return changeImageCover;
                    }
                });
                if (response.data.status == 200) {
                    Alert.alert('¡Foto de Portada Cambiada!', 'La foto de portada ha sido cambida correctamente', [{ text: 'Ok' }])
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
                }else if(error.response.data.status == 400){
                    Alert.alert('¡Lo sentimos!', error.response.data.errors.cover, [{text: 'Ok'}]);
                }
            }
        } else {
            null
        }
        getDataProfile();
    }

    return (
        <View>
            <BottomSheet
                onBackButtonPress={() => setShowImageBanner(false)}
                onBackdropPress={() => setShowImageBanner(false)}
                visible={showImageBanner}

            >
                <View style={[Theme.colors.backgroundBlanco, Theme.styles.w100, Theme.styles.h25]}>
                    <View>
                        <Pressable style={[Theme.styles.alignCenter]}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View style={[Theme.styles.pv10, Theme.styles.mh20]}>
                        <Pressable onPress={selectImage} style={[Theme.styles.bordeRedondo1, Theme.styles.alignCenter, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30]}>
                            <Text style={[Theme.colors.WhiteColor, Theme.styles.bold]}>Buscar en Galería</Text>
                        </Pressable>
                        <Pressable onPress={selectPhoto} style={[Theme.colors.backgroundBlue, Theme.styles.alignCenter, Theme.styles.pv10, Theme.styles.mv10, Theme.styles.bordeRedondo1]}>
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Tomar una Foto</Text>
                        </Pressable>
                        <Pressable onPress={() => setImageBannerjs(false)} style={[Theme.styles.pv10, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.alignCenter]}>
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}

export default ImageBanner