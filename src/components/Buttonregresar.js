import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Theme from '../Theme/Theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import DetectarTema from '../helpers/DetectarTema';

const Buttonregresar = ({ regresar }) => {
  const { themeColorIcons } = DetectarTema();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={regresar}
      style={[Theme.styles.positionAbsolute, Theme.styles.top, Theme.styles.left, Theme.styles.zindex]}
    >
      <Ionicons name='arrow-back' size={32} color={themeColorIcons} />
    </TouchableOpacity>
  )
}

export default Buttonregresar