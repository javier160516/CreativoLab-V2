import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import CategoriesComponent from '../components/CategoriesComponent';
import SkillsComponent from '../components/SkillsComponent';
import { Switch } from 'react-native-paper';
import axios from 'axios';
const Skills = () => {
  const [listCategories, setListCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [switchVisible, setSwitchVisible] = useState(false)
  const { themeContainerStyle, themeCards, themeCardsText, themeTextStyle } = DetectarTema();

  const moduleEnable = async () => {
    try {
      const enable = { skills_enabled: !switchVisible }
      await axios.put('http://dev.creativolab.com.mx/api/v1/modules/skills/toggle', enable);
      setSwitchVisible(!switchVisible);
    } catch (error) {
      if (error.response.data.status == 401) {
        Alert.alert(
          'No Autenticado',
          'Parece que no estás autenticado, por favor, inicia sesión',
          [{
            text: 'Iniciar Sesión',
            onPress: () => {
              setLogueado(false);
              AsyncStorage.clear();
            }
          }])
      } else {
        Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok' }]);
      }
    }
  }
  return (
    <SafeAreaView style={[themeContainerStyle, Theme.styles.flex1]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.mb20]}>
        <Text style={[Theme.styles.fsTitle3, themeTextStyle, Theme.styles.bold]}>Experiencia</Text>
        <Switch
          value={switchVisible}
          onValueChange={moduleEnable}
          color={Theme.colors.azul}
          trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
        />
      </View>
      <ScrollView>
        <CategoriesComponent
          listCategories={listCategories}
          setListCategories={setListCategories}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
        <SkillsComponent />
      </ScrollView>
    </SafeAreaView>

  )
}

export default Skills;
