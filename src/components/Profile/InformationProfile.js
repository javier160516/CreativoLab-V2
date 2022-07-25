import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native'
import Theme from '../../Theme/Theme';
import { Card } from 'react-native-paper';
import DetectarTema from '../../helpers/DetectarTema';
import TextInput from '../TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

function InformationProfile({ personalInformation }) {
    const { themeBorderOutlineInput, themeColorIcons, themeBordeSelectPicker, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput } = DetectarTema();
    const yearMax = new Date().getFullYear();
    const [about, setAbout] = useState({ value: '', error: '' });
    const [date, setDate] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
    const [address, setAddress] = useState({ value: '', error: '' });
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState('');
    const [newDate, setNewDate] = useState('');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setNewDate(`${year}-${month}-${day}`);

    const saveInformation = async () => {
        setDateOfBirthError('');
        const informationProfile = {
            about: about.value,
            date_of_birth: newDate,
            phone_number: phoneNumber.value,
            address: address.value
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            console.log(informationProfile);
            const response = await axios.put('http://dev.creativolab.com.mx/api/v1/profile', informationProfile, config)
            if (response.data.status == 200) {
                Alert.alert('¡Informacion Guardada', 'La información se ha guardado correctamente', [{ text: 'Ok' }]);
            }
        } catch (error) {
            if (error.response.data.status == 400) {
                setAbout({ ...about, error: error.response.data.errors.about });
                if(error.response.data.errors.date_of_birth){
                    setDateOfBirthError('Fecha no valida');
                }
                setPhoneNumber({ ...phoneNumber, error: error.response.data.errors.phone_number });
                setAddress({ ...address, error: error.response.data.errors.address });
            }
        }
    }
    return (
        <View>
            <Card style={[themeCards, Theme.styles.bordeRedondo1, Theme.styles.mv10, Theme.styles.pv10, Theme.styles.mh10]}>
                <Text style={[Theme.styles.fs20, Theme.styles.bold, Theme.styles.mh10, themeCardsText]}>Información del Perfil</Text>
                <Text style={[Theme.styles.mh10, themeCardsText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultrices odio, in tincidunt dui.
                    Donec velit diam, pharetra ac mattis maximus, iaculis id libero.</Text>
                <View style={[Theme.styles.pv20]}>
                    <Text style={[Theme.styles.mh10, themeCardsText]}>Sobre Mi</Text>
                    <TextInput
                        multiline={true}
                        placeholder='Sobre mi'
                        mode="outlined"
                        selectionColor={themeBorderSelectionInput}
                        outlineColor={themeBorderOutlineInput}
                        activeOutlineColor={themeBorderActiveInput}
                        returnKeyType='next'
                        underlineColor="transparent"
                        placeholderTextColor={Theme.colors.gris}
                        style={[Theme.styles.mh10, Theme.styles.mt10, themeCards]}
                        theme={{ colors: { text: themeCardsText.color } }}
                        value={about.value}
                        onChangeText={(value) => setAbout({ value: value, error: '' })}
                        error={!!about.error}
                        errorText={about.error}
                    />
                </View>
                <View>
                    <Text style={[Theme.styles.mh10, themeCardsText]}>Fecha de Nacimiento</Text>
                    <View style={[Theme.styles.mh10, Theme.styles.mt10]}>
                        <View style={[Theme.styles.borde1, themeBordeSelectPicker, Theme.styles.justifyCenter, Theme.styles.bordeRedondo1, dateOfBirthError ? Theme.styles.bordeRojo : null]}>
                            <Pressable
                                onPress={showDatepicker}
                                style={[themeCards, Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.pv10]}
                            >
                                <Text style={[themeCardsText, Theme.styles.fs17]}>{newDate}</Text>
                                <AntDesign name="calendar" size={30} color={themeColorIcons} />
                            </Pressable>
                        </View>
                        {dateOfBirthError ? <Text style={styles.error}>{dateOfBirthError}</Text> : null}
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                onChange={onChange}
                                maximumDate={new Date(yearMax, 10, 20)}
                            />
                        )}
                    </View>
                </View>
                <View>
                    <Text style={[Theme.styles.mh10, Theme.styles.pv10, themeCardsText]}>Numero de Telefono</Text>
                    <View>
                        <Text style={[Theme.styles.fs17, themeCardsText, Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]}>(+52)</Text>
                        <View style={[Theme.styles.mh10]}>
                            <TextInput
                                mode="outlined"
                                keyboardType='numeric'
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                maxLength={10}
                                placeholder='Ej: 9983401110'
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards, { paddingLeft: 50 }]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                value={phoneNumber.value}
                                onChangeText={(value) => setPhoneNumber({ value: value, error: '' })}
                                error={!!phoneNumber.error}
                                errorText={phoneNumber.error}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={[Theme.styles.mh10, Theme.styles.pv10, themeCardsText]}>Dirección</Text>
                    <TextInput
                        multiline={true}
                        mode="outlined"
                        selectionColor={themeBorderSelectionInput}
                        outlineColor={themeBorderOutlineInput}
                        activeOutlineColor={themeBorderActiveInput}
                        returnKeyType='next'
                        underlineColor="transparent"
                        placeholder='Dirección'
                        placeholderTextColor={Theme.colors.gris}
                        style={[Theme.styles.mh10, Theme.styles.mt10, themeCards]}
                        theme={{ colors: { text: themeCardsText.color } }}
                        value={address.value}
                        onChangeText={(value) => setAddress({ value: value, error: '' })}
                        error={!!address.error}
                        errorText={address.error}
                    />
                </View>
                <View style={[Theme.styles.pv20, Theme.styles.alignCenter]}>
                    <Pressable
                        style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30]}
                        onPress={() => saveInformation()}
                    >
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.semiBold]}>
                            Guardar Cambios
                        </Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        fontSize: 13,
        color: '#F32424',
        paddingTop: 8,
    },
})

export default InformationProfile