import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginProvider from './src/context/LoginProvider';
import MainNavigation from './src/MainNavigation';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </LoginProvider>
  );
}
