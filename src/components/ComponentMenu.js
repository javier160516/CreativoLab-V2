import React from 'react'
import {View} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Theme from '../Theme/Theme'
const ComponentMenu = (props) => {
    return (
        <View style={Theme.styles.flex1}>
            <DrawerContentScrollView {...props} 
            contentContainerStyle={{backgroundColor: Theme.colors.azul}}
            >
                <View style={{flex: 1, backgroundColor: Theme.colors.blanco, paddingTop: 10}}>
                <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default ComponentMenu