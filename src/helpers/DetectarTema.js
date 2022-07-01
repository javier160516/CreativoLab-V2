import { useColorScheme } from 'react-native';
import Theme from '../Theme/Theme';


const DetectarTema = () => {
    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === 'light' ? Theme.colors.light.lightText : Theme.colors.dark.darkText;
    const themeContainerStyle = colorScheme === 'light' ? Theme.colors.light.lightContainer : Theme.colors.dark.darkContainer;
    const themeColorIcons = colorScheme === 'light' ? 'black' : 'white';
    const themeButtons = colorScheme === 'light' ? [Theme.styles.bordeAzul, Theme.styles.borde2] : [Theme.colors.backgroundBlanco, Theme.styles.borde1];
    const themeFormularios = colorScheme === 'light' ? Theme.colors.dark.darkContainer : Theme.colors.light.lightContainer;
    const themeTextFormularios = colorScheme === 'light' ? Theme.colors.dark.darkText : Theme.colors.light.lightText;
    const themeCards = colorScheme === 'light' ? Theme.colors.backgroundBlanco : Theme.colors.backgroundGray3;
    const themeCardsText = colorScheme === 'light' ? '' : Theme.colors.dark.darkText;
    const themeGraficsText = colorScheme === 'light' ? Theme.colors.negro : Theme.colors.blanco;
    return {
        themeTextStyle,
        themeContainerStyle,
        themeColorIcons,
        themeButtons,
        themeFormularios,
        themeTextFormularios,
        themeCards,
        themeCardsText,
        themeGraficsText
    };
}

export default DetectarTema