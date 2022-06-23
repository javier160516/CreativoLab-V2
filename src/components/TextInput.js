import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import Theme from '../Theme/Theme'


export default function TextInput({ errorText, description, ...props }) {

  return (
    <View style={Theme.styles.w100}>
      <Input
        style={[Theme.colors.backgroundBlanco, Theme.styles.mt10, Theme.styles.bordeRedondo1]}
        selectionColor={Theme.colors.azul}
        outlineColor={Theme.colors.gris}
        underlineColor="transparent"
        mode="outlined"
        activeOutlineColor={Theme.colors.azul}
        color={Theme.colors.azul}
        returnKeyType='next'
        {...props}
      />
      {description && !errorText ? (
        <Text style={[styles.error]}>{description}</Text>
      ) : null}
      {errorText ? <Text style={[styles.error]}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    fontSize: 13,
    color: '#F32424',
    paddingTop: 8,
  },
})
