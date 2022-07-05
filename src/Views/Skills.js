import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import ModalHabilidadesCategoria from '../components/ModalHabilidadesCategoria';
import ModalHabilidadesH from '../components/ModalHabilidadesH';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';


const Skills = () => {
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalSkills, setShowModalSkills] = useState(false);
  const {themeContainerStyle, themeCards, themeCardsText} = DetectarTema();

  return (
    <SafeAreaView style={[themeContainerStyle, Theme.styles.flex1]}>
      <StatusBar style='auto' />

      <View style={[Theme.styles.mh20,Theme.styles.mv20 ,Theme.styles.bordeRedondo1,themeCards, Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
        <View style={[Theme.styles.flex1, Theme.styles.mh10, Theme.styles.mv20]}>
          <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10, themeCardsText]}>Mis Categorías</Text>
          <Text style={[ {flexWrap: 'wrap'}, themeCardsText ]}>
            Aquí puedes agregar las categorías de tus habilidades; por ejemplo, web, móvil, etc..
          </Text>
        </View>
        <View style={[Theme.styles.mh10, Theme.styles.mv20]}>
          <Pressable style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}
            onPress={() => setShowModalCategory(true)}
          >
            <Text style={[Theme.colors.WhiteColor, Theme.styles.mv10, Theme.styles.mh30, Theme.styles.bold]}>+ Crear</Text>
          </Pressable>
        </View>
      </View>
      <View style={[Theme.styles.mh20,Theme.styles.bordeRedondo1, Theme.styles.flexRow, themeCards, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
        <View style={[Theme.styles.flex1, Theme.styles.mh10, Theme.styles.mv20]}>
          <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10, themeCardsText]}>Mis habilidades</Text>
          <Text style={[{ flexWrap: 'wrap' }, themeCardsText]}>
            Aquí puedes agregar las habilidades; por ejemplo, HTML 5, CSS, etc..
          </Text>
        </View>
        <View style={[Theme.styles.mh10, Theme.styles.mv20]}>
          <Pressable style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}
            onPress={() => setShowModalSkills(true)}
          >
            <Text style={[Theme.colors.WhiteColor, Theme.styles.mv10, Theme.styles.mh30, Theme.styles.bold]}>+ Añadir</Text>
          </Pressable>
        </View>
      </View>

      <ModalHabilidadesCategoria
        showModalCategory={showModalCategory}
        setShowModalCategory={setShowModalCategory}
      />

      <ModalHabilidadesH
        showModalSkills={showModalSkills}
        setShowModalSkills={setShowModalSkills}
      />

    </SafeAreaView>

  )
}

export default Skills;
