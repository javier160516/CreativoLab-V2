import React from 'react'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Theme from '../Theme/Theme'
import { Avatar } from 'react-native-paper'
import DetectarTema from '../helpers/DetectarTema';
const ComponentMenu = (props) => {
    const { themeTextStyle, themeContainerStyle } = DetectarTema();
    return (
        <View style={[Theme.styles.flex1, themeContainerStyle]}>
            <View style={[Theme.styles.alignCenter, Theme.styles.pt80, Theme.styles.pb40, { backgroundColor: Theme.colors.azul }]}>
                <Avatar.Image size={100} source={require('../img/pruebaface.jpg')} />
                <Text style={[Theme.styles.fs20, Theme.colors.dark.darkText]}>Persona prueba</Text>
            </View>
            <DrawerContentScrollView {...props}
                contentContainerStyle={[themeContainerStyle, { paddingTop: 0 }]}
            >
                <DrawerItemList  {...props}/>
            </DrawerContentScrollView>
        </View>
    )
}

export default ComponentMenu