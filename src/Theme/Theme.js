import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        dark: {
            darkContainer: {backgroundColor: '#000'},
            darkText: {color: '#FFF'}
        },
        light: {lightContainer: {backgroundColor: '#FFF'},
            lightText: {color: '#000'}
        },
        blanco: '#FFF',
        negro: '#000',
        azul: '#1363DF',
        naranjaOscuro: '#D62828',
        naranja: '#F77F00',
        gris: '#CCC',
    },
    styles: {
        bold:{fontWeight: '900'},
        semiBold: {fontWeight: '700'},
        flex1: {flex: 1},
        mb10: {marginBottom: 10},
        mb20: {marginBottom: 20},
        mt10: {marginTop: 10},
        mt20: {marginTop: 20},
        justifyCenter: {justifyContent: 'center'},
        justifyBetween: 'space-between',
        alignCenter: {alignItems: 'center'},
        w100: {width: '100%'},
        textUppercase: {textTransform: 'uppercase'},
        flexRow: {flexDirection: 'row'},
        fs16: {fontSize: 15},
        fs20: {fontSize: 20},
    }
}

export default Theme;