import React, { useState } from "react";
import Theme from '../Theme/Theme';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

const ModalExperience = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectNivel, setSelectNivel] = useState('');
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={[Theme.styles.flex1, Theme.colors.backgroundBlanco]}>
                    <View style={[Theme.styles.mh20, Theme.styles.mv30]}>
                        <ScrollView>
                            <View
                                style={[Theme.styles.mv10]}
                            >
                                <Text
                                    style={[
                                        Theme.styles.bold,
                                        Theme.styles.fs17
                                    ]}
                                >
                                    Puesto
                                </Text>
                                <TextInput
                                    placeholder="Puesto"
                                    mode="outlined"
                                    selectionColor={Theme.colors.azul}
                                    outlineColor={Theme.colors.gris}
                                    activeOutlineColor={Theme.colors.azul}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    style={[Theme.colors.backgroundBlanco, Theme.styles.fs16, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
                                />
                            </View>
                            <View
                                style={[Theme.styles.mv10]}
                            >
                                <Text
                                    style={[
                                        Theme.styles.bold,
                                        Theme.styles.fs17
                                    ]}
                                >Empresa </Text>
                                <TextInput
                                    placeholder="Empresa"
                                    mode="outlined"
                                    selectionColor={Theme.colors.azul}
                                    outlineColor={Theme.colors.gris}
                                    activeOutlineColor={Theme.colors.azul}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    style={[Theme.colors.backgroundBlanco, Theme.styles.fs16, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
                                />
                            </View>
                            <View>
                                <Text
                                    style={[
                                        Theme.styles.bold,
                                        Theme.styles.fs17
                                    ]}
                                >Inicio </Text>
                                <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                                    <Picker
                                        style={[Theme.colors.backgroundBlanco, Theme.styles.fs16]}
                                        mode='dropdown'
                                        selectedValue={selectNivel}
                                        onValueChange={(valor) => setSelectNivel(valor)}
                                    >
                                        <Picker.Item label='Año' />
                                        <Picker.Item label='2010' />

                                    </Picker>
                                </View>
                            </View>
                            <View style={[Theme.styles.mv10]}>
                                <Text
                                    style={[
                                        Theme.styles.bold,
                                        Theme.styles.fs17
                                    ]}
                                >Culminación </Text>
                                <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                                    <Picker
                                        style={[Theme.colors.backgroundBlanco, Theme.styles.fs16]}
                                        mode='dropdown'
                                        selectedValue={selectNivel}
                                        onValueChange={(valor) => setSelectNivel(valor)}
                                    >
                                        <Picker.Item label='Año' />
                                        <Picker.Item label='2010' />

                                    </Picker>
                                </View>
                            </View>
                            <View
                                style={[Theme.styles.mv10]}
                            >
                                <Text
                                    style={[
                                        Theme.styles.bold,
                                        Theme.styles.fs17
                                    ]}
                                >Detalles </Text>
                                <TextInput
                                    multiline={true}
                                    placeholder="Detalles......."
                                    mode="outlined"
                                    selectionColor={Theme.colors.azul}
                                    outlineColor={Theme.colors.gris}
                                    activeOutlineColor={Theme.colors.azul}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    style={[Theme.colors.backgroundBlanco, Theme.styles.fs16, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
                                />
                            </View>
                            {/* Botones de Cancelar y Guardar */}
                            <View style={[Theme.styles.flexRow, Theme.styles.mv30,]}>
                                <Pressable style={[Theme.styles.flex1,
                                Theme.colors.backgroundRed,
                                Theme.styles.bordeRedondo1,
                                Theme.styles.mh10,]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Cancelar</Text>
                                </Pressable>
                                <Pressable style={[Theme.styles.flex1,
                                Theme.colors.backgroundBlue,
                                Theme.styles.bordeRedondo1,
                                Theme.styles.mh10
                                ]}>
                                    <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Guardar</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[Theme.styles.mh20, Theme.colors.backgroundBlue, Theme.styles.pv20, Theme.styles.mv20, Theme.styles.bordeRedondo2]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={[Theme.colors.WhiteColor, Theme.styles.textCenter, Theme.styles.fs17]}>+ Añadir Experiencia Laboral</Text>
            </Pressable>
        </View>
    );
};

export default ModalExperience;