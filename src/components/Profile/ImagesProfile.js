import React, { useState, useEffect } from 'react'
import { Text, Modal, View, Pressable, Alert, Platform } from 'react-native'
import { BottomSheet } from 'react-native-btr';
import Theme from '../../Theme/Theme';
import DetectarTema from '../../helpers/DetectarTema';
import { MaterialIcons } from '@expo/vector-icons';
// import { BottomSheet } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';

const ImagesProfile = ({ showImageProfile, setShowImageProfile, getDataProfile }) => {
    const [image, setImage] = useState('');
    
    const [imageProfile, setSelectImageProfile] = useState(null);
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
            setShowImageProfile(false);
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
            setShowImageProfile(false);
        }
    };

    useEffect(() => {
        changeAvatar();
    }, [image])

    const changeAvatar = async () => {
        if(image){
            const FormData = global.FormData;
            const changeImageAvatar = new FormData();
            let trimURL = (Platform.OS === 'android') ? image : image.replace("file://", "");
            let nameImage = trimURL.split('/').pop();
            changeImageAvatar.append('avatar', { uri: trimURL, name: nameImage, type: 'image/jpeg' || 'image/png' });
    
            try {
                const response = await axios({
                    url: 'https://dev.creativolab.com.mx/api/v1/profile/avatar',
                    method: 'POST',
                    data: changeImageAvatar,
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, error) => {
                        return changeImageAvatar;
                    }
                });
                if (response.data.status == 200) {
                    Alert.alert('¡Foto de Perfil Cambiada!', 'La foto de perfil ha sido cambida correctamente', [{ text: 'Ok' }])
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
                    Alert.alert('¡Lo sentimos!', error.response.data.errors.avatar, [{text: 'Ok'}]);
                }
            }
        }else{
            return;
        }
        
        getDataProfile();
    }
    return (
        <View>
            <BottomSheet
                onBackButtonPress={() => setShowImageProfile(false)}
                onBackdropPress={() => setShowImageProfile(false)}
                visible={showImageProfile}

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
                        <Pressable onPress={() => setShowImageProfile(false)} style={[Theme.styles.pv10, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.alignCenter]}>
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}

export default ImagesProfile