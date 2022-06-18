import { useColorScheme } from 'react-native';
import Theme from '../Theme/Theme';


const DetectarTema = () => {
    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === 'light' ? Theme.colors.light.lightText : Theme.colors.dark.darkText;
    const themeContainerStyle = colorScheme === 'light' ? Theme.colors.light.lightContainer : Theme.colors.dark.darkContainer;

    return [
        themeTextStyle,
        themeContainerStyle
    ];
}

export default DetectarTema