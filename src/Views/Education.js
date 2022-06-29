import React, { useState } from "react";
import Theme from '../Theme/Theme';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const Education = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[ styles.buttonClose, Theme.styles.mh20, Theme.styles.pv20, Theme.styles.mh20]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <Pressable
      style={[Theme.styles.mh20, styles.buttonOpen, Theme.styles.pv20, Theme.styles.mv20, Theme.styles.bordeRedondo2]}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.textStyle}>Show Modal</Text>
    </Pressable>
  </View>
);
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#1363DF",
  },
  buttonClose: {
    backgroundColor: "#D62828",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});




export default Education
