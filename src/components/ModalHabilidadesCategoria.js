import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, Pressable } from 'react-native'
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema';
import TextInput from './TextInput';

import { Feather } from '@expo/vector-icons';


const ModalHabilidadesCategoria = ({ showModalCategory, setShowModalCategory }) => {
    const { themeContainerStyle, themeCards, themeCardsText, themeBorderActiveInput, themeColorIcons, themeBorderOutlineInput, themeBorderSelectionInput } = DetectarTema();
    return (

        <View style={[Theme.styles.flex1]}>
            <Modal
                // style={[Theme.styles.alignCenter, Theme.styles.justifyCenter]}
                animationType="fade"
                transparent={true}
                visible={showModalCategory}
                onRequestClose={() => {
                    setShowModalCategory(false);
                }}
            >

                <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                    <View style={[Theme.styles.bordeRedondo1, themeContainerStyle, { width: '90%' }]}>
                        <View>
                            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyCenter, { borderBottomWidth: 1, borderBottomColor: '#CCC', }]}>
                                <View >
                                    <Text
                                        style={[
                                            Theme.styles.bold,
                                            Theme.styles.fs17,
                                            Theme.styles.mv10,
                                            Theme.styles.textCenter,
                                            themeCardsText
                                        ]}
                                    >
                                        Crear Categoría
                                    </Text>
                                </View>
                                <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                                    <TouchableOpacity onPress={() => setShowModalCategory(!showModalCategory)}>
                                        <Feather name="x" size={24} color={themeColorIcons} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', }}>
                                <View style={[Theme.styles.mh20, Theme.styles.mv20]}>
                                    <View >
                                        <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Categoría</Text>
                                    </View>
                                    <View >
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
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.mv10]}>
                                <View style={[Theme.styles.mh30]}>
                                    <Pressable style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}>
                                        <Text style={[Theme.styles.bold, Theme.colors.WhiteColor, Theme.styles.mv10, Theme.styles.mh20]}>
                                            Guardar
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={[Theme.styles.mh30]}>
                                    <Pressable style={[Theme.colors.backgroundRed, Theme.styles.bordeRedondo1]}>
                                        <Text style={[Theme.styles.bold, Theme.colors.WhiteColor, Theme.styles.mv10, Theme.styles.mh20]}>
                                            Cancelar
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View>

                        </View>
                    </View>

                </View>



            </Modal>
        </View>

    )
}

export default ModalHabilidadesCategoria