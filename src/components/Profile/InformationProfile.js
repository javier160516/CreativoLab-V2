import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, TouchableOpacity } from 'react-native'
import Theme from '../../Theme/Theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import DetectarTema from '../../helpers/DetectarTema';
import TextInput from '../TextInput';

function InformationProfile() {
    const { themeBorderOutlineInput, themeContainerStyle, themeColorIcons, themeBorderActiveInput, themeCards, themeCardsText, themeBorderSelectionInput } = DetectarTema();
    return (
        <View>
            <Card style={[themeCards, Theme.styles.bordeRedondo1, Theme.styles.mv10, Theme.styles.pv10, Theme.styles.mh10]}>
                <Text style={[Theme.styles.fs20, Theme.styles.bold, Theme.styles.mh10, themeCardsText]}>Información del Perfil</Text>
                <Text style={[Theme.styles.mh10, themeCardsText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultrices odio, in tincidunt dui.
                    Donec velit diam, pharetra ac mattis maximus, iaculis id libero.</Text>
                <View style={[Theme.styles.pv20]}>
                    <Text style={[Theme.styles.mh10, themeCardsText]}>Sobre Mi</Text>
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
                </View>
                <Text style={[Theme.styles.mh10, themeCardsText]}>Fecha de Nacimiento</Text>
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
                <View>
                    <Text style={[Theme.styles.mh10, Theme.styles.pv10, themeCardsText]}>Numero de Telefono</Text>
                    <View>
                        <Text style={[Theme.styles.fs17, themeCardsText, Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 20, top: 30, height: '50%' }]}>(+52)</Text>
                        <View style={[Theme.styles.mh10]}>
                            <TextInput
                                multiline={true}
                                mode="outlined"
                                keyboardType='numeric'
                                selectionColor={themeBorderSelectionInput}
                                outlineColor={themeBorderOutlineInput}
                                activeOutlineColor={themeBorderActiveInput}
                                returnKeyType='next'
                                underlineColor="transparent"
                                placeholderTextColor={Theme.colors.gris}
                                style={[Theme.styles.mt10, themeCards]}
                                theme={{ colors: { text: themeCardsText.color } }}
                                onChangeText={(value) => setDetails(value)}
                            />
                        </View>
                    </View>

                </View>

                <View style={[Theme.styles.pv20, Theme.styles.alignCenter]}>
                    <Pressable style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30]}>
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.semiBold]}>
                            Guardar Cambios
                        </Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    )
}

export default InformationProfile