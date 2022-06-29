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
        colorAzul: { color: '#1363DF' },
        blanco: '#FFF',
        negro: '#000',
        azul: '#1363DF',
        naranjaOscuro: '#D62828',
        naranja: '#F77F00',
        gris: '#CCC',
        grisOcuro: '#2B2B2B',
        grisClaro: '#dddfeb',
    },
    styles: {
        /** FLEX **/
        flex1: { flex: 1 },
        flexRow: { flexDirection: 'row' },
        /** PADDING **/
        pv20: { paddingVertical: 20 },
        pv30: { paddingVertical: 30 },
        pv60: { paddingVertical: 60 },
        ph10: { paddingHorizontal: 10 },
        ph20: { paddingHorizontal: 20 },
        pb40: { paddingBottom: 40 },
        pb20: { paddingBottom: 20 },
        pt8: { paddingTop: 8 },
        pt20: { paddingTop: 20 },
        pt40: { paddingTop: 40 },
        /** MARGIN **/
        mv10: { marginVertical: 10 },
        mv30: { marginVertical: 30 },
        mv60: { marginVertical: 60 },
        mb10: { marginBottom: 10 },
        mb20: { marginBottom: 20 },
        mb40: { marginBottom: 40 },
        mb60: { marginBottom: 60 },
        mb80: { marginBottom: 80 },
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