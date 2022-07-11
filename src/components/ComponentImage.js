import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Text, Pressable, View, Platform, Image, Modal } from 'react-native';
// import { Entypo } from '@expo/vector-icons';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
const ComponentImage = ({ showComponentImage, setShowComponentImage, image, setImage }) => {
    const { themeCardsText, themeCards, themeContainerStyle } = DetectarTema();


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };
    const pickImage2 = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showComponentImage}
            onRequestClose={() => {
                setShowComponentImage(false);
            }}
        >
            <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                <View style={[Theme.styles.bordeRedondo2, themeCards, { width: '90%' }]}>
                    <View style={[Theme.styles.mv10, Theme.styles.pv10, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                        <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17]}>Agregar una Foto o Imagen</Text>
                    </View>
                    <View style={[Theme.styles.mh10]}>
                        <Pressable onPress={pickImage} style={[Theme.styles.mv10,Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}>
                            <Text style={[Theme.styles.pv10, Theme.styles.semiBold, Theme.styles.fs15, Theme.styles.textCenter,  Theme.colors.WhiteColor]}>Buscar en Galeria</Text>
                        </Pressable>
                        <Pressable onPress={pickImage2} style={[Theme.styles.mv10 ,Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue]}>
                            <Text style={[Theme.styles.pv10,Theme.colors.WhiteColor, Theme.styles.fs15, Theme.styles.semiBold, Theme.styles.textCenter]}>Tomar una Foto</Text>
                        </Pressable>
                        <Pressable style={[Theme.styles.mv10,Theme.alignCenter, Theme.styles.justifyCenter,Theme.styles.bordeRedondo1,Theme.colors.backgroundRed]} onPress={() => setShowComponentImage(!showComponentImage)}>
                            <Text style={[Theme.styles.pv10,Theme.styles.textCenter,Theme.colors.WhiteColor, Theme.styles.fs16]}>Cancelar</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal >

    )
}

export default ComponentImage;