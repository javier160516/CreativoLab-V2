import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Theme from '../Theme/Theme'
import { Avatar } from 'react-native-paper'
import DetectarTema from '../helpers/DetectarTema';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Logout } from '../helpers/Logout'
import { useLogin } from '../context/LoginProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ComponentMenu = (props) => {
    const { setLogueado } = useLogin();
    const { themeTextStyle, themeContainerStyle } = DetectarTema();
    const {firstNameUser, firstLastNameUser} = props;
    const avatarName = `${firstNameUser.substr(0,1)}${firstLastNameUser.substr(0,1)}`;
    console.log(avatarName.toUpperCase());
    return (
        <View style={[Theme.styles.flex1, themeContainerStyle]}>
            <View style={[Theme.styles.alignCenter, Theme.styles.pt80, Theme.styles.pb40, { backgroundColor: Theme.colors.azul }]}>
                <View style={Theme.styles.mb20}>
                    <Avatar.Text size={100} label={avatarName}/>
                </View>
                {/* <Avatar.Image size={100} source={require('../img/pruebaface.jpg')} /> */}
                <Text style={[Theme.styles.fs20, Theme.colors.dark.darkText]}>{firstNameUser} {firstLastNameUser}</Text>
            </View>
            <DrawerContentScrollView {...props}
                contentContainerStyle={[themeContainerStyle, { paddingTop: 0 }]}
            >
                <DrawerItemList  {...props} />
            </DrawerContentScrollView>
            <View style={[Theme.colors.backgroundRed, { padding: 15}]}>
                <TouchableOpacity onPress={() => {
                    Logout()
                    setLogueado(false)
                    AsyncStorage.clear()
                }}
                >
                    <Text style={[Theme.colors.WhiteColor, Theme.styles.fs16, Theme.styles.bold, Theme.styles.textCenter]}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ComponentMenu