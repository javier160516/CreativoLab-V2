import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text, Viewm, TouchableOpacity, StyleSheet, View } from 'react-native'
import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import { Picker } from '@react-native-picker/picker';
//Componentes
import Buttonregresar from './Buttonregresar'
import TextInput from './TextInput';
import { Button } from 'react-native-paper';

import ValidarCampoTexto from '../helpers/ValidarCampoTexto';
import ValidarCampoOpcional from '../helpers/ValidarCampoOpcional';
import ValidarTelefono from '../helpers/ValidarTelefono';
import ValidarPickers from '../helpers/ValidarPickers';
import ValidarEmail from '../helpers/ValidarEmail';
import ValidadarPassword from '../helpers/ValidarPassword';


const FormularioRegistro = ({ navigation, codePhone, professions }) => {
    const { themeTextStyle, themeButtons, themeFormularios, themeTextFormularios, themeColorIcons } = DetectarTema();
    const [firstName, setFirstName] = useState({ value: '', error: '' });
    const [middleName, setMiddleName] = useState({ value: '', error: '' });
    const [firstLastName, setFirstLastName] = useState({ value: '', error: '' });
    const [secondLastName, setSecondLastName] = useState({ value: '', error: '' });
    const [code, setCode] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [profession, setProfession] = useState(0);

    const [mensajeErrorCode, setMensajeErrorCode] = useState(false);
    const [mensajeErrorProfession, setMensajeErrorProfession] = useState(false);
    const [comparePassword, setComparePassword] = useState(false);
    const handleSubmit = () => {
        const firstNameError = ValidarCampoTexto(firstName.value);
        const middleNameError = ValidarCampoOpcional(middleName.value);
        const firstLastNameError = ValidarCampoTexto(firstLastName.value);
        const secondLastNameError = ValidarCampoOpcional(secondLastName.value);
        const phoneNumberError = ValidarTelefono(phoneNumber.value);
        const emailError = ValidarEmail(email.value);
        const passwordError = ValidadarPassword(password.value);
        const repeatPasswordError = ValidadarPassword(password.value);


        if (firstNameError || middleNameError || firstLastName || secondLastName || code == 0 || phoneNumber || email || password || confirmPassword || profession == 0) {
            setFirstName({ ...firstName, error: firstNameError });
            setMiddleName({ ...middleName, error: middleNameError });
            setFirstLastName({ ...firstLastName, error: firstLastNameError });
            setSecondLastName({ ...secondLastName, error: secondLastNameError });
            if (code == 0) {
                setMensajeErrorCode(true);
            }
            setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
            setEmail({...email, error: emailError});
            setPassword({...password, error: passwordError});
            setConfirmPassword({...confirmPassword, error: repeatPasswordError});
            if(password.value != confirmPassword.value){
                setComparePassword(true)
            }
            if(profession == 0){
                setMensajeErrorProfession(true);
            }
            return;
        }
    }


    const irALogin = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={[Theme.styles.w90, Theme.styles.sombra, Theme.styles.ph20, Theme.styles.bordeRedondo1, Theme.styles.mb40, themeFormularios]}>
            {/* <Buttonregresar regresar={navigation.goBack} /> */}
            {/* <Text style={[Theme.styles.fsTitle3, Theme.styles.textCenter, Theme.styles.semiBold, Theme.styles.mt10, Theme.styles.mb20, themeTextFormularios]}>Registrarse</Text> */}
            <View style={[Theme.styles.alignCenter, Theme.styles.mv30]}>
                {/* Primer nombre */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Primer Nombre*</Text>
                    <TextInput
                        label="Primer Nombre"
                        value={firstName.value}
                        onChangeText={(firstName) => setFirstName({ value: firstName, error: '' })}
                        error={!!firstName.error}
                        errorText={firstName.error}
                        keyboardType='default'

                    />
                </View>
                {/* Segundo Nombre */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Segundo Nombre</Text>
                    <TextInput
                        label="Segundo Nombre"
                        value={middleName.value}
                        onChangeText={(middleName) => setMiddleName({ value: middleName, error: '' })}
                        error={!!middleName.error}
                        errorText={middleName.error}
                        keyboardType='default'

                    />
                </View>
                {/* Primer Apellido */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Apellido Paterno*</Text>
                    <TextInput
                        label="Apellido Paterno"
                        value={firstLastName.value}
                        onChangeText={(firstLastName) => setFirstLastName({ value: firstLastName, error: '' })}
                        error={!!firstLastName.error}
                        errorText={firstLastName.error}
                    />
                </View>
                {/* Segundo Apellido */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Apellido Materno</Text>
                    <TextInput
                        label="Apellido Materno"
                        value={secondLastName.value}
                        onChangeText={(secondLastName) => setSecondLastName({ value: secondLastName, error: '' })}
                        error={!!secondLastName.error}
                        errorText={secondLastName.error}
                    />
                </View>
                {/* Lada */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Código</Text>
                    <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10, mensajeErrorCode ? Theme.styles.bordeRojo : null]}>
                        <Picker
                            dropdownIconColor={themeTextStyle}
                            style={[Theme.colors.backgroundBlanco]}
                            mode='dropdown'
                            selectedValue={code}
                            onValueChange={codePhone => {
                                setCode(codePhone)
                                setMensajeErrorCode(false)
                            }}
                        >
                            <Picker.Item label='-- Código --' value="0" color={themeTextFormularios} />
                            {codePhone.map(code => (
                                <Picker.Item key={code.id} label={code.short + ' (+' + code.code + ')'} value={code.id} color={themeTextFormularios} />
                            ))}
                        </Picker>
                    </View>
                    {mensajeErrorCode ? <Text style={styles.error}>Todos los campos son obligatorios</Text> : null}
                </View>
                {/* Telefono */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Número Telefónico</Text>
                    <TextInput
                        label="Número Teléfonico"
                        maxLength={10}
                        keyboardType='numeric'
                        value={phoneNumber.value}
                        onChangeText={(phoneNumber) => setPhoneNumber({ value: phoneNumber, error: '' })}
                        error={!!phoneNumber.error}
                        errorText={phoneNumber.error}
                    />
                </View>
                {/* Correo Electronico */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Correo Electrónico</Text>
                    <TextInput
                        label="Correo Electrónico"
                        value={email.value}
                        onChangeText={(email) => setEmail({ value: email, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                </View>
                {/* Contraseña */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Contraseña</Text>
                    <TextInput
                        label="Contraseña"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={(password) => setPassword({ value: password, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                    />
                    {comparePassword ? <Text style={styles.error}>Las contraseñas no coinciden</Text> : null}
                </View>
                {/* Confirmar Contraseña */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Confirmar Contraseña</Text>
                    <TextInput
                        label="Confirmar Contraseña"
                        returnKeyType="done"
                        value={confirmPassword.value}
                        onChangeText={(confirmPassword) => setConfirmPassword({ value: confirmPassword, error: '' })}
                        error={!!confirmPassword.error}
                        errorText={confirmPassword.error}
                        secureTextEntry
                    />
                    {comparePassword ? <Text style={styles.error}>Las contraseñas no coinciden</Text> : null}
                </View>
                {/* Profesión */}
                <View style={[Theme.styles.mv10, Theme.styles.w100]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Profesión</Text>
                    <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10,  mensajeErrorProfession ? Theme.styles.bordeRojo : null]}>
                        <Picker
                            dropdownIconColor={themeColorIcons}
                            style={[Theme.colors.backgroundBlanco]}
                            mode='dropdown'
                            selectedValue={profession}
                            onValueChange={profession => {
                                setProfession(profession)
                                setMensajeErrorProfession(false)
                            }}
                        >
                            <Picker.Item label='-- Seleccionar Profesión --' value="0" style={themeTextFormularios} />
                            {professions.map(prof => (
                                <Picker.Item key={prof.id} label={prof.profession} value={prof.id} style={themeTextFormularios} />
                            ))}
                        </Picker>
                    </View>
                        {mensajeErrorProfession ? <Text style={styles.error}>Este campos es obligatorio</Text> : null}
                </View>

                {/* BOTON SUBMIT */}
                <Button
                    mode='contained'
                    color={Theme.colors.azul}
                    style={[Theme.styles.w100, Theme.styles.mt20, Theme.styles.mb20, Theme.styles.justifyCenter, !themeButtons]}
                    onPress={() => handleSubmit()}
                >
                    <Text style={Theme.styles.bold}>Registrarse</Text>
                </Button>

                <View style={[Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.mv10]}>
                    <Text style={[themeTextFormularios, Theme.styles.fs16]}>¿Ya tienes cuenta?, </Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => irALogin()}
                    >
                        <Text style={[themeTextFormularios, Theme.styles.fs16, Theme.colors.colorAzul, Theme.styles.bold]}>¡Inicia Sesión!</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

export default FormularioRegistro