import React, { useState, useEffect } from 'react';
import { Text, Pressable, ScrollView, View, SafeAreaView, Alert, RefreshControl } from 'react-native';
import ModalProducts from '../components/Products/ModalProducts'
import { Switch } from 'react-native-paper';
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema';
import { AntDesign } from '@expo/vector-icons';
import Product from '../components/Products/Product';
import axios from 'axios';
import { Logout } from '../helpers/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [products, setProducts] = useState({});
  const { themeCards, themeContainerStyle, themeCardsText, themeColorIcons, themeTextStyle } = DetectarTema();
  const { setLogueado } = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get('http://dev.creativolab.com.mx/api/v1/modules/products');
      if (response.data.status == 200) {
        setListProducts(response.data.products);
        response.data.module_status === 1 ? setSwitchVisible(true) : setSwitchVisible(false);
      }
    } catch (error) {
      if (error.response.data.status == 401) {
        Alert.alert(
          'No Autenticado',
          'Parece que no estás autenticado, por favor, inicia sesión',
          [{
            text: 'Iniciar Sesión',
            onPress: () => {
              setLogueado(false);
              AsyncStorage.clear();
            }
          }])
      } else if (error.response.data.status == 403) {
        Alert.alert('¡Error!', error.response.data.message, [{
          text: 'Ok', onPress: () => {
            setLogueado(false);
            Logout();
          }
        }]);
      }
    }
  }

  const getProduct = async (id) => {
    setTimeout(() => {
      setShowModal(true);
    }, 800);
    try {
      const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/products/${id}`);

      setProducts(response.data.product);
    } catch (error) {
      console.log(error.response.data);
    }

  }

  const deleteProduct = (id) => {
    Alert.alert('¿Desea eliminar este Producto?', 'El producto elegido se eliminará', [{ text: 'No', style: 'cancel' }, {
      text: 'Si, eliminar', onPress: async () => {
        try {
          const response = await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/products', { data: { id: parseInt(id) } });
          console.log(response.data);
          if (response.data.status == 200) {
            setListProducts([]);
            setSwitchVisible(false);
            Alert.alert('Producto Eliminada', 'El Producto ha sido eliminado correctamente', [{ text: 'Ok' }]);
          }
          // const experiencesUpdated = experiences.filter(experienceState => experienceState.id !== id);
        } catch (error) {
          if (error.response.data.status == 401) {
            Alert.alert(
              'No Autenticado',
              'Parece que no estás autenticado, por favor, inicia sesión',
              [{
                text: 'Iniciar Sesión',
                onPress: () => {
                  setLogueado(false);
                  AsyncStorage.clear();
                }
              }])
          } else if (error.response.data.status == 404) {
            Alert.alert('Producto no encontrado', 'Lo sentimos, el producto no fue encontrado', [{ text: 'Ok' }])
          }
        }
      }
    }]);
    getProducts();
  }

  const moduleEnable = async () => {
    try {
      const moduleEnable = { products_enabled: !switchVisible };
      const response = await axios.put('http://dev.creativolab.com.mx/api/v1/modules/products/toggle', moduleEnable);
      if (response.data.status == 200) {
        Alert.alert('Cambio Exitoso', response.data.message, [{ text: 'Ok' }]);
        setSwitchVisible(!switchVisible);
      }
    } catch (error) {
      if (error.response.data.status == 401) {
        Alert.alert(
          'No Autenticado',
          'Parece que no estás autenticado, por favor, inicia sesión',
          [{
            text: 'Iniciar Sesión',
            onPress: () => {
              setLogueado(false);
              AsyncStorage.clear();
            }
          }])
      } else if (error.response.data.status == 403) {
        Alert.alert('¡Hubo un error!', error.response.data.message, [{ text: 'Ok' }]);
      }
    }
  }

  //Refrescar Registros
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setListProducts([]);
    getProducts();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={[themeContainerStyle, Theme.styles.flex1]}>
      <View style={[Theme.styles.flexRow, Theme.styles.alignCenter, Theme.styles.justifyBetween, Theme.styles.mh20, Theme.styles.mv10]}>
        <Text style={[Theme.styles.semiBold, themeCardsText, Theme.styles.fsTitle3]}>Producto</Text>
        <Switch
          value={switchVisible}
          onValueChange={moduleEnable}
          color={Theme.colors.azul}
          trackColor={{ false: Theme.colors.grisClaro, true: Theme.colors.grisClaro }}
        />
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={[Theme.styles.mh20, Theme.styles.bordeRedondo1, themeCards, Theme.styles.mv10, Theme.styles.pv20]}>
          <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter, Theme.styles.mh20, Theme.styles.pv10]}>
            <Text style={[themeCardsText, Theme.styles.fs20, Theme.styles.semiBold]}>Producto</Text>
            <Pressable onPress={() => setShowModal(true)} style={[Theme.colors.backgroundBlue, Theme.styles.alignCenter, Theme.styles.bordeRedondo1]}>
              <Text style={[Theme.colors.WhiteColor, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.fs15]}><AntDesign name="plus" size={15} color='white' />Agregar</Text>
            </Pressable>
          </View>
          <Text style={[themeCardsText, Theme.styles.mh20, Theme.styles.mv10, Theme.styles.fs16]}>
            Este módulo es una recopilación de todos los productos que la persona oferta.
            La cantidad máxima de productos por categoría que puedes agregar son 5.
          </Text>
          {listProducts.map(products => (
            <Product
              key={products.id}
              products={products}
              getProduct={getProduct}
              deleteProduct={deleteProduct}
            />
          ))}

        </View>
      </ScrollView>
      <ModalProducts
        showModal={showModal}
        setShowModal={setShowModal}
        getProducts={getProducts}
        setListProducts={setListProducts}
        products={products}
        setProducts={setProducts}
      />
    </SafeAreaView>
  )
}

export default Products