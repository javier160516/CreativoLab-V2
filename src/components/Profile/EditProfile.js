import React, { useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import DetectarTema from '../../helpers/DetectarTema';
import { FontAwesome5 } from '@expo/vector-icons';
import ImagesProfile from './ImagesProfile';
import Theme from '../../Theme/Theme';

const EditProfile = () => {
    const [showImageProfile, setShowImageProfile] = useState(false);
    const { themeBorderOutlineInput, themeContainerStyle, themeColorIcons, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput } = DetectarTema();
    return (
        <View>
            <TouchableOpacity onPress={() => setShowImageProfile(!showImageProfile)} style={[Theme.colors.backgroundGray3, Theme.styles.alignCenter, Theme.styles.mv10, Theme.styles.bordeRedondo1, { padding: 80 }]}>
                <Entypo name="camera" size={24} style={[Theme.styles.mh10]} color={themeColorIcons} />
            </TouchableOpacity>
            <View style={[Theme.styles.alignCenter]}>
                <TouchableOpacity onPress={() => setShowImageProfile(!showImageProfile)} style={[Theme.styles.borde2, Theme.colors.backgroundGray3, Theme.styles.justifyCenter, { paddingHorizontal: 50, paddingVertical: 50, marginTop: -70, borderRadius: 100 }]}>
                    <FontAwesome5 name="user" size={30} color={themeColorIcons} />
                </TouchableOpacity>
            </View>
            <View style={[Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.flexRow]}>
                <Pressable style={[Theme.styles.bold, Theme.styles.mv10, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1]}>
                    <Text style={[Theme.styles.fs16, Theme.styles.semiBold, Theme.colors.WhiteColor, Theme.styles.pv10, Theme.styles.ph20]}><Entypo name="pencil" size={24} color="white" />Editar Perfil</Text>
                </Pressable>
                <Pressable style={[Theme.styles.mh10, Theme.colors.backgroundGray3, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.bordeRedondo1]}>
                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                </Pressable>
            </View>
            <View style={[Theme.styles.mh20, Theme.styles.pv30]}>
                <Text style={themeCardsText}><Entypo name="briefcase" size={24} color={themeColorIcons} /> Agente Inmobiliario </Text>
                <Text style={[Theme.styles.pv10, themeCardsText]}><Entypo name="location-pin" size={24} color={themeColorIcons} /> Isla Mujeres, Quintana Roo </Text>
                <Text style={themeCardsText}><Entypo name="calendar" size={24} color={themeColorIcons} /> Joined on Only 13, 2022 </Text>
            </View>
            <ImagesProfile
                showImageProfile={showImageProfile}
                setShowImageProfile={setShowImageProfile}
            />
        </View>

    )
}

export default EditProfile;