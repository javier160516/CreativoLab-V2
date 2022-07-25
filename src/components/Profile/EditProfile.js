import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import DetectarTema from '../../helpers/DetectarTema';
import ImagesProfile from './ImagesProfile';
import ImageBanner from './ImageBanner';
import Theme from '../../Theme/Theme';
import { Avatar } from 'react-native-paper';

const EditProfile = ({ personalInformation, professionInformation, avatarName, getDataProfile }) => {
    const [showImageProfile, setShowImageProfile] = useState(false);
    const [showImageBanner, setShowImageBanner] = useState(false);
    const { themeColorIcons, themeCardsText, themeBordeSelectPicker } = DetectarTema();

    const { first_name, middle_name, first_last_name, second_last_name,
        avatar, cover, joined_at, address, id} = personalInformation;
    return (
        <View>
            <View style={[{ borderBottomWidth: 2, borderBottomColor: themeBordeSelectPicker.borderColor }]}>
                <TouchableOpacity
                    onPress={() => setShowImageBanner(true)}
                    style={[Theme.styles.alignCenter]}
                    activeOpacity={0.9}
                >
                    {cover ? (
                        <Image source={{ uri: cover }} style={{ width: '100%', height: 200 }} />
                    ) : (
                        <View style={[Theme.styles.w100, { height: 200 }, Theme.colors.backgroundGray3, Theme.styles.alignCenter, Theme.styles.justifyCenter]} >
                            <Entypo name="camera" size={35} style={[Theme.styles.mh10]} color='white' />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={[Theme.styles.alignCenter]}>
                <TouchableOpacity
                    onPress={() => setShowImageProfile(!showImageProfile)}
                    style={[{ marginTop: -80 }]}
                    activeOpacity={0.9}
                >
                    {avatar ? (
                        <View style={[Theme.styles.borde2, themeBordeSelectPicker, { borderRadius: 100 }]}>
                            <Avatar.Image size={150} source={{ uri: avatar }} style={Theme.styles.backgroundBlue} />
                        </View>
                    ) : (
                        <View style={[Theme.styles.borde2, themeBordeSelectPicker, { borderRadius: 100 }]}>
                            <Avatar.Text size={150} label={avatarName} style={[Theme.colors.backgroundGray3]} />
                            <View
                                style={[Theme.styles.positionAbsolute, Theme.styles.justifyCenter, Theme.styles.alignCenter, Theme.colors.backgroundGray, { right: 0, bottom: 0, backgroundColor: 'gray', width: 50, height: 50, borderRadius: 50 / 2 }]}>
                                <Entypo name="camera" size={25} style={[Theme.styles.mh10]} color='white' />
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={Theme.styles.mv10}>
                <Text
                    style={[themeCardsText, Theme.styles.textCenter, Theme.styles.fs20, Theme.styles.semiBold]}
                >
                    {first_name}{' '}
                    {middle_name ? middle_name : null}{' '}
                    {first_last_name}{' '}
                    {second_last_name ? second_last_name : null}
                </Text>
            </View>
            <View style={[Theme.styles.mh20]}>
                <Text style={[themeCardsText, Theme.styles.mv10]}>
                    <Entypo name="briefcase" size={24} color={themeColorIcons} />
                    {' '}{professionInformation.profession}
                </Text>
                {address ? (
                    <Text style={[Theme.styles.mv10, themeCardsText]}>
                        <Entypo name="location-pin" size={24} color={themeColorIcons} />
                        {' '}{address}
                    </Text>
                ) : null}
                <Text style={[themeCardsText, Theme.styles.mv10]}>
                    <Entypo name="calendar" size={24} color={themeColorIcons} />
                    {' '}{joined_at}
                </Text>
            </View>
            <ImagesProfile
                showImageProfile={showImageProfile}
                setShowImageProfile={setShowImageProfile}
                getDataProfile={getDataProfile}
            />
            <ImageBanner
                showImageBanner={showImageBanner}
                setShowImageBanner={setShowImageBanner}
                getDataProfile={getDataProfile}
            />
        </View>

    )
}

export default EditProfile;