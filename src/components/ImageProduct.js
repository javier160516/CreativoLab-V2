import React from 'react'
import { Text, Pressable, TouchableOpacity, Modal, View, ScrollView } from 'react-native'
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import * as ImagePicker from 'expo-image-picker';

const ImageProduct = ({ showImageProduct, setShowImageProduct, setImage }) => {
    const { themeCards, themeCardsText } = DetectarTema();
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showImageProduct}
            onRequestClose={() => {
                setShowImageProduct(showImageProduct);
            }}
        >
            <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                <View style={[Theme.styles.bordeRedondo2, themeCards, { width: '90%' }]}>
                    <View>
                        <View style={[Theme.styles.mv10, Theme.styles.pv10, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                            <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17]}>Agregar una Foto o Imagen</Text>
                        </View>
                        <View style={[Theme.styles.mh10]}>
                            <Pressable onPress={pickImage} style={[Theme.styles.mv10, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}>
                                <Text style={[Theme.styles.pv10, Theme.styles.semiBold, Theme.styles.fs15, Theme.styles.textCenter, Theme.colors.WhiteColor]}>Buscar en Galeria</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowImageProduct(!showImageProduct)} style={[Theme.styles.mv10, Theme.alignCenter, Theme.styles.justifyCenter, Theme.styles.bordeRedondo1, Theme.colors.backgroundRed]}>
                                <Text style={[Theme.styles.pv10, Theme.styles.textCenter, Theme.colors.WhiteColor, Theme.styles.fs16]}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ImageProduct