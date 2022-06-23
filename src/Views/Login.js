import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import Theme from '../Theme/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//Helpers
import DetectarTema from '../helpers/DetectarTema';
import ValidarEmail from '../helpers/ValidarEmail';
import ValidadarPassword from '../helpers/ValidarPassword';


import FormularioLogin from '../components/FormularioLogin';

const Login = ({ navigation }) => {
    const { themeTextStyle, themeContainerStyle, themeButtons, themeFormularios, themeTextFormularios } = DetectarTema();

    return (
        <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle, Theme.styles.justifyCenter]}>
            <StatusBar style='auto' />
            <View style={[Theme.styles.flex1, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                <View style={[Theme.styles.w100, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                    <FormularioLogin navigation={navigation} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login