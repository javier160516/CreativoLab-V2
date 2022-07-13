import React, { useState, useEffect } from 'react'
import { Pressable, View, ScrollView, Text, SafeAreaView, Alert } from 'react-native';
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

const Testimonials = () => {
  const [showModal, setShowModal] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [listTestimonials, setListTestimonials] = useState([]);
  const [testimonial, setTestimonial] = useState({});
  const { themeButtons, themeContainerStyle, themeTextStyle, themeCards, themeBorderTestimonials } = DetectarTema();
  const { setLogueado } = useLogin();
  useEffect(() => {
    getTestimonials();
    const getModuleEnable = async () => {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/dashboard');
      response.data.user.are_testimonials_enabled === 1 ? setSwitchVisible(true) : setSwitchVisible(false);
    }
    getModuleEnable();
  }, [])

  useEffect(() => {
    getTestimonials();
  }, [listTestimonials])

  const getTestimonials = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/testimonials');
      setListTestimonials(response.data.testimonials);
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
    try{
      const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/testimonials/${id}`);
      setTestimonial(response.data.testimonial);
    }catch(error){
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
            if(response.data.status == 200){
              Alert.alert('¡Testimonial Eliminado!', 'El registro se ha eliminado correctamente', [{text: 'Ok'}]);
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

  return (

    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.mt10, Theme.styles.mb20]}>
        <Text style={[Theme.styles.fsTitle3, themeTextStyle, Theme.styles.bold]}>Testimonios</Text>
        <Switch
          value={switchVisible}
          onValueChange={moduleEnable}
          color={Theme.colors.azul}
          trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
        />
      </View>
      <ScrollView>
        <View style={[Theme.styles.mh20, Theme.styles.mb20, Theme.styles.mt10, Theme.styles.bordeRedondo1, themeCards, Theme.styles.pt10, Theme.styles.pb20, Theme.styles.borde1, themeBorderTestimonials]}>
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
              La cantidad máxima de testimonio que puededs agregar son 4.
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

      />
    </SafeAreaView>


  )
}

export default Testimonials;
