import React from 'react'
import { Text, View, Modal, Pressable, Image } from 'react-native'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import { Entypo } from '@expo/vector-icons';
import TextInput from '../TextInput';
import { Picker } from '@react-native-picker/picker';

const ModalPorjects = ({ showProjects, setShowProjects }) => {
    const { themeCards, themeBordeSelectPicker, themeCardsText, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput } = DetectarTema();
    return (
        <View style={[Theme.styles.flex1]}>
            <Modal
                animationType='slide'
                visible={showProjects}
                onRequestClose={() => setShowProjects(!showProjects)}
            >
                <View style={[Theme.styles.flex1, Theme.styles.mh20]}>
                    <Text style={[Theme.styles.textCenter, themeCardsText, Theme.styles.bold, Theme.styles.fs20, Theme.styles.pv10]}>Agregar Producto</Text>
                    <View style={[Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.pv20]}>
                        <Pressable style={[Theme.styles.alignCenter, Theme.styles.bordeRedondo1, Theme.styles.mv20, Theme.colors.backgroundGray, Theme.styles.pv30, Theme.styles.ph30]}>
                            <Entypo name="camera" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View>
                        <View style={[Theme.styles.pv10]} >
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Nombre del Proyecto</Text>
                            <TextInput
                                placeholder="Nombre del Proyecto"
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
                        <View>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Enlace</Text>
                            <TextInput
                                placeholder="Enlace"
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
                        <View style={[Theme.styles.pv10]}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Categoría</Text>
                            <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                                <Picker
                                    mode='dropdown'
                                    style={[themeCards, themeCardsText]}
                                    dropdownIconColor={themeCardsText.color}



                                >
                                    <Picker.Item label='---Seleccionar Tipo---' value='' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Descripción</Text>
                            <TextInput
                                placeholder="Descripción...."
                                textAlign='center'
                                mode="outlined"
                                multiline={true}
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
                        <View style={[Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.mv20]}>
                            <Pressable onPress={() => setShowProjects(!showProjects)} style={[Theme.styles.mh10, Theme.colors.backgroundRed, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                                <Text style={[Theme.styles.bold, Theme.styles.fs15, Theme.colors.WhiteColor]}>Cancelar</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowProjects(!showProjects)} style={[Theme.styles.mh10, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                                <Text style={[Theme.styles.bold, Theme.styles.fs15, Theme.colors.WhiteColor]}>Guardar</Text>
                            </Pressable>
                        </View>
                    </View>


                </View>

            </Modal>
        </View>

    )
}

export default ModalPorjects