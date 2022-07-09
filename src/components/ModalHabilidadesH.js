import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, Pressable } from 'react-native'
import Theme from '../Theme/Theme'
import { Picker } from "@react-native-picker/picker";
import { Feather } from '@expo/vector-icons';
import DetectarTema from '../helpers/DetectarTema';
import TextInput from './TextInput';

const ModalHabilidadesH = ({ showModal, setShowModal }) => {
    const [selectNivel, setSelectNivel] = useState('');
    const { themeCardsText, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput, themeCards, themeContainerStyle, themeColorIcons, themeBordeSelectPicker } = DetectarTema();
    return (
        // <View style={[Theme.styles.flex1]}>
        <Modal
            // style={[Theme.styles.alignCenter, Theme.styles.justifyCenter]}
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(false);
            }}
        >

            <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                <View style={[Theme.styles.bordeRedondo2, themeContainerStyle, { width: '90%' }]}>
                    <View
                        style={[Theme.styles.mv10]}
                    >
                        <View style={[Theme.styles.alignCenter, Theme.styles.justifyCenter, { borderBottomWidth: 1, borderBottomColor: '#CCC', }]}>
                            <View style={[Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.mv10]}>
                                <Text
                                    style={[
                                        Theme.styles.bold,
                                        Theme.styles.fs17,
                                        Theme.styles.mb10,
                                        Theme.styles.textCenter,
                                        themeCardsText
                                    ]}
                                >
                                    Añadir Habilidad
                                </Text>
                            </View>
                            <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                    <Feather name="x" size={24} color={themeColorIcons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[Theme.styles.mv10, { borderBottomWidth: 1, borderBottomColor: '#CCC', }]}>
                            <View style={[Theme.styles.mh20, Theme.styles.mv10]}>
                                <View >
                                    <View>
                                        <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Habilidad</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Habilidad"
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
                                        // style={[themeCards, Theme.styles.borde1, Theme.styles.fs16, Theme.styles.pv10, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
                                        // theme={{ colors: { text: themeCardsText.color } }}
                                        />
                                    </View>
                                </View>
                                <View style={[Theme.styles.mv10]}>
                                    <View>
                                        <Text style={[Theme.styles.bold, themeCardsText, Theme.styles.fs17]}>Progreso</Text>
                                    </View>
                                    <View style={[Theme.styles.flexRow, Theme.styles.mt10]}>
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
                                        <View style={[themeCards, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.ph10, Theme.styles.positionAbsolute, { right: 3, top: 20, height: '70%' }]}>
                                            <Text style={[Theme.styles.bold, Theme.styles.fs20, themeCardsText]}>%</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[Theme.styles.mv10]}>
                                    <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17]}>Categoría</Text>
                                    <View style={[Theme.styles.borde1, themeBordeSelectPicker, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                                        <Picker
                                            style={[themeCards, themeCardsText]}
                                            mode='dropdown'
                                            selectedValue={selectNivel}
                                            onValueChange={(valor) => setSelectNivel(valor)}
                                            dropdownIconColor={themeCardsText.color}
                                        >
                                            <Picker.Item style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} label='Selecciona Categoría' />
                                            <Picker.Item label='Selecciona Categoría' />

                                        </Picker>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={[Theme.styles.mv10, Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
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
        // </View>

    )
}

export default ModalHabilidadesH