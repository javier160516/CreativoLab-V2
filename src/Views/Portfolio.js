import React from 'react'
import { Text, View, Pressable, Switch } from 'react-native'
import DetectarTema from '../helpers/DetectarTema'
import Theme from '../Theme/Theme';
import Categories from '../components/Portfolio/CategoriesPortfolio';
import CategoriesPortfolio from '../components/Portfolio/CategoriesPortfolio';
import Projects from '../components/Portfolio/Projects';

const Portfolio = () => {

    const { themeContainerStyle, themeCards, themeBorderActiveInput, themeBorderOutlineInput, themeBorderSelectionInput, themeButtons, themeCardsText, themeColorIcons, themeTextStyle } = DetectarTema();
    return (
        <View style={[themeContainerStyle, Theme.styles.flex1]}>
            <View style={[Theme.styles.mh20, Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween]}>
                <Text style={[Theme.styles.fs20]}>Portfolio</Text>
                <Switch />
            </View>
            <View>
                <CategoriesPortfolio />
            </View>
            <View>
                <Projects/>
            </View>

        </View>
    )
}

export default Portfolio;
