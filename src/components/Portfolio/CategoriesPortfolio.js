import React, { useState } from 'react'
import { Text, View, Switch, Pressable } from 'react-native'
import { Card } from 'react-native-paper';
import Theme from '../../Theme/Theme';
import { Entypo } from '@expo/vector-icons';
import ModalCategories from './ModalCategories';
import DetectarTema from '../../helpers/DetectarTema';


const CategoriesPortfolio = () => {
  const {themeCardsText, themeCards, themeColorIcons} = DetectarTema();
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={[Theme.styles.mh20]}>
      <Card style={[themeCards]}>
        <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.mh20, Theme.styles.pv20]}>
          <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]} >Mis Categorias</Text>
          <Pressable onPress={() => setShowModal(true)} style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
            <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>Crear</Text>
          </Pressable>
        </View>
        <Text style={[Theme.styles.mh10, themeCardsText]}>
          Esta sección te Categorías del módulo portfolio, permite la creación de Categorías con el fin de clasificar tus
          proyectos. La cantidad máxima de categorías que puedes agregar son 5.
        </Text>
        <View style={[Theme.styles.mh10, Theme.styles.mv10,Theme.styles.borde1, Theme.styles.bordeRedondo1,themeCards, Theme.styles.ph20, Theme.styles.pv10]}>
          <View style={[Theme.styles.alignCenter, Theme.styles.flexRow, Theme.styles.justifyBetween]}>
            <Text style={[Theme.styles.semiBold, Theme.styles.fs16, themeCardsText]} >Desktop Development</Text>
            <View style={[Theme.styles.flexRow]}>
              <Pressable style={[Theme.colors.backgroundRed,Theme.styles.mh10,Theme.styles.bordeRedondo1, { padding: 5 }]}>
                <Entypo name="trash" size={18} color="white" />
              </Pressable>
              <Pressable style={[Theme.colors.backgroundBlue,Theme.styles.mh10,Theme.styles.bordeRedondo1, { padding: 5 }]}>
                <Entypo name="edit" size={18} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[Theme.styles.mh10, Theme.styles.mv10,themeCards,Theme.styles.borde1, Theme.styles.bordeRedondo1 , Theme.styles.ph20, Theme.styles.pv10]}>
          <View style={[Theme.styles.alignCenter, Theme.styles.flexRow, Theme.styles.justifyBetween]}>
            <Text style={[Theme.styles.semiBold, Theme.styles.fs16, themeCardsText]} >Web Development</Text>
            <View style={[Theme.styles.flexRow]}>
              <Pressable style={[Theme.colors.backgroundRed, Theme.styles.mh10, Theme.styles.bordeRedondo1, { padding: 5 }]}>
                <Entypo name="trash" size={18} color="white" />
              </Pressable>
              <Pressable style={[Theme.colors.backgroundBlue, Theme.styles.mh10, Theme.styles.bordeRedondo1, { padding: 5 }]}>
                <Entypo name="edit" size={18} color="white" />
              </Pressable>
            </View>

          </View>
        </View>

      </Card>
      <ModalCategories
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </View>
  )
}

export default CategoriesPortfolio;