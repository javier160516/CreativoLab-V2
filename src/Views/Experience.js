import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Pressable, Text, ScrollView, Alert } from 'react-native';
import { Switch } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import ModalExperience from '../components/ModalExperience';
import axios from 'axios';
import ExperiencesComponent from '../components/ExperiencesComponent';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const { themeContainerStyle, themeTextStyle, themeCards } = DetectarTema()
  const { setLogueado } = useLogin();
  const [btnVisible, setBtnVisible] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false)

  // GET
  const getExperiences = async () => {
    try {
      const respuesta = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/experiences');
      setExperiences(respuesta.data.experiences);
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
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getExperiences();
  }, [])

  const experiencesTotal = experiences.length
  useEffect(() => {
    getExperiences();
    if (experiencesTotal === 5) {
      setBtnVisible(true)
    } else {
      setBtnVisible(false);
    }
  }, [experiences])

  // GET EXPERIENCE
  const getExperience = async id => {
    setModalVisible(true);
    try {
      const response = await axios.get(`http://dev.creativoLab.com.mx/api/v1/modules/experiences/${id}`);
      setExperience(response.data.experience);
      console.log(response.data.experience);
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
        Alert.alert('Estudio no encontrado', 'Lo sentimos, el estudio no fue encontrado', [{ text: 'Ok' }])
      }
    }
  }

  // DELETE
  const deleteExperience = id => {
    Alert.alert('¿Desea eliminar este registro?', 'La experiencia agregada se eliminará', [{ text: 'No', style: 'cancel' }, {
      text: 'Si, eliminar', onPress: async () => {
        try {
          await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/experiences', { data: { id: parseInt(id) } })
          const experiencesUpdated = experiences.filter(experienceState => experienceState.id !== id);
          setExperiences(experiencesUpdated);
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
            Alert.alert('Estudio no encontrado', 'Lo sentimos, el estudio no fue encontrado', [{ text: 'Ok' }])
          }
        }
      }
    }]);
  }

  const moduleEnable = async () => {
    try {
      const enable = { experiences_enabled: !switchVisible }
      console.log(enable);
      await axios.put('http://dev.creativolab.com.mx/api/v1/modules/experiences/toggle', enable);
      setSwitchVisible(!switchVisible);
    } catch (error) {
      console.log(error.response.data);
    }
  }

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
      <ScrollView>
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
      />
    </SafeAreaView>
  )
}

export default Experience;
