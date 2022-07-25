import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native'
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';

//component
import EditProfile from '../components/Profile/EditProfile';
import InformationProfile from '../components/Profile/InformationProfile';
import SocialNetwork from '../components/Profile/SocialNetwork';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';

let avatarName = '';
const Profile = () => {
    const { themeContainerStyle } = DetectarTema();
    const { setLogueado } = useLogin();
    const [personalInformation, setPersonalInformation] = useState({});
    const [professionInformation, setProfessionInformation] = useState({});
    useEffect(() => {
        getDataProfile();
    }, []);

    const getDataProfile = async () => {
        try {
            const response = await axios.get('https://dev.creativolab.com.mx/api/v1/profile');
            if (response.status == 200) {
                setPersonalInformation(response.data.user);
                setProfessionInformation(response.data.profession);
                avatarName = `${response.data.user.first_name.substr(0, 1)}${response.data.user.first_last_name.substr(0, 1)}`;
            }
        } catch (error) {
            if (error.response.data.status == 401) {
                Alert.alert(
                    'No Autenticado',
                    'Parece que no estás autenticado, por favor, inicia sesión',
                    [{
                        text: 'Iniciar Sesión',
                        onPress: () => {
                            setLogueado(false);
                            AsyncStorage.clear();
                        }
                    }]
                )
            }
        }
    }

    return (
        <SafeAreaView style={[themeContainerStyle]}>
            <ScrollView>

                <EditProfile 
                    personalInformation={personalInformation}
                    professionInformation={professionInformation}
                    avatarName={avatarName}
                    getDataProfile={getDataProfile}
                />

                <InformationProfile 
                    personalInformation={personalInformation}
                />

                <SocialNetwork />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;