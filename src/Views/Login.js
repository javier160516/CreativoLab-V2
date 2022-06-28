import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native'
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import FormularioLogin from '../components/FormularioLogin';

const Login = ({ navigation }) => {
    const { themeContainerStyle } = DetectarTema();
    return (
        <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle, Theme.styles.justifyCenter]}>
            <StatusBar style='auto' />
            <View style={[Theme.styles.flex1, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                <View style={[Theme.styles.w100, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                    <FormularioLogin 
                        navigation={navigation} 
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login