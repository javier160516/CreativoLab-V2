import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Card } from 'react-native-paper'
import DetectarTema from '../helpers/DetectarTema'
import Theme from '../Theme/Theme'
import { FontAwesome } from '@expo/vector-icons';
import ModalHabilidadesH from './ModalHabilidadesH'

const HabilidadesComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const { themeTextStyle, themeCards, themeCardsText, themeCardsHabilidades, themeBorderHabilidades } = DetectarTema();


    return (
        <Card style={[Theme.styles.mh20, Theme.styles.mv20, Theme.styles.bordeRedondo1, themeCards, Theme.styles.pv10]} elevation={5}>
            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyCenter]}>
                <View style={[Theme.styles.flex1, Theme.styles.mh10]}>
                    <Text style={[Theme.styles.fs17, Theme.styles.semiBold, Theme.styles.mv10, themeCardsText]}>Mis habilidades</Text>
                    <Text style={[{ flexWrap: 'wrap' }, themeCardsText]}>
                        En esta sección podrás agregar tus habilidades con sus respectiva categoría. Cantidad máxima son 5.
                    </Text>
                </View>
                <View style={[Theme.styles.mh10, Theme.styles.mv20]}>
                    <Pressable style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.mv10, Theme.styles.mh30, Theme.styles.bold]}>+ Crear</Text>
                    </Pressable>
                </View>
            </View>
            <View style={[themeCards, Theme.styles.mh10, Theme.styles.mv20, Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pv20, Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, themeCardsHabilidades, themeBorderHabilidades]}>
                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, Theme.styles.flex1, Theme.styles.bold, themeTextStyle,{ flexWrap: 'wrap' }]}>Habilidad</Text>
                <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                    <Pressable style={[Theme.styles.mh10, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, { padding: 5 }]}>
                        <FontAwesome name="pencil" size={20} color='white' />
                    </Pressable>
                    <Pressable style={[Theme.styles.mh10, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, { padding: 5 }]}>
                        <FontAwesome name="trash-o" size={18} color="white" />
                    </Pressable>
                </View>
            </View>
            <ModalHabilidadesH
        showModal={showModal}
        setShowModal={setShowModal}
      />
        </Card>
    )
}

export default HabilidadesComponent