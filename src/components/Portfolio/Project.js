import React, { useCallback } from 'react'
import { View, Text, Image, Linking, Alert, Pressable } from 'react-native'
import { Button, Card } from 'react-native-paper'
import Theme from '../../Theme/Theme'
import DetectarTema from '../../helpers/DetectarTema'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Project = ({ projects, getProject, deleteProject }) => {
    const { themeCardsText, themeCardsHabilidades, themeBorderHabilidades, themeColorIcons } = DetectarTema();
    const { details, image, link, name, id } = projects;

    const OpenUbication = ({ url, children }) => {
        const handleUbication = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Lo sentimos, no pudimos abrir este link: ${url}`);
            }
        }, [url]);

        return <Pressable onPress={handleUbication} color={themeCardsText.color}>
            <Text style={[themeCardsText, Theme.styles.bold]}>
                <Entypo name="link" size={20} color={themeColorIcons} />
                {children}
            </Text>
        </Pressable>;
    };

    return (
        <Card style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb10, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pb20, Theme.styles.pt10, themeCardsHabilidades, themeBorderHabilidades]} elevation={2}>
            <View style={[Theme.styles.mv10]}>
                <Image source={{ uri: image }} style={[Theme.styles.w100, { height: 150 }]} />
            </View>
            <Text style={[themeCardsText, Theme.styles.bold, Theme.styles.fs17, Theme.styles.mb20]}>{name}</Text>
            <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                <OpenUbication url={link}>
                    Ver Proyecto
                </OpenUbication>
            </View>
            <Text style={[Theme.styles.pv10, themeCardsText, Theme.styles.fs15]}>
                {details}
            </Text>
            <View style={[Theme.styles.flexRow]}>
                <Pressable
                    style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.flexRow, Theme.styles.pv10, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.mr10]}
                    onPress={() => getProject(id)}
                >
                    <FontAwesome name="pencil" size={18} color="white" />
                    <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, { marginLeft: 10 }]}>Editar</Text>
                </Pressable>
                <Pressable
                    style={[Theme.styles.flex1, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.flexRow, Theme.styles.pv10, Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.ml10]}
                    onPress={() => deleteProject(id)}
                >
                    <FontAwesome name="trash-o" size={18} color="white" />
                    <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, { marginLeft: 10 }]}>Eliminar</Text>
                </Pressable>
            </View>
        </Card>
    )
}

export default Project