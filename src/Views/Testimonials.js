import React, { useState, useEffect } from 'react'
import { Pressable, View, ScrollView, Text, SafeAreaView } from 'react-native';
import ModalTestimonials from '../components/ModalTestimonials';
import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import { StatusBar } from "expo-status-bar";
import { Switch } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const Testimonials = () => {
  const [showModalTestimonials, setShowModalTestimonials] = useState(false);
  const { themeButtons, themeContainerStyle, themeTextStyle, themeCards } = DetectarTema();
  const [switchVisible, setSwitchVisible] = useState(false);
  const onToggleSwitch = () => setSwitchVisible(!switchVisible);

  useEffect(() => {
    const getModuleEnable = async () => {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/dashboard');
      response.data.user.are_testimonials_enabled === 1 ? setSwitchVisible(true) : setSwitchVisible(false);
    }
    getModuleEnable();
  }, [])

  return (
    
     <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.mv20]}>
        <Text style={[Theme.styles.fsTitle3, themeTextStyle, Theme.styles.bold]}>Testimonios</Text>
        <Switch
          value={switchVisible}
          onValueChange={onToggleSwitch}
          color={Theme.colors.azul}
          trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
        />
      </View>
      <ScrollView>
        <View style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb20, themeCards]}>
          <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween, Theme.styles.mh20]}>
            <Text style={[Theme.styles.fs20, themeTextStyle, Theme.styles.bold]}>Testimonios</Text>
            <Pressable
              style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.mv20, Theme.styles.bordeRedondo1]}
              onPress={() => setShowModalTestimonials(true)}
            >
              <Text style={[Theme.colors.WhiteColor, Theme.styles.fs15]}> <AntDesign name="plus" size={16} color='white' /> Añadir</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <ModalTestimonials
        showModalTestimonials={showModalTestimonials}
        setShowModalTestimonials={setShowModalTestimonials}
      />
    </SafeAreaView>
     
   
  )
}

export default Testimonials;
