import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, TextInput, Pressable } from 'react-native'
import Theme from '../Theme/Theme'

import { Feather } from '@expo/vector-icons';


const ModalHabilidadesCategoria = ({ showModalCategory, setShowModalCategory }) => {
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
                    <View style={[Theme.styles.bordeRedondo1, { backgroundColor: 'white', width: '90%' }]}>
                        <View
                            style={[Theme.styles.mv10]}
                        >
                            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyCenter, { borderBottomWidth: 1, borderBottomColor: '#CCC', }]}>
                                <View >
                                    <Text
                                        style={[
                                            Theme.styles.bold,
                                            Theme.styles.fs17,
                                            Theme.styles.mv10,
                                            Theme.styles.textCenter
                                        ]}
                                    >
                                        Crear Categoría
                                    </Text>
                                </View>
                                <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                                    <TouchableOpacity onPress={() => setShowModalCategory(!showModalCategory)}>
                                        <Feather name="x" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', }}>
                                <View style={[Theme.styles.mh20,]}>
                                    <View style={[Theme.styles.mv10]}>
                                        <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Categoría</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Categoría"
                                            textAlign='center'
                                            mode="outlined"
                                            selectionColor={Theme.colors.azul}
                                            outlineColor={Theme.colors.bordeTextInput}
                                            activeOutlineColor={Theme.colors.azul}
                                            returnKeyType='next'
                                            underlineColor="transparent"
                                            style={[Theme.colors.backgroundBlanco, Theme.styles.borde1, Theme.styles.fs16, Theme.styles.mv20, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
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