import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";


const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        dark: {
            darkContainer: { backgroundColor: '#000' },
            darkText: { color: '#FFF' }
        },
        light: {
            lightContainer: { backgroundColor: '#FFF' },
            lightText: { color: '#000' }
        },
        backgroundBlanco: { backgroundColor: '#FFF' },
        backgroundGray: { backgroundColor: '#dddfeb' },
        backgroundGray2: { backgroundColor: '#f8f9fc' },
        backgroundGray3: { backgroundColor: '#5A5C69' },
        backgroundGray4: { backgroundColor: '#2B2B2B' },
        backgroundGray5: { backgroundColor: '#CCC' },
        backgroundWhiteGray: { backgroundColor: '#F5F5F5' },
        colorAzul: { color: '#1363DF' },
        colorGreen: { color: '#1CC88A' },
        colorGreenBlue: { color: '#36B9CC' },
        colorGray: { color: '#5A5C69' },
        backgroundRed: { backgroundColor: '#F32424' },
        backgroundBlue: { backgroundColor: '#1336DF' },
        colorAzul: { color: '#1363DF' },
        WhiteColor: { color: '#FFF' },
        blackColor: { color: '#000' },
        blanco: '#FFF',
        negro: '#000',
        azul: '#1363DF',
        naranjaOscuro: '#D62828',
        naranja: '#F77F00',
        gris: '#5A5C69',
        grisOcuro: '#2B2B2B',
        grisOcuro2: '#555',
        grisClaro: '#dddfeb',
        green: '#1CC88A',
        greenBlue: '#36B9CC',
        bordeTextInput: '#CCC',
    },
    styles: {
        /** FLEX **/
        flex1: { flex: 1 },
        flexRow: { flexDirection: 'row' },
        /** PADDING **/
        pv5: { paddingVertical: 5 },
        pv10: { paddingVertical: 10 },
        pv20: { paddingVertical: 20 },
        pv30: { paddingVertical: 30 },
        pv60: { paddingVertical: 60 },
        ph10: { paddingHorizontal: 10 },
        ph20: { paddingHorizontal: 20 },
        ph30: {paddingHorizontal: 30},
        ph60: { paddingHorizontal: 60 },
        pb10: { paddingBottom: 10 },
        pb40: { paddingBottom: 40 },
        pb20: { paddingBottom: 20 },
        pt8: { paddingTop: 8 },
        pt10: { paddingTop: 10 },
        pt20: { paddingTop: 20 },
        pt40: { paddingTop: 40 },
        pt60: { paddingTop: 60 },
        pt80: { paddingTop: 80 },
        /** MARGIN **/
        /** VERTICAL **/
        mv10: { marginVertical: 10 },
        mv20: { marginVertical: 20 },
        mv30: { marginVertical: 30 },
        mv60: { marginVertical: 60 },
        /** HORIZONTAL **/
        mh10: { marginHorizontal: 10 },
        mh20: { marginHorizontal: 20 },
        mh30: { marginHorizontal: 30 },
        mh60: { marginHorizontal: 60 },
        /** LEFT **/
        ml10: { marginLeft: 10 },
        /** RIGHT **/
        mr10: { marginRight: 10 },
        /** BOTTOM **/
        mb10: { marginBottom: 10 },
        mb20: { marginBottom: 20 },
        mb40: { marginBottom: 40 },
        mb60: { marginBottom: 60 },
        mb80: { marginBottom: 80 },
        /** TOP **/
        mt10: { marginTop: 10 },
        mt20: { marginTop: 20 },
        mt40: { marginTop: 40 },
        mt60: { marginTop: 60 },
        /** JUSTIFY-CONTENT **/
        justifyCenter: { justifyContent: 'center' },
        justifyBetween: { justifyContent: 'space-between' },
        justifyEvenly: { justifyContent: 'space-evenly' },
        /** TEXTO **/
        alignCenter: { alignItems: 'center' },
        textCenter: { textAlign: 'center' },
        textUppercase: { textTransform: 'uppercase' },
        /** TAMAÑO DE TEXTO **/
        fs13: { fontSize: 13 },
        fs15: { fontSize: 15 },
        fs16: { fontSize: 16 },
        fs17: { fontSize: 17 },
        fs20: { fontSize: 20 },
        fs22: { fontSize: 22 },
        fsTitle: { fontSize: 40 },
        fsTitle2: { fontSize: 30 },
        fsTitle3: { fontSize: 25 },
        /** ANCHO DEL TEXTO **/
        bold: { fontWeight: '900' },
        semiBold: { fontWeight: '700' },
        /** POSICIONES **/
        positionAbsolute: { position: 'absolute' },
        topStatus: { top: getStatusBarHeight() },
        top: { top: 33 },
        left: { left: 18 },

        /** ANCHO Y ALTO **/
        w100: { width: '100%' },
        w90: { width: '90%' },
        w80: { width: '80%' },
        w25: { width: 25 },
        h100: { height: '100%' },
        h25: { height: 25 },

        /** COLOR DE BORDES **/
        bordeAzul: { borderColor: '#1363DF' },
        bordeBlanco: { borderColor: '#FFFFFF' },
        bordeGris: { borderColor: '#CCC' },
        bordeGrisOscuro: { borderColor: '#444' },
        bordeRojo: { borderColor: '#F32424' },

        /** TAMAÑO DE BORDE **/
        borde1: { borderWidth: 1 },
        borde2: { borderWidth: 2 },

        /** BORDE REDONDO **/
        bordeRedondo1: { borderRadius: 5 },
        bordeRedondo2: { borderRadius: 10 },

        /** INDEX **/
        zindex: { zIndex: 9999 },

        //Sombras
        sombra: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
        }
    }
}

export default Theme;