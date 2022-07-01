import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Pressable, Text, ScrollView } from "react-native";
import { Card, Switch } from "react-native-paper";
import Theme from "../Theme/Theme";
import DetectarTema from "../helpers/DetectarTema";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { View } from "react-native-animatable";
import ModalEducation from "../components/ModalEducation";
import EstudiosComponent from "../components/EstudiosComponent";

const Education = () => {
  const { themeContainerStyle, themeTextStyle, themeCards } = DetectarTema();
  const [modalVisible, setModalVisible] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [educacions, setEducacions] = useState([])
  useEffect(() => {
    const obtenerEducacion = async () => {
      try {
        const respuesta = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/education');
        setEducacions(respuesta.data.degrees);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerEducacion();
  }, [])

  const onToggleSwitch = () => setSwitchVisible(!switchVisible);
  return (
    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.mv20]}>
        <Text style={[Theme.styles.fsTitle3, themeTextStyle, Theme.styles.bold]}>Estudios</Text>
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
            <Text style={[Theme.styles.fs20, themeTextStyle, Theme.styles.bold]}>Mis Estudios</Text>
            <Pressable
              style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.mv20, Theme.styles.bordeRedondo1]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={[Theme.colors.WhiteColor, Theme.styles.fs15]}> <AntDesign name="plus" size={16} color='white' /> Añadir</Text>
            </Pressable>
          </View>
          {educacions.map(educacion => (
            <EstudiosComponent
              key={educacion.id}
              educacions={educacion}
            />
          ))}

        </View>
      </ScrollView>
      <ModalEducation
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default Education;
