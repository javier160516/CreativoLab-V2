import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text, Alert, RefreshControl } from 'react-native';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import CategoriesComponent from '../components/Skills/CategoriesComponent';
import SkillsComponent from '../components/Skills/SkillsComponent';
import { Switch } from 'react-native-paper';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};


const Skills = () => {
  const [listCategories, setListCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [switchVisible, setSwitchVisible] = useState(false);
  const [listSkills, setListSkills] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { themeContainerStyle, themeCards, themeCardsText, themeTextStyle } = DetectarTema();
  const { setLogueado } = useLogin();

  useEffect(() => {
    getCategories();
    getSkills();
  }, [])

  //GET CATEGORIES
  const getCategories = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/skills/categories');
      if (response.data.status == 200) {
        setListCategories(response.data.categories);
      }
    } catch (error) {
      if (error.response.data.status == 401) {
        Alert.alert(
          'No Autenticado',
          'Parece que no estás autenticado, por favor, inicia sesión',
          [
            {
              text: 'Iniciar Sesión',
              onPress: () => {
                setLogueado(false);
                AsyncStorage.clear();
              }
            }
          ]
        )
      } else {
        Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intentelo más tarde', [{ text: 'Ok' }]);
      }
    }
  }

  /** GET SKILLS **/
  const getSkills = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/skills');
      if (response.data.status == 200) {
        setListSkills(response.data.skills);
        response.data.module_status === 1 ? setSwitchVisible(true) : setSwitchVisible(false);
      }
    } catch (error) {
      if (error.response.data.status == 401) {
        Alert.alert(
          'No Autenticado',
          'Parece que no estás autenticado, por favor, inicia sesión',
          [
            {
              text: 'Iniciar Sesión',
              onPress: () => {
                setLogueado(false);
                AsyncStorage.clear();
              }
            }
          ]
        )
      } else {
        Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok' }])
      }
    }
  }

  const moduleEnable = async () => {
    try {
      const enable = { skills_enabled: !switchVisible }
      const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/skills/toggle', enable);
      if (response.data.status == 200) {
        Alert.alert('Cambio Exitoso', response.data.message, [{ text: 'Ok' }]);
        setSwitchVisible(!switchVisible);
      }
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
      } else if (error.response.data.status == 403) {
        Alert.alert('¡Lo sentimos!', error.response.data.message, [{ text: 'Ok' }]);
      }
      else {
        Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok' }]);
      }
    }
  }

  //Refrescar Registros
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setListCategories([]);
    setListSkills([]);
    getCategories();
    getSkills();
    wait(1000).then(() => setRefreshing(false));
  }, []);
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
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <CategoriesComponent
          listCategories={listCategories}
          setListCategories={setListCategories}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          getCategories={getCategories}
          getSkills={getSkills}
        />
        <SkillsComponent
          listCategories={listCategories}
          setListCategories={setListCategories}
          listSkills={listSkills}
          setListSkills={setListSkills}
          getSkills={getSkills}
        />
      </ScrollView>
    </SafeAreaView>

  )
}

export default Skills;
