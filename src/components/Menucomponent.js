import React from 'react'
import { Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Theme from '../Theme/Theme';
import { Avatar, Drawer } from 'react-native-paper';



const Menucomponent = (props) => {
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: Theme.colors.azul}}
    >
    <View style={[Theme.styles.justifyCenter, /*Theme.styles.alignCenter*/, {height: 200}]}>
      <Avatar.Image size={80} source={require('../img/Avatar1.jpg')}/>
    </View>
        <View style={{flex: 1, backgroundColor: Theme.colors.blanco, paddingTop: 10}}>
        <DrawerItemList {...props}/>
        </View>
    </DrawerContentScrollView>
    </View>
  )
}

export default Menucomponent;
