import { StatusBar } from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import DetectarTema from '../helpers/DetectarTema';
import axios from 'axios';
//Estilos
import Theme from '../Theme/Theme';

//Componentes
import FormularioRegistro from '../components/FormularioRegistro';

const Registro = ({ navigation }) => {

  const [codePhone, setCodePhone] = useState([]);
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const url = `https://dev.creativolab.com.mx/api/v1/register`;
      const resultado = await axios.get(url);
      setCodePhone(resultado.data.codes);
      setProfessions(resultado.data.professions);
    }
    obtenerDatos();
  }, [])

  const { themeTextStyle, themeContainerStyle, themeButtons, themeFormularios, themeTextFormularios } = DetectarTema();

  return (
    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle,  Theme.styles.pt20,Theme.styles.justifyCenter]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.flex1, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <View style={[Theme.styles.alignCenter ]}>
          <FormularioRegistro 
            navigation={navigation} 
            codePhone={codePhone}
            professions={professions}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Registro