import React, { useState, useEffect } from "react";
import { SafeAreaView, Pressable, Text, ScrollView, Alert, View, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Switch } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Theme from "../Theme/Theme";
import DetectarTema from "../helpers/DetectarTema";
import EducationComponent from "../components/Education/EducationComponent";
import { useLogin } from '../context/LoginProvider';
import ObtenerYears from "../helpers/ObtenerYears";
import ModalEducation from "../components/Education/ModalEducation";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Education = () => {
  const { themeContainerStyle, themeTextStyle, themeCards } = DetectarTema();
  const [modalVisible, setModalVisible] = useState(false);
  const [switchVisible, setSwitchVisible] = useState('');
  const [educations, setEducations] = useState([]);
  const [education, setEducation] = useState({})
  const [levels, setLevels] = useState([]);
  const [btnVisible, setBtnVisible] = useState(false);
  const { setLogueado } = useLogin();
  const [yearsList, setYearsList] = useState(ObtenerYears());
  const [educationEnable, setEducationEnable] = useState(0)
  const [refreshing, setRefreshing] = useState(false);

  const getEducations = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/education');
      setEducations(response.data.studies);
      setLevels(response.data.levels);
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
  useEffect(() => {
    getEducations();
  }, [])

  const getStudy = async id => {
    setModalVisible(true);
    try {
      const respuesta = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/education/${id}`);
      setEducation(respuesta.data.study);
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
            const response = await axios.delete(`http://dev.creativolab.com.mx/api/v1/modules/education`, { data: { id: parseInt(id) } })
            if (response.data.status == 200) {
              setEducations([]);
              getEducations();
              Alert.alert('¡Estudio Eliminado!', 'El Estudio ha sido eliminado correctamente', [{ text: 'Ok' }]);
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
      }
      ])
  }

  const moduleEnable = async () => {
    try {
      const enable = { education_enabled: !switchVisible }
      const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/education/toggle', enable);
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
      }else if(error.response.data.status == 403){
        Alert.alert('¡Error!', error.response.data.message, [{text: 'Ok'}]);
      } else {
        Alert.alert('¡Hubo un error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok' }]);
      }
    }
  }

  //Refrescar Registros
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setEducations([]);
    getEducations();
    wait(1000).then(() => setRefreshing(false));
  }, []);

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
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
              <EducationComponent
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
        getEducations={getEducations}
      />
    </SafeAreaView>
  );
};

export default Education;
