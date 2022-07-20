import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import Theme from '../../Theme/Theme'
import DetectarTema from '../../helpers/DetectarTema'
import { Entypo } from '@expo/vector-icons';

const Category = ({ categories, getCategory, deleteCategory }) => {
  const { themeCards, themeCardsText, themeCardsHabilidades, themeBorderHabilidades } = DetectarTema();
  const { id, category } = categories;
  return (
    <Card style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb10, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pv20, themeCardsHabilidades, themeBorderHabilidades]} elevation={2}>
      <View style={[Theme.styles.alignCenter, Theme.styles.flexRow, Theme.styles.justifyBetween]}>
        <Text style={[Theme.styles.semiBold, Theme.styles.fs16, themeCardsText]}>{category}</Text>
        <View style={[Theme.styles.flexRow]}>
          <Pressable
            onPress={() => getCategory(id)}
            style={[Theme.colors.backgroundBlue, Theme.styles.mh10, Theme.styles.bordeRedondo1, { padding: 5 }]}>
            <Entypo name="edit" size={18} color="white" />
          </Pressable>
          <Pressable
            onPress={() => deleteCategory(id)}
            style={[Theme.colors.backgroundRed, Theme.styles.mh10, Theme.styles.bordeRedondo1, { padding: 5 }]}
          >
            <Entypo name="trash" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </Card>
  )
}

export default Category