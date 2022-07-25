import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import Theme from '../../Theme/Theme';
import { Entypo } from '@expo/vector-icons';
import DetectarTema from '../../helpers/DetectarTema';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import TextInput from '../TextInput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';

const SocialNetwork = ({ socialNetworks, getSocialNetworks }) => {
    const { themeBorderOutlineInput, themeColorIcons, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput,themeCardsHabilidades } = DetectarTema();
    const [socialFacebook, setSocialFacebook] = useState({ value: '', error: '' });
    const [socialTiktok, setSocialTiktok] = useState({ value: '', error: '' });
    const [socialTwitter, setSocialTwitter] = useState({ value: '', error: '' });
    const [socialLinkedin, setSocialLinkedin] = useState({ value: '', error: '' });
    const [socialYoutube, setSocialYoutube] = useState({ value: '', error: '' });
    const [socialInstagram, setSocialInstagram] = useState({ value: '', error: '' });
    const { setLogueado } = useLogin();

    const { facebook, instagram, linkedin, tiktok, twitter, youtube } = socialNetworks;

    useEffect(() => {
        setSocialFacebook({ value: facebook, error: '' });
        setSocialInstagram({ value: instagram, error: '' });
        setSocialLinkedin({ value: linkedin, error: '' });
        setSocialTiktok({ value: tiktok, error: '' });
        setSocialTwitter({ value: twitter, error: '' });
        setSocialYoutube({ value: youtube, error: '' });
    }, [socialNetworks])

    const handleSocialNetworks = async () => {
        const socialNetworks = {
            facebook: socialFacebook.value,
            instagram: socialInstagram.value,
            linkedin: socialLinkedin.value,
            tiktok: socialTiktok.value,
            twitter: socialTwitter.value,
            youtube: socialYoutube.value,
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.put('http://dev.creativolab.com.mx/api/v1/profile/social-networks', socialNetworks, config);
            if (response.data.status == 200) {
                Alert.alert('¡Redes Guardadas!', 'Los links de tus redes sociales han sido guardados con exito!', [{ text: 'Ok' }]);
                getSocialNetworks();
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
            } else if (error.response.data.status == 400) {
                setSocialFacebook({ ...socialFacebook, error: error.response.data.errors.facebook });
                setSocialInstagram({ ...socialInstagram, error: error.response.data.errors.instagram });
                setSocialLinkedin({ ...socialLinkedin, error: error.response.data.errors.linkedin });
                setSocialTiktok({ ...socialTiktok, error: error.response.data.errors.tiktok });
                setSocialTwitter({ ...socialTwitter, error: error.response.data.errors.twitter });
                setSocialYoutube({ ...socialYoutube, error: error.response.data.errors.youtube });
            }
        }

    }

    return (
            <Card style={[themeCardsHabilidades, Theme.styles.bordeRedondo1, Theme.styles.mv10, Theme.styles.pv10, Theme.styles.mh10]}>
                <Text style={[themeCardsText, Theme.styles.mh10, Theme.styles.bold, Theme.styles.fs20]}>Redes Sociales</Text>
                <Text style={[Theme.styles.mh10, themeCardsText]}>
                    En este apartado podrás subir los links de tus redes sociales donde tengas tus trabajos para más demostración.
                </Text>
                <View style={[Theme.styles.ph10]}>
                    <Entypo style={[Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]} name="facebook" size={30} color={themeColorIcons} />
                    <View>
                        <TextInput
                            textAlign={'Center'}
                            mode="outlined"
                            selectionColor={themeBorderSelectionInput}
                            outlineColor={themeBorderOutlineInput}
                            activeOutlineColor={themeBorderActiveInput}
                            returnKeyType='next'
                            underlineColor="transparent"
                            placeholder='https://www.facebook.com'
                            placeholderTextColor={Theme.colors.gris}
                            style={[Theme.styles.mt10, themeCards, Theme.styles.ph30]}
                            theme={{ colors: { text: themeCardsText.color } }}
                            value={socialFacebook.value}
                            onChangeText={(value) => setSocialFacebook({ value: value, error: '' })}
                            error={!!socialFacebook.error}
                            errorText={socialFacebook.error}
                        />
                    </View>
                </View>
                <View style={[Theme.styles.ph10]}>
                    <FontAwesome5 style={[Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]} name="tiktok" size={30} color={themeColorIcons} />
                    <View>
                        <TextInput
                            textAlign={'Center'}
                            mode="outlined"
                            selectionColor={themeBorderSelectionInput}
                            outlineColor={themeBorderOutlineInput}
                            activeOutlineColor={themeBorderActiveInput}
                            returnKeyType='next'
                            underlineColor="transparent"
                            placeholder='https://www.tiktok.com'
                            placeholderTextColor={Theme.colors.gris}
                            style={[Theme.styles.mt10, themeCards, Theme.styles.ph30]}
                            theme={{ colors: { text: themeCardsText.color } }}
                            value={socialTiktok.value}
                            onChangeText={(value) => setSocialTiktok({ value: value, error: '' })}
                            error={!!socialTiktok.error}
                            errorText={socialTiktok.error}
                        />
                    </View>
                </View>
                <View style={[Theme.styles.ph10]}>
                    <Entypo style={[Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]} name="twitter" size={30} color={themeColorIcons} />
                    <View>
                        <TextInput
                            textAlign={'Center'}
                            mode="outlined"
                            selectionColor={themeBorderSelectionInput}
                            outlineColor={themeBorderOutlineInput}
                            activeOutlineColor={themeBorderActiveInput}
                            returnKeyType='next'
                            underlineColor="transparent"
                            placeholder='https://www.twitter.com'
                            placeholderTextColor={Theme.colors.gris}
                            style={[Theme.styles.mt10, themeCards, Theme.styles.ph30]}
                            theme={{ colors: { text: themeCardsText.color } }}
                            value={socialTwitter.value}
                            onChangeText={(value) => setSocialTwitter({ value: value, error: '' })}
                            error={!!socialTwitter.error}
                            errorText={socialTwitter.error}
                        />
                    </View>
                </View>
                <View style={[Theme.styles.ph10]}>
                    <Entypo style={[Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]} name="linkedin" size={30} color={themeColorIcons} />
                    <View>
                        <TextInput
                            textAlign={'Center'}
                            mode="outlined"
                            selectionColor={themeBorderSelectionInput}
                            outlineColor={themeBorderOutlineInput}
                            activeOutlineColor={themeBorderActiveInput}
                            returnKeyType='next'
                            underlineColor="transparent"
                            placeholder='https://mx.linkedin.com/'
                            placeholderTextColor={Theme.colors.gris}
                            style={[Theme.styles.mt10, themeCards, Theme.styles.ph30]}
                            theme={{ colors: { text: themeCardsText.color } }}
                            value={socialLinkedin.value}
                            onChangeText={(value) => setSocialLinkedin({ value: value, error: '' })}
                            error={!!socialLinkedin.error}
                            errorText={socialLinkedin.error}
                        />
                    </View>
                </View>
                <View style={[Theme.styles.ph10]}>
                    <Entypo style={[Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]} name="youtube" size={30} color={themeColorIcons} />
                    <View>
                        <TextInput
                            textAlign={'Center'}
                            mode="outlined"
                            selectionColor={themeBorderSelectionInput}
                            outlineColor={themeBorderOutlineInput}
                            activeOutlineColor={themeBorderActiveInput}
                            returnKeyType='next'
                            underlineColor="transparent"
                            placeholder='https://www.youtube.com/'
                            placeholderTextColor={Theme.colors.gris}
                            style={[Theme.styles.mt10, themeCards, Theme.styles.ph30]}
                            theme={{ colors: { text: themeCardsText.color } }}
                            value={socialYoutube.value}
                            onChangeText={(value) => setSocialYoutube({ value: value, error: '' })}
                            error={!!socialYoutube.error}
                            errorText={socialYoutube.error}
                        />
                    </View>
                </View>
                <View style={[Theme.styles.ph10]}>
                    <Entypo
                        style={[Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]}
                        name="instagram"
                        size={30}
                        color={themeColorIcons}
                    />
                    <View>
                        <TextInput
                            textAlign={'Center'}
                            mode="outlined"
                            selectionColor={themeBorderSelectionInput}
                            outlineColor={themeBorderOutlineInput}
                            activeOutlineColor={themeBorderActiveInput}
                            returnKeyType='next'
                            underlineColor="transparent"
                            placeholder='https://www.instagram.com/'
                            placeholderTextColor={Theme.colors.gris}
                            style={[Theme.styles.mt10, themeCards, Theme.styles.ph30]}
                            theme={{ colors: { text: themeCardsText.color } }}
                            value={socialInstagram.value}
                            onChangeText={(value) => setSocialInstagram({ value: value, error: '' })}
                            error={!!socialInstagram.error}
                            errorText={socialInstagram.error}
                        />
                    </View>
                </View>
                <View style={[Theme.styles.pv20, Theme.styles.alignCenter]}>
                    <Pressable
                        onPress={() => handleSocialNetworks()}
                        style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30]}
                    >
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.semiBold]}>Guardar Enlaces</Text>
                    </Pressable>
                </View>
            </Card>
    )
}

export default SocialNetwork