import React, { useState } from 'react';
import { Text, Pressable, ScrollView, View, SafeAreaView } from 'react-native';
import ModalProductos from '../components/ModalProductos'
import { Switch } from 'react-native-paper';
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema';
import { AntDesign } from '@expo/vector-icons';
import Product from '../components/Product';


const Products = () => {
  const [showModalProducto, setShowModalProducto] = useState(false);
  const { themeCards, themeContainerStyle, themeCardsText, themeColorIcons, themeTextStyle } = DetectarTema();
  return (
    <SafeAreaView style={[themeContainerStyle, Theme.styles.flex1]}>
      <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween, Theme.styles.mh20, Theme.styles.mv10]}>
        <Text style={[Theme.styles.semiBold,themeCardsText ,Theme.styles.fsTitle3]}>Producto</Text>
        <Switch />
      </View>
      <ScrollView>
        <View style={[Theme.styles.mt10,Theme.styles.mh20,Theme.styles.bordeRedondo1, themeCards, Theme.styles.mv10]}>
          <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.pv10]}>
            <Text style={[themeCardsText, Theme.styles.fs20, Theme.styles.semiBold]}>Producto</Text>
            <Pressable onPress={() => setShowModalProducto(true)} style={[Theme.colors.backgroundBlue, Theme.styles.alignCenter, Theme.styles.bordeRedondo1]}>
              <Text style={[Theme.colors.WhiteColor, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.fs15]}><AntDesign name="plus" size={15} color='white' />Agregar</Text>
            </Pressable>
          </View>
          <View style={[Theme.styles.mh10]}>
            <Product />
          </View>
        </View>
      </ScrollView>
      <ModalProductos
        showModalProducto={showModalProducto}
        setShowModalProducto={setShowModalProducto}
      />
    </SafeAreaView>
  )
}

export default Products