import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import Theme from '../../Theme/Theme';
import { Modal, Text, Pressable, View, ScrollView, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from '../TextInput';
import DetectarTema from "../../helpers/DetectarTema";
import axios from 'axios';
const ModalEducation = ({ modalVisible, setModalVisible, levels, yearsList, educations, setEducations, education, setEducation }) => {
  const { themeContainerStyle, themeCardsText, themeCards, themeBordeSelectPicker, themeBorderActiveInput, themeBorderSelectionInput,
    themeBorderOutlineInput } = DetectarTema();
  const [level, setLevel] = useState('')
  const [degree, setDegree] = useState({ value: '', error: '' });
  const [institute, setInstitute] = useState({ value: '', error: '' });
  const [startedAt, setStartedAt] = useState(0);
  const [endedAt, setEndedAt] = useState(0);
  const [details, setDetails] = useState('');
  const [loader, setLoader] = useState(false);

  const [levelError, setLevelError] = useState('');
  const [startedAtError, setStartedAtError] = useState('');
  const [endedAtError, setEndedAtError] = useState('');

  let levelErrorMessage = '';
  let degreeError = '';
  let instituteError = '';
  let startedAtErrorMessage = '';
  let endedAtErrorMessage = '';

  useEffect(() => {
    if (education?.id) {
      setLevel(education.level);
      setDegree({ value: education.degree, error: '' })
      setInstitute({ value: education.institute, error: '' });
      setStartedAt(education.started_at);
      setEndedAt(education.ended_at);
      setDetails(education.details);
    }
  }, [education])

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
    if (education.id) {
      createStudy.id = education.id;
      try {
        await axios.put('http://dev.creativolab.com.mx/api/v1/modules/education', createStudy, config)
        const studiesUpdated = await educations.map(educationState => educationState.id === createStudy.id ? createStudy : educationState);
        await setEducations(studiesUpdated)
        await setEducation({});
        Alert.alert('¡Estudio Editado!', 'El estudio se ha editado correctamente', [{
          text: 'Ok', onPress: () => voidStates()
        }])
      } catch (error) {
        levelErrorMessage = error.response.data.errors.level;
        degreeError = error.response.data.errors.degree;
        instituteError = error.response.data.errors.institute;
        startedAtErrorMessage = error.response.data.errors.started_at;
        endedAtErrorMessage = error.response.data.errors.ended_at;
        setDegree({ ...degree, error: degreeError });
        setLevelError(levelErrorMessage);
        setInstitute({ ...institute, error: instituteError })
        setStartedAtError(startedAtErrorMessage);
        setEndedAtError(endedAtErrorMessage);
      }
    } else {
      try {
        await axios.post('https://dev.creativolab.com.mx/api/v1/modules/education', createStudy, config)
        setEducations([])
        setEducation({});

        Alert.alert('¡Estudio Agregado!', 'El estudio se ha agregado correctamente', [{
          text: 'Ok', onPress: () => voidStates()
        }])
      } catch (error) {
        levelErrorMessage = error.response.data.errors.level;
        degreeError = error.response.data.errors.degree;
        instituteError = error.response.data.errors.institute;
        startedAtErrorMessage = error.response.data.errors.started_at;
        endedAtErrorMessage = error.response.data.errors.ended_at;
        setDegree({ ...degree, error: degreeError });
        setLevelError(levelErrorMessage);
        setInstitute({ ...institute, error: instituteError })
        setStartedAtError(startedAtErrorMessage);
        setEndedAtError(endedAtErrorMessage);
      }
    }
  }

  const voidStates = () => {
    setModalVisible(false)
    setLevel('')
    setDegree({ value: '', error: '' });
    setInstitute({ value: '', error: '' });
    setStartedAt(0);
    setEndedAt(0);
    setDetails('')
    setLevelError('');
    setStartedAtError('');
    setEndedAtError('');
    levelErrorMessage = '';
    degreeError = '';
    instituteError = '';
    startedAtErrorMessage = '';
    endedAtErrorMessage = '';
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
              {education.id ? 'Editar Nivel Educativo' : 'Añadir Nivel Educativo'}
            </Text>
            <View style={[Theme.styles.mh30, Theme.styles.mv30]}>
              <View style={Theme.styles.mb10}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Nivel Escolar</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, levelError ? Theme.styles.bordeRojo : null]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={level}
                    onValueChange={(value) => {
                      setLevel(value)
                      setLevelError('');
                    }}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selcciona Tu Máximo Nivel --' key={0} value={0} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    {levels.map((level) => (

                      <Picker.Item label={level} key={level} value={level} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    ))}
                  </Picker>
                </View>
                {levelError ? <Text style={styles.error}>{levelError}</Text> : null}
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
                  error={!!institute.error}
                  errorText={institute.error}
                />
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Inicio</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, startedAtError ? Theme.styles.bordeRojo : null]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={startedAt}
                    onValueChange={(value) => setStartedAt(value)}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selecciona Año Inicio --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2022' key='2022' value='2022' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2021' key='2021' value='2021' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2020' key='2020' value='2020' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2019' key='2019' value='2019' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2018' key='2018' value='2018' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2017' key='2017' value='2017' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2016' key='2016' value='2016' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2015' key='2015' value='2015' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    <Picker.Item label='2014' key='2014' value='2014' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                  </Picker>
                </View>
                {startedAtError ? <Text style={styles.error}>{startedAtError}</Text> : null}
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Culminación</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker, endedAtError ? Theme.styles.bordeRojo : null]}>
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
                    <Picker.Item label='2018' key='2018' value='2018' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                  </Picker>
                </View>
                {endedAtError ? <Text style={styles.error}>{endedAtError}</Text> : null}

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
              {loader ? <ActivityIndicator animating={true} color={Theme.colors.azul} size="large" /> : <></>}
              <View style={[Theme.styles.flexRow, Theme.styles.mv30,]}>
                <Pressable style={[Theme.styles.flex1,
                Theme.colors.backgroundRed,
                Theme.styles.bordeRedondo1,
                Theme.styles.mh10,]}
                  onPress={() => voidStates()}>
                  <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.mh10]}
                  onPress={() => handleSubmit()}
                >
                  <Text
                    style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>{education.id ? 'Editar' : 'Añadir'}</Text>
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