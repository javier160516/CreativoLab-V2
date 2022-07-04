import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import Theme from '../Theme/Theme';
import { Modal, Text, Pressable, View, ScrollView, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from './TextInput';
import DetectarTema from "../helpers/DetectarTema";
import YearsList from "../components/YearsList";
import axios from 'axios';
const ModalEducation = ({ modalVisible, setModalVisible, levels, yearsList }) => {
  const [level, setLevel] = useState('')
  const [degree, setDegree] = useState({ value: '', error: '' });
  const [institute, setInstitute] = useState({ value: '', error: '' });
  const [startedAt, setStartedAt] = useState(0);
  const [endedAt, setEndedAt] = useState(0);
  const [details, setDetails] = useState('')
  const { themeContainerStyle, themeCardsText, themeCards, themeBordeSelectPicker, themeBorderActiveInput, themeBorderSelectionInput,
    themeBorderOutlineInput } = DetectarTema();

  let levelError = '';
  let degreeError = '';
  const handleSubmit = async () => {
    const createStudy = {
      level: level,
      degree: degree.value,
      institute: institute.value,
      started_at: parseInt(startedAt),
      ended_at: parseInt(endedAt),
      details: details,
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      console.log(createStudy);
      await axios.post('https://dev.creativolab.com.mx/api/v1/modules/education', createStudy)
    } catch (error) {
      console.log(error.response.data.errors.degree);
      levelError = error.response.data.errors.degree;
      degreeError = error.response.data.errors.degree;
      // levelError = error.response.errors.level ?? '';
      setDegree({...degree, error: degreeError});

    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[Theme.styles.flex1, themeContainerStyle]}>
          <ScrollView>
            <Text style={[Theme.styles.fs22, Theme.styles.textCenter, Theme.styles.mt40, Theme.styles.mb20, Theme.styles.semiBold, themeCardsText]}>
              Añadir Nivel Educativo
            </Text>
            <View style={[Theme.styles.mh30, Theme.styles.mv30]}>
              <View style={Theme.styles.mb10}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Nivel Escolar</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={level}
                    onValueChange={(value) => setLevel(value)}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selcciona Tu Máximo Nivel --' key={0} value={0} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    {levels.map((level) => (

                      <Picker.Item label={level} key={level} value={level} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    ))}
                  </Picker>
                </View>
                  {levelError === '' ? <Text style={{color: 'white'}}>{levelError}</Text> : null}
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Titulo</Text>
                <TextInput
                  placeholder="Titulo"
                  mode="outlined"
                  selectionColor={themeBorderSelectionInput}
                  outlineColor={themeBorderOutlineInput}
                  activeOutlineColor={themeBorderActiveInput}
                  returnKeyType='next'
                  underlineColor="transparent"
                  placeholderTextColor={Theme.colors.gris}
                  style={[Theme.styles.mt10, themeCards]}
                  theme={{ colors: { text: themeCardsText.color } }}
                  value={degree.value}
                  onChangeText={(degree) => setDegree({ value: degree, error: '' })}
                  error={!!degree.error}
                  errorText={degree.error}
                />
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Institución</Text>
                <TextInput
                  placeholder="Institutción"
                  mode="outlined"
                  selectionColor={themeBorderSelectionInput}
                  outlineColor={themeBorderOutlineInput}
                  activeOutlineColor={themeBorderActiveInput}
                  returnKeyType='next'
                  underlineColor="transparent"
                  placeholderTextColor={Theme.colors.gris}
                  style={[Theme.styles.mt10, themeCards]}
                  theme={{ colors: { text: themeCardsText.color } }}
                  value={institute.value}
                  onChangeText={(institute) => setInstitute({ value: institute, error: '' })}
                />
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Inicio</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={startedAt}
                    onValueChange={(value) => setStartedAt(value)}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selecciona Año Inicio --' key={0} value={0} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2022' key='2022' value='2022' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2021' key='2021' value='2021' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2020' key='2020' value='2020' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2019' key='2019' value='2019' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />

                    {/* {yearsList.map(years => (
                      <Picker.Item label={years.id} key={years.id} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    ))} */}

                  </Picker>
                </View>
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Culminación</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                  <Picker
                    mode='dropdown'
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                    selectedValue={endedAt}
                    onValueChange={(value) => setEndedAt(value)}
                  >
                    <Picker.Item label='-- Selecciona Año Termino --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2022' key='2022' value='2022' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2021' key='2021' value='2021' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2020' key='2020' value='2020' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2019' key='2019' value='2019' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                  </Picker>
                </View>
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Detalles</Text>
                <TextInput
                  multiline={true}
                  placeholder="Detalles..."
                  mode="outlined"
                  selectionColor={themeBorderSelectionInput}
                  outlineColor={themeBorderOutlineInput}
                  activeOutlineColor={themeBorderActiveInput}
                  returnKeyType='next'
                  underlineColor="transparent"
                  placeholderTextColor={Theme.colors.gris}
                  style={[Theme.styles.mt10, themeCards]}
                  theme={{ colors: { text: themeCardsText.color } }}
                  value={details}
                  onChangeText={value => setDetails(value)}

                />
              </View>
              {/* Botones de Cancelar y Guardar */}
              <View style={[Theme.styles.flexRow, Theme.styles.mv30,]}>
                <Pressable style={[Theme.styles.flex1,
                Theme.colors.backgroundRed,
                Theme.styles.bordeRedondo1,
                Theme.styles.mh10,]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.mh10]}
                  onPress={() => handleSubmit()}
                >
                  <Text
                    style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Guardar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
      fontSize: 13,
      color: '#F32424',
      paddingTop: 8,
  },
})

export default ModalEducation;