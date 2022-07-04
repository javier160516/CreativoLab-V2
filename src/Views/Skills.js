import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import ModalHabilidadesCategoria from '../components/ModalHabilidadesCategoria';
import ModalHabilidadesH from '../components/ModalHabilidadesH';
import Theme from '../Theme/Theme';



const Skills = () => {
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalSkills, setShowModalSkills] = useState(false);

  return (
    <SafeAreaView>
      <StatusBar style='auto' />

      <View style={[Theme.styles.mh10, Theme.styles.flexRow, Theme.colors.backgroundBlanco, Theme.styles.mv30, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
        <View style={[Theme.styles.flex1, Theme.styles.mh10, Theme.styles.mv20]}>
          <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10]}>Mis Categorías</Text>
          <Text style={{ flexWrap: 'wrap' }}>
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
      <View style={[Theme.styles.mh10, Theme.styles.flexRow, Theme.colors.backgroundBlanco, Theme.styles.mv30, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
        <View style={[Theme.styles.flex1, Theme.styles.mh10, Theme.styles.mv20]}>
          <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10]}>Mis habilidades</Text>
          <Text style={{ flexWrap: 'wrap' }}>
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
