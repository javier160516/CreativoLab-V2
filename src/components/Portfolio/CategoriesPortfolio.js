import React, { useState } from 'react'
import { Text, View, Switch, Pressable, Alert } from 'react-native'
import { Card } from 'react-native-paper';
import Theme from '../../Theme/Theme';
import ModalCategories from './ModalCategories';
import DetectarTema from '../../helpers/DetectarTema';
import Category from './Category';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../helpers/Logout';

const CategoriesPortfolio = ({ listCategories, setListCategories, getAllData }) => {
  const { themeCardsText, themeCards, themeColorIcons } = DetectarTema();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState({});
  const { setLogueado } = useLogin();
  const getCategory = async id => {
    setShowModal(true);
    try {
      const response = await axios.get(`http://dev.creativolab.com.mx/api/v1/modules/projects/categories/${id}`);
      if (response.data.status == 200) {
        setCategory(response.data.category);
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
          }]
        )
      } else if (error.response.data.status == 403) {
        Alert.alert('¡Hubo un error!', error.response.data.message, [{
          text: 'Ok', onPress: () => {
            setLogueado(false);
            Logout();
          }
        }]);
      } else if (error.response.data.status == 404) {
        Alert.alert('¡Error!', error.response.data.errors.id, [{ text: 'Ok', onPress: () => voidStates() }])
      }
    }
  }

  const deleteCategory = id => {
    Alert.alert('¿Deseas Eliminar esta Categoría?', 'Si eliminas esta categoría no se podrá recuperar',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Si, eliminar', onPress: async () => {
            try {
              const response = await axios.delete('http://dev.creativolab.com.mx/api/v1/modules/projects/categories',
                { data: { id: parseInt(id) } });
              if (response.data.status == 200) {
                Alert.alert('¡Categoria Eliminada!', 'La categoria se ha eliminado correctamente', [{ text: 'Ok', onPress: () => getAllData() }]);
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
                Alert.alert('¡Hubo un error!', error.response.data.message, [{
                  text: 'Ok', onPress: () => {
                    setLogueado(false);
                    Logout();
                  }
                }]);
              } else if (error.response.data.status == 404) {
                Alert.alert('¡Error!', error.response.data.errors.id, [{ text: 'Ok' }])
              } else {
                Alert.alert('Lo sentimos', 'Hubo un error, por favor, intentelo más tarde', [{ text: 'Ok' }])
              }
            }
          }
        }
      ])

  }

  const voidStates = () => {
    setShowModal(false);
  }

  return (
    <Card style={[themeCards, Theme.styles.mh20, Theme.styles.pb20]}>
      <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.mh20, Theme.styles.pv20]}>
        <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]} >Mis Categorias</Text>
        <Pressable onPress={() => setShowModal(true)} style={[Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph20, Theme.styles.bordeRedondo1]}>
          <Text style={[Theme.styles.bold, Theme.colors.WhiteColor]}>
            <AntDesign name="plus" size={15} color="white" />
            {' '}Crear
          </Text>
        </Pressable>
      </View>
      <Text style={[Theme.styles.mh10, themeCardsText]}>
        Esta sección te Categorías del módulo portfolio, permite la creación de Categorías con el fin de clasificar tus
        proyectos. La cantidad máxima de categorías que puedes agregar son 5.
      </Text>
      {listCategories.map(categories => (
        <Category
          key={categories.id}
          categories={categories}
          getCategory={getCategory}
          deleteCategory={deleteCategory}
        />
      ))}

      <ModalCategories
        showModal={showModal}
        setShowModal={setShowModal}
        category={category}
        getAllData={getAllData}
      />
    </Card>

  )
}

export default CategoriesPortfolio;