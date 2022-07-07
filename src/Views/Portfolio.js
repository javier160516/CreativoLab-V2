import React from 'react'
import { Text, View, Pressable } from 'react-native'
import DetectarTema from '../helpers/DetectarTema'
import Theme from '../Theme/Theme';

const Portfolio = () => {
    const { themeContainerStyle, themeCards, themeBorderActiveInput, themeBorderOutlineInput, themeBorderSelectionInput, themeButtons, themeCardsText, themeColorIcons, themeTextStyle } = DetectarTema();
    return (
        <View style={[themeContainerStyle, Theme.styles.flex1]}>
            <Pressable style={[Theme.colors.backgroundBlanco, Theme.styles.bordeRedondo1, Theme.styles.mh30]}>
                <Text style={[Theme.colors.negro, Theme.styles.textCenter]}>Portfolio</Text>
            </Pressable>
        </View>
    )
}

export default Portfolio;