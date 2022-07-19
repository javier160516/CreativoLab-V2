import React, { useState } from 'react'
import { Pressable, Text, View, Image, Linking } from 'react-native'
import ThemedCard from 'react-native-elements/dist/card/Card'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import DetectarTema from '../../helpers/DetectarTema'
import Theme from '../../Theme/Theme'
import ModalPorjects from './ModalPorjects'

const Projects = () => {
    const { themeCards, themeCardsText, themeColorIcons } = DetectarTema();
    const [showProjects, setShowProjects] = useState(false);

    return (
            <Card style={[Theme.styles.flex1, themeCards, Theme.styles.justifyCenter, Theme.styles.pv20, Theme.styles.mv20, Theme.styles.mh20]}>
                <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.mh20]}>
                    <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Mis proyectos</Text>
                    <Pressable onPress={() => setShowProjects(true)} style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.bold]}>Agregar</Text>
                    </Pressable>
                </View>
                <View style={[Theme.styles.mh20, Theme.styles.pv10]}>
                    <Text style={[themeCardsText]}>
                        Este módulo es una recopilación de todos los proyectos en los que te has involucrado.
                        La cantidad máxima de proyectos son 5.
                    </Text>
                    <View style={[Theme.styles.mv20]}>
                        <Image source={require('../../img/House.jpeg')} style={[Theme.styles.w100, {height: 150}]} />
                    </View>
                    <Text style={[themeCardsText, Theme.styles.bold]}>Proyecto 1</Text>
                    <Text style={[Theme.styles.fs16, themeCardsText, Theme.styles.pv10]}>Aqui va el Link</Text>
                    <Text style={[themeCardsText]}>Categoría</Text>
                    <Text style={[Theme.styles.pv10, themeCardsText]}>
                        Este módulo es una recopilación de todos los proyectos en los que te has involucrado.
                        La cantidad máxima de proyectos son 5.
                    </Text>
                </View>

                <ModalPorjects
                    showProjects={showProjects}
                    setShowProjects={setShowProjects}
                />
            </Card>
    )
}

export default Projects