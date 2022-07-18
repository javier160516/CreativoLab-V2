import React, {useState} from 'react'
import { View, Text, ScrollView, SafeAreaView, Pressable, TouchableOpacity} from 'react-native'
import Theme from '../../Theme/Theme';
import { Entypo } from '@expo/vector-icons';
import DetectarTema from '../../helpers/DetectarTema';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import TextInput from '../TextInput';

function Address() {
    const { themeBorderOutlineInput, themeContainerStyle, themeColorIcons, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput } = DetectarTema();
    return (
        <View>
            <Card style={[themeCards, Theme.styles.bordeRedondo1, Theme.styles.mv10, Theme.styles.pv10, Theme.styles.mh10]}>
                <Text style={[themeCardsText, Theme.styles.mh10, Theme.styles.bold, Theme.styles.fs20]}>Dirección</Text>
                <Text style={[Theme.styles.mh10, themeCardsText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultrices odio, in tincidunt dui.
                    Donec velit diam, pharetra ac mattis maximus, iaculis id libero.</Text>
                <TextInput
                    multiline={true}
                    mode="outlined"
                    selectionColor={themeBorderSelectionInput}
                    outlineColor={themeBorderOutlineInput}
                    activeOutlineColor={themeBorderActiveInput}
                    returnKeyType='next'
                    underlineColor="transparent"
                    placeholderTextColor={Theme.colors.gris}
                    style={[Theme.styles.mh10, Theme.styles.mt10, themeCards]}
                    theme={{ colors: { text: themeCardsText.color } }}
                    onChangeText={(value) => setDetails(value)}
                />
                <View style={[Theme.styles.pv20, Theme.styles.alignCenter]}>
                    <Pressable style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30]}>
                        <Text style={[Theme.colors.WhiteColor]}>Guardar Dirección</Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    )
}

export default Address