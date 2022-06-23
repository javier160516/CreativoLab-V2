import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import DetectarTema from '../helpers/DetectarTema';

//Tema
import Theme from '../Theme/Theme';
//Fuentes
import { useFonts } from 'expo-font';
//Animaciones
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';

const BienvenidaScreen = ({ navigation }) => {
  const { themeTextStyle, themeContainerStyle, themeButtons } = DetectarTema();

  const [loaded] = useFonts({
    ContrailOneRegular: require('../../assets/fonts/ContrailOne-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }

  //Direccionar a los formularios
  const handleLogin = () => {
    navigation.navigate('Login');
  }
  const handleRegistro = () => {
    navigation.navigate('Registro');
  }


  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={[Theme.styles.flex1, Theme.styles.alignCenter, Theme.styles.justifyBetween, themeContainerStyle]}>
        <Animatable.View animation="bounceIn" duration={2000} style={[Theme.styles.flex1, Theme.styles.w80, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.mt60, Theme.styles.pt40]}>
          <Text style={[Theme.styles.fsTitle, Theme.styles.mb10, { fontFamily: 'ContrailOneRegular' }, themeTextStyle]}>
            CreativoLab
          </Text>
          <Text style={[Theme.styles.textCenter, Theme.styles.fs16, { fontFamily: 'Poppins' }, themeTextStyle]}>
            Vivamus semper volutpat fermentum. Nunc aliquet turpis nisi, at vulputate erat sagittis id.
          </Text>
        </Animatable.View>
        <Animatable.View animation='fadeInUpBig' duration={2000} style={[Theme.styles.w100, Theme.styles.alignCenter, Theme.styles.mb80]}>
          <Button
            mode='contained'
            style={[Theme.styles.w80, Theme.styles.mt10, Theme.styles.mb10]}
            color={Theme.colors.azul}
            onPress={() => handleLogin()}
          >
            <Text style={[Theme.styles.bold, Theme.styles.fs15]}>Iniciar Sesión</Text>
          </Button>
          <Button
            mode='outlined'
            style={[Theme.styles.w80, Theme.styles.mt10, Theme.styles.mb10, themeButtons]}
            color={Theme.colors.azul}
            onPress={() => handleRegistro()}
          >
            <Text style={[Theme.styles.bold, Theme.styles.fs15]}>Registrarse</Text>
          </Button>
        </Animatable.View>
      </SafeAreaView>
    </>
  )
}

export default BienvenidaScreen;