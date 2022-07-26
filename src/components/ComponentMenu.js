import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Theme from '../Theme/Theme'
import { Avatar } from 'react-native-paper'
import DetectarTema from '../helpers/DetectarTema';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Logout } from '../helpers/Logout'
import { useLogin } from '../context/LoginProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';

const ComponentMenu = (props) => {
    const { setLogueado } = useLogin();
    const { themeContainerStyle, themeBordeSelectPicker } = DetectarTema();
    const { firstNameUser, firstLastNameUser, avatarUser } = props;
    console.log(avatarUser);
    const avatarName = `${firstNameUser.substr(0, 1)}${firstLastNameUser.substr(0, 1)}`;
    return (
        <View style={[Theme.styles.flex1, themeContainerStyle]}>
            <StatusBar style='auto' />
            <View style={[Theme.styles.alignCenter, Theme.styles.pt80, Theme.styles.pb40, { backgroundColor: Theme.colors.azul }]}>
                {avatarUser ? (
                    <View style={[Theme.styles.borde2, themeBordeSelectPicker, { borderRadius: 100 }]}>
                        <Avatar.Image size={150} source={{ uri: avatar }} style={Theme.styles.backgroundBlue} />
                    </View>
                ) : (
                    <View style={[Theme.styles.borde2, themeBordeSelectPicker, { borderRadius: 100 }]}>
                        <Avatar.Text size={150} label={avatarName} style={[Theme.colors.backgroundGray3]} />
                    </View>
                )}
                <Text style={[Theme.styles.fs20, Theme.colors.dark.darkText]}>{firstNameUser} {firstLastNameUser}</Text>
            </View>
            <DrawerContentScrollView {...props}
                contentContainerStyle={[themeContainerStyle, { paddingTop: 0 }]}
            >
                <DrawerItemList  {...props} />
            </DrawerContentScrollView>
            <View style={[Theme.colors.backgroundRed, { padding: 15 }]}>
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