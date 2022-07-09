import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema'
import { FontAwesome } from '@expo/vector-icons';

const Categoria = ({ categories, getCategory, deleteCategory }) => {
    const { themeTextStyle, themeCards, themeCardsText, themeCardsHabilidades, themeBorderHabilidades } = DetectarTema();
    const { category, id } = categories;
    return (
        <View style={[themeCards, Theme.styles.mh10, Theme.styles.mt20, Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pv20, Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, themeCardsHabilidades, themeBorderHabilidades]}>
            <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, Theme.styles.flex1, Theme.styles.bold, themeTextStyle, { flexWrap: 'wrap' }]}>{category}</Text>
            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                <Pressable
                    onPress={() => getCategory(id)}
                    style={[Theme.styles.mh10, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, { padding: 5 }]}
                >
                    <FontAwesome name="pencil" size={20} color='white' />
                </Pressable>
                <Pressable
                    onPress={() => deleteCategory(id)}
                    style={[Theme.styles.mh10, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, { padding: 5 }]}
                >
                    <FontAwesome name="trash-o" size={18} color="white" />
                </Pressable>
            </View>
        </View>
    )
}

export default Categoria