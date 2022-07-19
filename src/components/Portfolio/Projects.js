import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import Theme from '../../Theme/Theme'
import ModalPorjects from './ModalPorjects'

const Projects = () => {
    const [showProjects, setShowProjects] = useState(false);
    return (
        <View style={[Theme.styles.mv20, Theme.styles.mh20]}>
            <Card style={[Theme.styles.justifyCenter]}>
                <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.mh10]}>
                    <Text style={[Theme.styles.bold, Theme.styles.fs17]}>Mis proyectos</Text>
                    <Pressable onPress={() => setShowProjects(true)} style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.bold]}>Agregar</Text>
                    </Pressable>
                </View>
                <View style={[Theme.styles.mh10, Theme.styles.pv10]}>
                    <Text>
                        Este módulo es una recopilación de todos los proyectos en los que te has involucrado.
                        La cantidad máxima de proyectos son 5.
                    </Text>
                    <Card>

                        
                    </Card>
                </View>


            </Card>
            <ModalPorjects
                showProjects={showProjects}
                setShowProjects={setShowProjects}
            />
        </View>
    )
}

export default Projects