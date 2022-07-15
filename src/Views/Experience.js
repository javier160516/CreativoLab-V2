import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Pressable, Text, ScrollView, Alert, RefreshControl } from 'react-native';
import { Switch } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import ModalExperience from '../components/Experiences/ModalExperience';
import ExperiencesComponent from '../components/Experiences/ExperiencesComponent';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const { themeContainerStyle, themeTextStyle, themeCards } = DetectarTema()
  const { setLogueado } = useLogin();
  const [btnVisible, setBtnVisible] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getExperiences();
  }, [])

  // GET
  const getExperiences = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/experiences');
        setExperiences(response.data.experiences);
        response.data.module_status === 1 ? setSwitchVisible(true) : setSwitchVisible(false);
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
      }
    }
  }

  // GET EXPERIENCE
  const getExperience = async id => {
    setModalVisible(true);
    try {
      const response = await axios.get(`http://dev.creativoLab.com.mx/api/v1/modules/experiences/${id}`);
      if (response.data.status == 200) {
        setExperience(response.data.experience);
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
      } else if (error.response.data.status == 404) {
        Alert.alert('Estudio no encontrado', 'Lo sentimos, el estudio no fue encontrado', [{ text: 'Ok' }])
      }
    }
  }

  // DELETE
  const deleteExperience = id => {
    Alert.alert('¿Desea eliminar este registro?', 'La experiencia agregada se eliminará', [{ text: 'No', style: 'cancel' }, {
      text: 'Si, eliminar', onPress: async () => {
        try {
          const response = await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/experiences', { data: { id: parseInt(id) } })
          if(response.data.status == 200){
            setExperiences([]);
            setSwitchVisible(false);
            Alert.alert('Experiencia Eliminada', 'La experiencia ha sido eliminada correctamente', [{text: 'Ok'}]);
          }
          // const experiencesUpdated = experiences.filter(experienceState => experienceState.id !== id);
        } catch (error) {
          if (error.response.data.status == '401') {
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
          } else if (error.response.data.status == 404) {
            Alert.alert('Experiencia no encontrada', 'Lo sentimos, este registro no fue encontrado', [{ text: 'Ok' }])
          }
        }
      }
    }]);
    getExperiences();
  }

  const moduleEnable = async () => {
    try {
      const enable = { experiences_enabled: !switchVisible }
      const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/experiences/toggle', enable);
      if(response.data.status == 200){
        Alert.alert('Cambio Exitoso', response.data.message, [{text: 'Ok'}]);
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
        Alert.alert('¡Hubo un error!', error.response.data.message, [{ text: 'Ok' }]);
      }
    }
  }

  //Refrescar Registros
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setExperiences([]);
    getExperiences();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={[Theme.styles.flex1, Theme.styles.pv20, themeContainerStyle]}>
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
        <View style={[Theme.styles.mh20]}>
          <Text style={[themeTextStyle, Theme.styles.fs15, Theme.styles.mv10]}>
            • En esta sección podrás añadir tus experiencias, así como borrar y editarlas.
          </Text>
          <Text style={[themeTextStyle, Theme.styles.fs15, Theme.styles.mv10]}>
            • La cantidad máxima de experiencias que puededs agregar son 5.
          </Text>
        </View>

        <View style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb20, themeCards]}>
          <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween, Theme.styles.mh20]}>
            <Text style={[Theme.styles.fs20, themeTextStyle, Theme.styles.bold]}>Mi Experiencia</Text>
            <Pressable
              style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.mv20, Theme.styles.bordeRedondo1]}
              onPress={() => setModalVisible(true)}
              disabled={btnVisible}
            >
              <Text style={[Theme.colors.WhiteColor, Theme.styles.textCenter, Theme.styles.fs17]}><AntDesign name="plus" size={20} color="white" /> Añadir</Text>
            </Pressable>
          </View>
          {experiences.length === 0 ? (
            <Text style={[themeTextStyle, Theme.styles.textCenter, Theme.styles.mv60, Theme.styles.fs22]}>No hay registros existentes.</Text>
          ) : (
            experiences.map(experience => (
              <ExperiencesComponent
                key={experience.id}
                experience={experience}
                getExperience={getExperience}
                deleteExperience={deleteExperience}
              />
            ))
          )}
        </View>
      </ScrollView>
      <ModalExperience
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        experiences={experiences}
        setExperiences={setExperiences}
        experience={experience}
        setExperience={setExperience}
        getExperiences={getExperiences}
      />
    </SafeAreaView>
  )
}

export default Experience;
