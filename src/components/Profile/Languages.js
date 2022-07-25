import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native'
import Theme from '../../Theme/Theme';
import DetectarTema from '../../helpers/DetectarTema';
import { Card } from 'react-native-paper';
import ModalLanguages from './ModalLanguages';
const Languages = () => {
    const { themeBorderOutlineInput, themeColorIcons, themeBordeSelectPicker, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput, themeCardsHabilidades } = DetectarTema();
    const [showModal, setShowModal] = useState(false);


    return (
        <Card style={[themeCardsHabilidades, Theme.styles.bordeRedondo1, Theme.styles.mt10,Theme.styles.mb20, Theme.styles.pv20, Theme.styles.mh10]}>
            <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.mb10]}>
                <Text style={[Theme.styles.fs20, Theme.styles.bold, Theme.styles.mh10, themeCardsText]}>Idiomas</Text>
                <Pressable
                    style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.mh10]}
                    onPress={() => setShowModal(true)}
                >
                    <Text style={Theme.colors.WhiteColor}>Agregar Idioma</Text>
                </Pressable>
            </View>
            <Text style={[Theme.styles.mh10, themeCardsText]}>
                En este apartado podrás subir los idiomas que puedes hablar y asi mostrarlos en tu página.
            </Text>
            <ModalLanguages
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </Card>
    )
}

export default Languages