import React, { useState, useEffect } from 'react'
import { Pressable, View, ScrollView, Text, SafeAreaView, Alert, RefreshControl } from 'react-native';
import ModalTestimonials from '../components/ModalTestimonials';
import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import { StatusBar } from "expo-status-bar";
import { Card, Switch } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import Testimonial from '../components/Testimonial';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Testimonials = () => {
  const [showModal, setShowModal] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [listTestimonials, setListTestimonials] = useState([]);
  const [testimonial, setTestimonial] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const { themeButtons, themeContainerStyle, themeTextStyle, themeCards, themeBorderTestimonials } = DetectarTema();
  const { setLogueado } = useLogin();
  useEffect(() => {
    getTestimonials();
  }, [])

  const getTestimonials = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/testimonials');
      setListTestimonials(response.data.testimonials);
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

  const getTestimonial = async (id) => {
    setShowModal(true);
    try {
      const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/testimonials/${id}`);
      setTestimonial(response.data.testimonial);
    } catch (error) {
      console.log(error);
    }
  }

  const moduleEnable = async () => {
    try {
      const enable = { testimonials_enabled: !switchVisible }
      await axios.put('http://dev.creativolab.com.mx/api/v1/modules/testimonials/toggle', enable);
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

  const deleteTestimonial = async id => {
    Alert.alert('¿Desea Eliminar este Testimonial?',
      'Una vez eliminado este testimonial, no se podrá recuperar',
      [{ text: 'Cancelar', style: 'cancel' },
      {
        text: 'Si, eliminar',
        onPress: async () => {
          try {
            const response = await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/testimonials', { data: { id: parseInt(id) } });
            if (response.data.status == 200) {
              Alert.alert('¡Testimonial Eliminado!', 'El registro se ha eliminado correctamente', [{ text: 'Ok' }]);
            }
            const testimonialsUpdated = listTestimonials.filter(testimonialState => testimonialState.id !== id);
            setListTestimonials(testimonialsUpdated);
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
              Alert.alert('¡Error!', 'Lo sentimos, por favor, intente más tarde', [{ text: 'Ok' }]);
            }
          }
        }
      }
      ])
  }
  //Refrescar Registros
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setListTestimonials([]);
    getTestimonials();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (

    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.mt10, Theme.styles.mb20]}>
          <Text style={[Theme.styles.fsTitle3, themeTextStyle, Theme.styles.bold]}>Testimonios</Text>
          <Switch
            value={switchVisible}
            onValueChange={moduleEnable}
            color={Theme.colors.azul}
            trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
          />
        </View>

        <View style={[Theme.styles.mh10, Theme.styles.mb10, Theme.styles.mt10, Theme.styles.bordeRedondo1, themeCards, Theme.styles.pt10, Theme.styles.pb20, Theme.styles.borde2, themeBorderTestimonials]}>
          <View style={[Theme.styles.mh20, Theme.styles.mb20]}>
            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween]}>
              <Text style={[Theme.styles.fs20, themeTextStyle, Theme.styles.bold]}>Testimonios</Text>
              <Pressable
                style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.mv20, Theme.styles.bordeRedondo1]}
                onPress={() => setShowModal(true)}
              >
                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs15]}> <AntDesign name="plus" size={16} color='white' /> Añadir</Text>
              </Pressable>

            </View>
            <Text style={[themeTextStyle, Theme.styles.fs15]}>
              Este módulo es una recopilación de todos los testimonio que posees.
              La cantidad máxima de testimonio que puedes agregar son 5.
            </Text>
          </View>
          {listTestimonials.map(testimonials => (
            <Testimonial
              key={testimonials.id}
              testimonials={testimonials}
              deleteTestimonial={deleteTestimonial}
              getTestimonial={getTestimonial}
            />
          ))}
        </View>
      </ScrollView>
      <ModalTestimonials
        showModal={showModal}
        setShowModal={setShowModal}
        listTestimonials={listTestimonials}
        setListTestimonials={setListTestimonials}
        testimonial={testimonial}
        setTestimonial={setTestimonial}
        getTestimonials={getTestimonials}
      />
    </SafeAreaView>


  )
}

export default Testimonials;
