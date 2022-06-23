import 'react-native-gesture-handler';
import React from 'react';

//Navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Vistas
import BienvenidaScreen from './src/Views/BienvenidaScreen';
import Login from './src/Views/Login';
import Registro from './src/Views/Registro';
import DetectarTema from './src/helpers/DetectarTema';

const Stack = createStackNavigator();

export default function App() {
  const { themeTextStyle, 
          themeContainerStyle, 
          themeButtons, 
          themeFormularios, 
          themeTextFormularios 
        } = DetectarTema();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='BienvenidaScreen'
      >
        <Stack.Screen
          name='BienvenidaScreen'
          component={BienvenidaScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerMode: 'screen',
            headerTitleAlign: 'center', 
            headerTintColor: themeTextStyle.color, 
            headerStyle: { 
              backgroundColor: themeContainerStyle.backgroundColor 
            }
          }}
        />
        <Stack.Screen
          name='Registro'
          component={Registro}
          options={{
            headerMode: 'screen',
            headerTitleAlign: 'center', 
            headerTintColor: 
            themeTextStyle.color, 
            headerStyle: { 
              backgroundColor: themeContainerStyle.backgroundColor 
            }
          }}
        />
        {/* <Stack.Screen
          name='Index'
          component={Index}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
