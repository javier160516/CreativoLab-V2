import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Alert, RefreshControl } from 'react-native';
import DetectarTema from '../helpers/DetectarTema';

//component
import EditProfile from '../components/Profile/EditProfile';
import InformationProfile from '../components/Profile/InformationProfile';
import SocialNetwork from '../components/Profile/SocialNetwork';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';
import Languages from '../components/Profile/Languages';

let avatarName = '';

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const Profile = () => {
    const { themeContainerStyle } = DetectarTema();
    const { setLogueado } = useLogin();
    const [personalInformation, setPersonalInformation] = useState({});
    const [professionInformation, setProfessionInformation] = useState({});
    const [socialNetworks, setSocialNetworks] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getDataProfile();
        getSocialNetworks();
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

    const getSocialNetworks = async () => {
        try {
            const response = await axios.get('https://dev.creativolab.com.mx/api/v1/profile/social-networks');
            if (response.data.status == 200) {
                setSocialNetworks(response.data.social_networks);
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

    //Refrescar Registros
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataProfile()
        getSocialNetworks();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={[themeContainerStyle]}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <EditProfile
                    personalInformation={personalInformation}
                    professionInformation={professionInformation}
                    avatarName={avatarName}
                    getDataProfile={getDataProfile}
                />

                <InformationProfile
                    personalInformation={personalInformation}
                    getDataProfile={getDataProfile}
                />

                <SocialNetwork
                    socialNetworks={socialNetworks}
                    getSocialNetworks={getSocialNetworks}
                />

                <Languages />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;