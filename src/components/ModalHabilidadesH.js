import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, TextInput, Pressable } from 'react-native'
import Theme from '../Theme/Theme'
import { Picker } from "@react-native-picker/picker";
import { Feather } from '@expo/vector-icons';

const ModalHabilidadesH = ({ showModalSkills, setShowModalSkills }) => {
    const [selectNivel, setSelectNivel] = useState('');
    return (
        <View style={[Theme.styles.flex1]}>
            <Modal
                // style={[Theme.styles.alignCenter, Theme.styles.justifyCenter]}
                animationType="fade"
                transparent={true}
                visible={showModalSkills}
                onRequestClose={() => {
                    setShowModalSkills(false);
                }}
            >

                <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                    <View style={[Theme.styles.bordeRedondo2, { backgroundColor: 'white', width: '90%' }]}>
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
                                            Theme.styles.textCenter
                                        ]}
                                    >
                                        Añadir Habilidad
                                    </Text>
                                </View>
                                <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                                    <TouchableOpacity onPress={() => setShowModalSkills(!showModalSkills)}>
                                        <Feather name="x" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[ Theme.styles.mv10, { borderBottomWidth: 1, borderBottomColor: '#CCC', }]}>
                                <View style={[Theme.styles.mh20, Theme.styles.mv10]}>
                                    <View >
                                        <View>
                                            <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Habilidad</Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder="Habilidad"
                                                textAlign='center'
                                                mode="outlined"
                                                selectionColor={Theme.colors.azul}
                                                outlineColor={Theme.colors.bordeTextInput}
                                                activeOutlineColor={Theme.colors.azul}
                                                returnKeyType='next'
                                                underlineColor="transparent"
                                                style={[Theme.colors.backgroundBlanco, Theme.styles.borde1, Theme.styles.fs16, Theme.styles.pv10, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
                                            />
                                        </View>
                                    </View>
                                    <View style={[Theme.styles.mv10]}>
                                        <View>
                                            <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Progreso</Text>
                                        </View>
                                        <View style={[Theme.styles.flexRow, Theme.styles.mt10]}>
                                            <TextInput
                                                placeholder="Progreso"
                                                textAlign='center'
                                                mode="outlined"
                                                keyboardType='numeric'
                                                selectionColor={Theme.colors.azul}
                                                outlineColor={Theme.colors.bordeTextInput}
                                                activeOutlineColor={Theme.colors.azul}
                                                returnKeyType='next'
                                                underlineColor="transparent"
                                                style={[Theme.colors.backgroundBlanco, Theme.styles.flex1, Theme.styles.borde1, Theme.styles.fs16, Theme.styles.pv10, Theme.styles.bordeRedondo1]}
                                            />
                                            <View style={[Theme.colors.backgroundGray, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.ph10, Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.positionAbsolute, { right: 0, height: '100%', borderLeftWidth: 0 }]}>
                                                <Text style={[Theme.styles.bold, Theme.styles.fs20]}>%</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[Theme.styles.mv10]}>
                                        <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Categoría</Text>
                                        <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                                            <Picker
                                                style={[Theme.colors.backgroundBlanco]}
                                                mode='dropdown'
                                                selectedValue={selectNivel}
                                                onValueChange={(valor) => setSelectNivel(valor)}
                                            >
                                                <Picker.Item label='Selecciona Categoría' />
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
        </View>

    )
}

export default ModalHabilidadesH