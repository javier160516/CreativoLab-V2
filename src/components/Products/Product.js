import React, { useState } from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { Card } from 'react-native-paper'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Product = ({ products, getProduct, deleteProduct }) => {

    const { themeCards, themeCardsText, themeColorIcons, themeCardsHabilidades, themeBorderHabilidades } = DetectarTema();
    const [showDetails, setShowDetails] = useState(false);
    const { image, name, type, price, location, details, id } = products;

    const handleDetails = () => {
        setShowDetails(!showDetails);
    }
    return (
        <Card style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb10, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pv20, themeCardsHabilidades, themeBorderHabilidades]} elevation={1}>
            <View style={[Theme.styles.flexRow, Theme.styles.pt20, Theme.styles.pb10, Theme.styles.mh10]}>
                <Image style={{ width: 100, height: 100 }} source={{ uri: image }} />
                <View style={[Theme.styles.mh10, {width: '60%'}]}>
                    <Text style={[themeCardsText, Theme.styles.alignCenter, Theme.styles.fs15, Theme.styles.bold]}>{name}</Text>
                    <Text style={[themeCardsText]}>{type}</Text>
                    <Text style={[themeCardsText]}>${price}</Text>
                    <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.w80, Theme.styles.mt10]}>
                        <FontAwesome5 name="map-marker-alt" size={20} color={themeColorIcons}/>
                        <Text style={[Theme.styles.flexRow, themeCardsText, Theme.styles.semiBold]}>
                            {' '}{location}
                        </Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={() => handleDetails()}>
                <Text style={[Theme.styles.mv10, Theme.styles.mh20, Theme.styles.fs17, Theme.colors.colorAzul]}>Ver Más</Text>
            </Pressable>
            {showDetails ? (
                <Animatable.Text
                    animation="fadeIn"
                    style={[themeCardsText, Theme.styles.mh10, Theme.styles.mb20]}
                >
                    {details}
                </Animatable.Text>
            ) : null}
            <View style={[Theme.styles.flexRow, Theme.styles.mt20,Theme.styles.mb10, Theme.styles.justifyEvenly]}>
                    <Pressable
                        style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.flexRow, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.alignCenter]}
                        onPress={() => getProduct(id)}
                    >
                        <FontAwesome5 name="pencil-alt" size={18} color="white" />
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17,{marginLeft: 10}]}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.flexRow, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.alignCenter]}
                        onPress={() => deleteProduct(id)}
                    >
                        <FontAwesome5 name="trash-alt" size={18} color="white" />
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, {marginLeft: 10}]}>Eliminar</Text>
                    </Pressable>
                </View>
        </Card>
    )
}

export default Product