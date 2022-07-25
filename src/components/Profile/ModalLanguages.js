import React, { useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import Theme from '../../Theme/Theme';
import { StatusBar } from 'expo-status-bar';
import DetectarTema from '../../helpers/DetectarTema';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import TextInput from '../TextInput';

const ModalLanguages = ({ showModal, setShowModal }) => {
    const { themeCards, themeCardsText, themeColorIcons, themeBordeSelectPicker, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput } = DetectarTema();
    const [loader, setLoader] = useState(false);
    const [language, setLanguage] = useState('');
    const [percentage, setPercentage] = useState({value: '', error: ''})
    const [languageError, setLanguageError] = useState('');

    const handleSubmit = async () => {
        setLoader(true);
    }


    const voidStates = () => {
        setShowModal(false);
        setLoader(false);
        setLanguage('');
        setPercentage({value: '', error: ''});
        setLanguageError('');
    }
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(false);
            }}
        >
            <StatusBar style='auto' />
            <View style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter]}>
                <View style={[Theme.styles.bordeRedondo1, themeCards, Theme.styles.pv30, Theme.styles.ph20, { width: '90%' }]}>
                    <View style={Theme.styles.pb20}>
                        <Text
                            style={[Theme.styles.bold, Theme.styles.fs20, Theme.styles.mv10, Theme.styles.textCenter, themeCardsText]}>
                            Agregar Idioma
                        </Text>
                    </View>
                    <View style={[Theme.styles.positionAbsolute, { right: 10, top: 10 }]}>
                        <Pressable onPress={() => voidStates()}>
                            <AntDesign name="close" size={24} color={themeColorIcons} />
                        </Pressable>
                    </View>
                    <View style={[Theme.styles.mb20]}>
                        <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17]}>Idioma</Text>
                        <View style={[Theme.styles.borde1, themeBordeSelectPicker, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                            <Picker
                                style={[themeCards, themeCardsText]}
                                dropdownIconColor={themeCardsText.color}
                                mode='dropdown'
                            >
                                <Picker.Item label='-- Selecciona un Idioma --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                            </Picker>
                        </View>
                    </View>
                    <View style={[Theme.styles.mb20]}>
                        <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17]}>Porcentaje</Text>
                        <View style={[themeCards, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
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
                            // value={progress.value}
                            // onChangeText={(progress) => setProgress({ value: progress, error: '' })}
                            // error={!!progress.error}
                            // errorText={progress.error}
                            />
                            <Text style={[Theme.styles.bold, Theme.styles.fs20, themeCardsText, Theme.styles.positionAbsolute, { right: 15, top: 30 }]}>%</Text>
                        </View>
                    </View>
                    {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : <></>}

                    <View style={[Theme.styles.mv10, Theme.styles.flexRow]}>
                        <Pressable
                            style={[Theme.styles.flex1, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.mr10, Theme.styles.pv10]}
                            onPress={() => voidStates()}
                        >
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor, Theme.styles.textCenter]}>
                                Cancelar
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.ml10, Theme.styles.pv10]}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor, Theme.styles.textCenter]}>
                                Agregar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalLanguages