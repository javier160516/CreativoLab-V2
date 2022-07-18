import React, {useState} from 'react';
import { View, ScrollView, SafeAreaView} from 'react-native'
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';

//component
import EditProfile from '../components/Profile/EditProfile';
import InformationProfile from '../components/Profile/InformationProfile';
import Address from '../components/Profile/Address';
import SocialNetwork from '../components/Profile/SocialNetwork';

const Profile = () => {
    const { themeBorderOutlineInput, themeContainerStyle, themeColorIcons, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput } = DetectarTema();
    return (
        <SafeAreaView style={[themeContainerStyle]}>
            <ScrollView style={[Theme.styles.ph10]}>
                <View>
                   <EditProfile/>
                </View>
                <View>
                    <InformationProfile/>
                </View>
                <View>
                    <Address/>
                </View>
                <View>
                    <SocialNetwork/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;