import React from 'react'
import { Text, Modal, Pressable, View } from 'react-native'
import { set } from 'react-native-reanimated'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import TextInput from '../TextInput'

const ModalCategories = ({ showModal, setShowModal }) => {
    const { themeCards, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput, themeCardsText } = DetectarTema();
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
                            />
                        </View>
                        <Pressable onPress={() => setShowModal(false)} style={[Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1, Theme.colors.backgroundRed, Theme.styles.alignCenter]}>
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]} >Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default ModalCategories