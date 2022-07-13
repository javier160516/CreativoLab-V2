import React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { Card } from 'react-native-paper'
import DetectarTema from '../helpers/DetectarTema'
import Theme from '../Theme/Theme'
import * as Linking from 'expo-linking';


const Product = () => {
    const { themeCards, themeCardsText } = DetectarTema();
    const handleUbication = () => {
        Linking.openURL('https://duckduckgo.com/?q=tecnm+cancun&t=brave&ia=web&iaxm=maps&strict_bbox=1&bbox=21.142610017042358%2C-86.84073328971864%2C21.13520492552105%2C-86.82957530021669');
      };
    return (
        <Card style={[themeCards, Theme.styles.bordeRedondo1]}>
            <View style={[Theme.styles.flexRow, Theme.styles.pv20, Theme.styles.mh10]}>
                <Image style={{ width: 100, height: 100 }} source={require('../img/House.jpeg')} />
                <View style={[Theme.styles.mh10]}>
                    <Text style={[themeCardsText, Theme.styles.alignCenter, Theme.styles.fs15, Theme.styles.bold]}>Long Island</Text>
                    <Text style={[themeCardsText]}>Casa</Text>
                    <Text style={[themeCardsText]}>$ 1,000,000.00</Text>
                    <Pressable onPress={() => handleUbication()} >
                        <Text style={[themeCardsText, Theme.styles.semiBold, Theme.styles.pv10]}>Ver Ubicación</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={[themeCardsText, Theme.styles.mh10, Theme.styles.mb20]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nunc nisi, dictum at enim id, tempus porttitor eros. Nunc facilisis mauris lacinia nibh
                sagittis semper. Vivamus eget auctor dolor. Praesent non malesuada purus. Nulla eleifend odio ipsum, at blandit risus auctor ac. Aenean accumsan fermentum consequat.
                Vestibulum enim erat, interdum sit amet sapien ac, tempus accumsan risus.</Text>
        </Card>

    )
}

export default Product