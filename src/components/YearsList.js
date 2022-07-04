import React from 'react'
import { FlatList, Text } from 'react-native';
import DetectarTema from '../helpers/DetectarTema'
import { Picker } from '@react-native-picker/picker';
const YearsList = ({years}) => {
  const { themeCardsText, themeCards } = DetectarTema();
  // const {id, year} = years;
  return (
    <Picker.Item label='Hola' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
  )
}

export default YearsList