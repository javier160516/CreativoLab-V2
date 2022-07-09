import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { SafeAreaView, View, Text, Pressable, ScrollView } from 'react-native';
import ModalHabilidadesCategoria from '../components/ModalHabilidadesCategoria';
import ModalHabilidadesH from '../components/ModalHabilidadesH';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import { FontAwesome } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import CategoriasComponent from '../components/CategoriasComponent';
import HabilidadesComponent from '../components/HabilidadesComponent';

const Skills = () => {
  const [showModalSkills, setShowModalSkills] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const { themeContainerStyle, themeCards, themeCardsText } = DetectarTema();

  return (
    <SafeAreaView style={[themeContainerStyle, Theme.styles.flex1]}>
      <StatusBar style='auto' />
      <ScrollView>
        <CategoriasComponent
          listCategories={listCategories}
          setListCategories={setListCategories}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
        <HabilidadesComponent />
      </ScrollView>
    </SafeAreaView>

  )
}

export default Skills;
