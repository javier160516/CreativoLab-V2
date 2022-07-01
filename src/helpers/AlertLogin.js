import React from 'react'
import { Alert } from 'react-native';
import { Logout } from './Logout';
const AlertLogin = () => {
    Alert.alert(
        'No Autenticado',
        'Parece que no estás autenticado, por favor, inicia sesión',
        [
            {
                text: 'Iniciar Sesión',
                onPress: () => {
                    Logout();
                }
            }
        ]
    )
}

export default AlertLogin