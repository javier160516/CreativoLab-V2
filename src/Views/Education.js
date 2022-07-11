import React, { useState, useEffect } from "react";
import { SafeAreaView, Pressable, Text, ScrollView, Alert, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Switch } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Theme from "../Theme/Theme";
import DetectarTema from "../helpers/DetectarTema";
import ModalEducation from "../components/ModalEducation";
import EstudiosComponent from "../components/EstudiosComponent";
import { useLogin } from '../context/LoginProvider';
import ObtenerYears from "../helpers/ObtenerYears";

const Education = (props) => {
  const { themeContainerStyle, themeTextStyle, themeCards } = DetectarTema();
  const [modalVisible, setModalVisible] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [educations, setEducations] = useState([]);
  const [education, setEducation] = useState({})
  const [levels, setLevels] = useState([]);
  const [btnVisible, setBtnVisible] = useState(false);
  const { setLogueado } = useLogin();
  const [yearsList, setYearsList] = useState(ObtenerYears());

  // console.log(props.moduleEducation);

  const obtenerEducacion = async () => {
    try {
      const respuesta = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/education');
      setEducations(respuesta.data.studies);
      setLevels(respuesta.data.levels);

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
  useEffect(() => {
    obtenerEducacion();
  }, [])

  const educationsTotal = educations.length;
  useEffect(() => {
    obtenerEducacion();
    if (educationsTotal === 3) {
      setBtnVisible(true);
    } else {
      setBtnVisible(false);
    }
  }, [educations])

  const getStudy = async id => {
    setModalVisible(true);
    try {
      const respuesta = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/education/${id}`);
      setEducation(respuesta.data.degree);
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

  const deleteEducation = id => {
    Alert.alert('¿Deseas eliminar este estudio?',
      'El estudio agregado se eliminará',
      [{ text: 'No', style: 'cancel' },
      {
        text: 'Si, eliminar', onPress: async () => {
          try {
            await axios.delete(`http://dev.creativolab.com.mx/api/v1/modules/education`, { data: { id: parseInt(id) } })
            const studyUpdated = educations.filter(studyState => studyState.id !== id);
            setEducations(studyUpdated);
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
      }
      ])
  }

  const moduleEnable = async () => {
    try {
      const enable = { education_enabled: !switchVisible }
      await axios.put('http://dev.creativolab.com.mx/api/v1/modules/education/toggle', enable);
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
    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.mv20]}>
        <Text style={[Theme.styles.fsTitle3, themeTextStyle, Theme.styles.bold]}>Estudios</Text>
        <Switch
          value={switchVisible}
          onValueChange={moduleEnable}
          color={Theme.colors.azul}
          trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
        />
      </View>
      <ScrollView>
        <View style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb20, themeCards]}>
          <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween, Theme.styles.mh20]}>
            <Text style={[Theme.styles.fs20, themeTextStyle, Theme.styles.bold]}>Mis Estudios</Text>
            <Pressable
              style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.mv20, Theme.styles.bordeRedondo1]}
              onPress={() => setModalVisible(true)}
              disabled={btnVisible}
            >
              <Text style={[Theme.colors.WhiteColor, Theme.styles.fs15]}> <AntDesign name="plus" size={16} color='white' /> Añadir</Text>
            </Pressable>
          </View>
          {educations.length === 0 ? (
            <Text style={[themeTextStyle, Theme.styles.textCenter, Theme.styles.mv60, Theme.styles.fs22]}>No hay registros existentes.</Text>
          ) : (
            educations.map(education => (
              <EstudiosComponent
                key={education.id}
                educations={education}
                deleteEducation={deleteEducation}
                getStudy={getStudy}
              />
            )))}
        </View>
      </ScrollView>
      <ModalEducation
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        levels={levels}
        yearsList={yearsList}
        educations={educations}
        setEducations={setEducations}
        education={education}
        setEducation={setEducation}
        obtenerEducacion={obtenerEducacion}
      />
    </SafeAreaView>
  );
};

export default Education;
