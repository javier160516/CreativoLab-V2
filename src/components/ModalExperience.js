import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Theme from '../Theme/Theme';
import DetectarTema from "../helpers/DetectarTema";
import TextInput from "./TextInput";
import axios from "axios";
const ModalExperience = ({ modalVisible, setModalVisible, experiences, setExperiences, experience, setExperience }) => {
    const { themeCards, themeCardsText, themeBordeSelectPicker, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput } = DetectarTema();
    const [position, setPosition] = useState({ value: '', error: '' });
    const [company, setcompany] = useState({ value: '', error: '' });
    const [startedAt, setStartedAt] = useState('');
    const [endedAt, setEndedAt] = useState('');
    const [details, setDetails] = useState('');

    const [startedAtError, setStartedAtError] = useState('');
    const [endedAtError, setEndedAtError] = useState('');

    let positionErrorMessage = '', companyErrorMessage = '', startedAtErrorMessage = '', endedAtErrorMessage = '';
    useEffect(() => {
        if (experience?.id) {
            setPosition({value: experience.position, error: ''});
            setcompany({value: experience.company, error: ''});
            setStartedAt(experience.started_at);
            setEndedAt(experience.ended_at);
            setDetails(experience.details);
        }
    }, [experience])

    const handleSubmit = async () => {
        const createExperience = {
            position: position.value,
            company: company.value,
            started_at: startedAt,
            ended_at: endedAt,
            details: details
        }
        console.log(createExperience);
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (experience.id) {
            createExperience.id = experience.id;
            try {
                await axios.put('http://dev.creativolab.com.mx/api/v1/modules/experiences', createExperience, config);
                const experiencesUpdated = await experiences.map(experienceState => experienceState.id === createExperience.id ? createExperience : experienceState)
                await setExperiences(experiencesUpdated);
                await setExperience({})
                Alert.alert('¡Experiencia Editada!', 'La experiencia se ha editado correctamente', [{
                    text: 'Ok', onPress: () => clearStates()
                }])
            } catch (error) {
                positionErrorMessage = error.response.data.errors.position;
                companyErrorMessage = error.response.data.errors.company;
                startedAtErrorMessage = error.response.data.errors.started_at;
                endedAtErrorMessage = error.response.data.errors.ended_at;
                setPosition({ ...position, error: positionErrorMessage });
                setcompany({ ...company, error: companyErrorMessage });
                setStartedAtError(startedAtErrorMessage);
                setEndedAtError(endedAtErrorMessage);
            }
        } else {
            try {
                await axios.post('http://dev.creativolab.com.mx/api/v1/modules/experiences', createExperience, config);
                Alert.alert('¡Experiencia Agregada!', 'El registro se ha agregado correctamente', [{ text: 'Ok' }]);
                setExperiences([])
                clearStates();
            } catch (error) {
                positionErrorMessage = error.response.data.errors.position;
                companyErrorMessage = error.response.data.errors.company;
                startedAtErrorMessage = error.response.data.errors.started_at;
                endedAtErrorMessage = error.response.data.errors.ended_at;
                setPosition({ ...position, error: positionErrorMessage });
                setcompany({ ...company, error: companyErrorMessage });
                setStartedAtError(startedAtErrorMessage);
                setEndedAtError(endedAtErrorMessage);
            }
        }
    }

    const clearStates = () => {
        setModalVisible(false);
        setPosition({ value: '', error: '' });
        setcompany({ value: '', error: '' });
        setStartedAt('');
        setEndedAt('');
        setDetails('');
        setStartedAtError('');
        setEndedAtError('');
        positionErrorMessage = '';
        companyErrorMessage = '';
        startedAtErrorMessage = '';
        endedAtErrorMessage = '';
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={[Theme.styles.flex1, themeCards]}>
                <ScrollView>
                    <Text style={[Theme.styles.fs22, Theme.styles.textCenter, Theme.styles.mt40, Theme.styles.mb20, Theme.styles.semiBold, themeCardsText]}>
                        Agrega Tu Experiencia Laboral
                    </Text>
                    <View style={[Theme.styles.mh30, Theme.styles.mv30]}>
                        <View style={[Theme.styles.mb10]}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Puesto</Text>
                            <TextInput
                                placeholder="Puesto"
                                mode="outlined"
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={position.value}
                                onChangeText={(value) => setPosition({ value: value, error: '' })}
                                error={!!position.error}
                                errorText={position.error}
                            />
                        </View>
                        <View style={[Theme.styles.mv10]}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Empresa </Text>
                            <TextInput
                                placeholder="Empresa"
                                mode="outlined"
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={company.value}
                                onChangeText={(value) => setcompany({ value: value, error: '' })}
                                error={!!company.error}
                                errorText={company.error}
                            />
                        </View>
                        <View>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Inicio</Text>
                            <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, startedAtError ? Theme.styles.bordeRojo : null]}>
                                <Picker
                                    mode='dropdown'
                                    style={[themeCards, themeCardsText]}
                                    dropdownIconColor={themeCardsText.color}
                                    selectedValue={startedAt}
                                    onValueChange={(value) => {
                                        setStartedAt(value)
                                        setStartedAtError('');
                                    }}
                                >
                                    <Picker.Item label='-- Selecciona Año Inicio --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2022' key='2022' value='2022' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2021' key='2021' value='2021' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2020' key='2020' value='2020' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2019' key='2019' value='2019' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2018' key='2018' value='2018' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2017' key='2017' value='2017' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2016' key='2016' value='2016' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2015' key='2015' value='2015' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2014' key='2014' value='2014' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                </Picker>
                            </View>
                            {startedAtError ? <Text style={styles.error}>{startedAtError}</Text> : null}
                        </View>
                        <View style={[Theme.styles.mv10]}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Culminación</Text>
                            <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, endedAtError ? Theme.styles.bordeRojo : null]}>
                                <Picker
                                    mode='dropdown'
                                    style={[themeCards, themeCardsText]}
                                    dropdownIconColor={themeCardsText.color}
                                    selectedValue={endedAt}
                                    onValueChange={(value) => {
                                        setEndedAt(value)
                                        setEndedAtError('');
                                    }}
                                >
                                    <Picker.Item label='-- Selecciona Año Termino --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2022' key='2022' value='2022' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2021' key='2021' value='2021' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2020' key='2020' value='2020' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2019' key='2019' value='2019' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                    <Picker.Item label='2018' key='2018' value='2018' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                </Picker>
                            </View>
                            {endedAtError ? <Text style={styles.error}>{endedAtError}</Text> : null}
                        </View>
                        <View style={[Theme.styles.mv10]}>
                            <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Detalles</Text>
                            <TextInput
                                multiline={true}
                                placeholder='Detalles...'
                                mode="outlined"
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={details}
                                onChangeText={(value) => setDetails(value)}
                            />
                        </View>
                        {/* Botones de Cancelar y Guardar */}
                        <View style={[Theme.styles.flexRow, Theme.styles.mv30,]}>
                            <Pressable style={[Theme.styles.flex1,
                            Theme.colors.backgroundRed,
                            Theme.styles.bordeRedondo1,
                            Theme.styles.mh10,]}
                                onPress={() => clearStates()}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.mh10]}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Guardar</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    error: {
        fontSize: 13,
        color: '#F32424',
        paddingTop: 8,
    },
})

export default ModalExperience;