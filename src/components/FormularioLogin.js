import React, { useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import Theme from '../Theme/Theme';
//Helpers
import DetectarTema from '../helpers/DetectarTema';
import ValidarEmail from '../helpers/ValidarEmail';
import ValidadarPassword from '../helpers/ValidarPassword';

//Componentes
import ButtonRegresar from '../components/Buttonregresar'
import TextInput from '../components/TextInput';

const FormularioLogin = ({ navigation }) => {
    const { themeTextStyle, themeContainerStyle, themeButtons, themeFormularios, themeTextFormularios } = DetectarTema();

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const handleSubmit = () => {
        const emailError = ValidarEmail(email.value);
        const passwordError = ValidadarPassword(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        setTimeout(() => {
            setModalCarga(false);
            navigation.navigate('Index')
        }, 2000);
    }

    const irARegistro = () => {
        navigation.navigate('Registro')
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