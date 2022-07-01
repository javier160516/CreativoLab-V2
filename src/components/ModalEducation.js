import React, { useState } from "react";
import Theme from '../Theme/Theme';
import { Modal, Text, Pressable, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
const ModalEducation = ({ modalVisible, setModalVisible }) => {
  const [selectNivel, setSelectNivel] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={[Theme.styles.flex1, Theme.colors.backgroundBlanco]}>
        <ScrollView>
          <View style={[Theme.styles.mh30, Theme.styles.mv30]}>
            <View style={Theme.styles.mb10}>
              <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Nivel Escolar</Text>
              <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                <Picker
                  style={[Theme.colors.backgroundBlanco]}
                  mode='dropdown'
                  selectedValue={selectNivel}
                  onValueChange={(valor) => setSelectNivel(valor)}
                >
                  <Picker.Item label='Selccionar Nivel' />
                  <Picker.Item label='Técnico Superior' />
                </Picker>
              </View>
            </View>
            <View style={[Theme.styles.mv10]}>
              <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Titulo</Text>
              <TextInput
                placeholder="Titulo"
                mode="outlined"
                selectionColor={Theme.colors.azul}
                outlineColor={Theme.colors.bordeTextInput}
                activeOutlineColor={Theme.colors.azul}
                returnKeyType='next'
                underlineColor="transparent"
                style={[Theme.colors.backgroundBlanco, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
              />
            </View>
            <View style={[Theme.styles.mv10]}>
              <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Institución</Text>
              <TextInput
                placeholder="Institutción"
                mode="outlined"
                selectionColor={Theme.colors.azul}
                outlineColor={Theme.colors.bordeTextInput}
                activeOutlineColor={Theme.colors.azul}
                returnKeyType='next'
                underlineColor="transparent"
                style={[Theme.colors.backgroundBlanco, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
              />
            </View>
            <View style={[Theme.styles.mv10]}>
              <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Inicio</Text>
              <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                <Picker
                  style={[Theme.colors.backgroundBlanco]}
                  mode='dropdown'
                  selectedValue={selectNivel}
                  onValueChange={(valor) => setSelectNivel(valor)}
                >
                  <Picker.Item label='Año' />
                  <Picker.Item label='2010' />

                </Picker>
              </View>
            </View>
            <View style={[Theme.styles.mv10]}>
              <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Culminación</Text>
              <View style={[Theme.styles.borde1, Theme.styles.bordeGris, Theme.styles.bordeRedondo1, Theme.styles.mt10]}>
                <Picker
                  style={[Theme.colors.backgroundBlanco]}
                  mode='dropdown'
                  selectedValue={selectNivel}
                  onValueChange={(valor) => setSelectNivel(valor)}
                >
                  <Picker.Item label='Año' />
                  <Picker.Item label='2010' />
                </Picker>
              </View>
            </View>
            <View style={[Theme.styles.mv10]}>
              <Text style={[Theme.styles.fs17, Theme.styles.bold]}>Detalles</Text>
              <TextInput
                multiline={true}
                placeholder="Detalles......."
                mode="outlined"
                selectionColor={Theme.colors.azul}
                outlineColor={Theme.colors.bordeTextInput}
                activeOutlineColor={Theme.colors.azul}
                returnKeyType='next'
                underlineColor="transparent"
                style={[Theme.colors.backgroundBlanco, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
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
              <Pressable style={[Theme.styles.flex1,
              Theme.colors.backgroundBlue,
              Theme.styles.bordeRedondo1,
              Theme.styles.mh10
              ]}>
                <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter, Theme.styles.mv10]}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalEducation;