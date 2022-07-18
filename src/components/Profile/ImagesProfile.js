import React, {useState} from 'react'
import { Text, Modal, View, Pressable } from 'react-native'
import { BottomSheet } from 'react-native-btr';
import Theme from '../../Theme/Theme';
import DetectarTema from '../../helpers/DetectarTema';
import { MaterialIcons } from '@expo/vector-icons';
// import { BottomSheet } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const ImagesProfile = ({ showImageProfile, setShowImageProfile }) => {
    // const [closeBottom, setCloseBottom] = useState(false);
    const [imageProfile, setSelectImageProfile] = useState(null);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });
        if (!result.cancelled) {
            setSelectImageProfile(result.uri);
        }
    };
    const selectPhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.cancelled){
            setSelectImageProfile(result.uri)
        }
    };
    return (
        <View>
            <BottomSheet
                onBackButtonPress={() => setShowImageProfile(false)}
                onBackdropPress={() => setShowImageProfile(false)}
                visible={showImageProfile}
                
            >
                <View style={[Theme.colors.backgroundBlanco, Theme.styles.w100, Theme.styles.h25]}>
                    <View>
                        <Pressable  style={[ Theme.styles.alignCenter]}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View style={[Theme.styles.pv10, Theme.styles.mh20]}>
                        <Pressable onPress={selectImage} style={[Theme.styles.bordeRedondo1,Theme.styles.alignCenter,Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30]}>
                            <Text style={[Theme.colors.WhiteColor, Theme.styles.bold]}>Buscar en Galería</Text>
                        </Pressable>
                        <Pressable onPress={selectPhoto} style={[Theme.colors.backgroundBlue,Theme.styles.alignCenter ,Theme.styles.pv10, Theme.styles.mv10, Theme.styles.bordeRedondo1]}>
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Tomar una Foto</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowImageProfile(false)}   style={[Theme.styles.pv10, Theme.colors.backgroundRed,Theme.styles.bordeRedondo1 ,Theme.styles.alignCenter]}>
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}

export default ImagesProfile