import React, { useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import Theme from '../Theme/Theme';
//Helpers
import DetectarTema from '../helpers/DetectarTema';
import ValidarEmail from '../helpers/ValidarEmail';
import ValidadarPassword from '../helpers/ValidarPassword';

//Componentes
import ButtonRegresar from '../components/Buttonregresar'
import TextInput from '../components/TextInput';
import axios from 'axios';
import clienteAxios from '../config/axios';

const FormularioLogin = ({ navigation }) => {
    const { themeTextStyle, themeContainerStyle, themeButtons, themeFormularios, themeTextFormularios } = DetectarTema();

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const handleSubmit = async () => {
        const emailError = ValidarEmail(email.value);
        const passwordError = ValidadarPassword(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        const iniciarSesion = {
            email: email.value,
            password: password.value
        }
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
        try {
            await axios.post(`https://dev.creativolab.com.mx/api/v1/login`, iniciarSesion, config)
            
            // await clienteAxios.post('/login', iniciarSesion, config)
            console.log('Todo bien');
        } catch (error) {
            console.log(error.response.data.status);
            if(error.response.data.status ==='400'){
                Alert.alert('Credenciales Incorrectas', 'Las credenciales son incorrectas', [{text: 'Ok'}])
            }else if(error.response.data.status === '401'){
                Alert.alert('Cuenta no verificada', 'Tu cuenta aun no está verificada, por favor revisa tu email', [{text: 'Ok'}])
            }else{
                Alert.alert('Usuario no registrado', 'Si no tiene una cuenta, por favor cree una', [{text: 'Ok'}])
            }
        }
    }

    const irARegistro = () => {
        navigation.navigate('Registro')
        setEmail({value: '', error: ''})
        setPassword({value: '', error: ''})
    }
    return (
        <View style={[Theme.styles.w90, Theme.styles.sombra, Theme.styles.ph20, Theme.styles.pv20, Theme.styles.bordeRedondo1, themeFormularios]}>
            {/* <ButtonRegresar regresar={navigation.goBack} />
            <Text style={[Theme.styles.fsTitle3, Theme.styles.textCenter, Theme.styles.semiBold, Theme.styles.mt10, Theme.styles.mb20, themeTextFormularios]}>Iniciar Sesión</Text> */}
            <View style={Theme.styles.mv10}>
                <Text style={[Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Email: </Text>
                <TextInput
                    style={[!themeContainerStyle, Theme.styles.mt10]}
                    mode='outlined'
                    activeOutlineColor={Theme.colors.azul}
                    color={Theme.colors.azul}
                    label="Correo Electrónico"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
            </View>
            <View style={Theme.styles.mv10}>
                <Text style={[!themeTextStyle, Theme.styles.fs16, Theme.styles.bold, themeTextFormularios]}>Contraseña: </Text>
                <TextInput
                    style={[!themeContainerStyle, Theme.styles.mt10]}
                    mode='outlined'
                    activeOutlineColor={Theme.colors.azul}
                    label="Contraseña"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
            </View>
            <Button
                mode='contained'
                color={Theme.colors.azul}
                style={[Theme.styles.w100, Theme.styles.mt20, Theme.styles.mb20, Theme.styles.justifyCenter, !themeButtons]}
                onPress={() => handleSubmit()}
            >
                <Text style={Theme.styles.bold}>Iniciar Sesión</Text>
            </Button>

            <View style={[Theme.styles.flexRow, Theme.styles.justifyCenter, Theme.styles.mv10]}>
                <Text style={[themeTextFormularios, Theme.styles.fs16]}>¿No tienes cuenta?, </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => irARegistro()}
                >
                    <Text style={[themeTextFormularios, Theme.styles.fs16, Theme.colors.colorAzul, Theme.styles.bold]}>¡Registrate!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FormularioLogin