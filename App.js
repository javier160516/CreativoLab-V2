import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import DetectarTema from './src/helpers/DetectarTema';

//Tema
import Theme from './src/Theme/Theme';


export default function App() {
  const [themeTextStyle, themeContainerStyle] = DetectarTema();

  return (
    <View style={[Theme.styles.flex1, Theme.styles.justifyCenter, Theme.styles.alignCenter, themeContainerStyle]}>
      <Text style={[themeTextStyle]}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
