import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import Theme from '../Theme/Theme';
import { Modal, Text, Pressable, View, ScrollView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from './TextInput';
import DetectarTema from "../helpers/DetectarTema";
import YearsList from "../components/YearsList";

const ModalEducation = ({ modalVisible, setModalVisible, levels, yearsList }) => {
  const [selectNivel, setSelectNivel] = useState('');
  const [yearStart, setYearStart] = useState('');
  const { themeContainerStyle, themeCardsText, themeCards, themeBordeSelectPicker, themeBorderActiveInput, themeBorderSelectionInput,
    themeBorderOutlineInput } = DetectarTema();

  yearsList.map(years => {
      console.log(years.year);
  })

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
                    selectedValue={selectNivel}
                    onValueChange={(valor) => setSelectNivel(valor)}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selcciona Tu Máximo Nivel --' key='' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    {levels.map((level) => (

                      <Picker.Item label={level} key={level} value={level} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    ))}
                  </Picker>
                </View>
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
                />
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Inicio</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={yearStart}
                    onValueChange={(valor) => setYearStart(valor)}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selecciona Año Inicio --' key='' value='' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    
                    {yearsList.map(years => (
                      <Picker.Item label={years.id} key={years.id} style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    ))}

                  </Picker>
                </View>
              </View>
              <View style={[Theme.styles.mv10]}>
                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Culminación</Text>
                <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={selectNivel}
                    onValueChange={(valor) => setSelectNivel(valor)}
                    style={[themeCards, themeCardsText]}
                    dropdownIconColor={themeCardsText.color}
                  >
                    <Picker.Item label='-- Selecciona Año Termino --' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                    {/* <Picker.Item label='2010' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color}}/> */}
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

export default ModalEducation;