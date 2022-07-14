import React, { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { Card } from 'react-native-paper'
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema'
import { FontAwesome } from '@expo/vector-icons';

const Testimonial = ({ testimonials, deleteTestimonial, getTestimonial }) => {
    const { themeTextStyle, themeCardsHabilidades, themeBorderHabilidades, themeCategoriesSkills, themeTextCategoriesSkill } = DetectarTema();

    const { photo, full_name, position, company, comment, id } = testimonials;

    return (
        <Card style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb10, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pv20, themeCardsHabilidades, themeBorderHabilidades]} elevation={1}>
            <View>
                <View style={[Theme.styles.flexRow, Theme.styles.mb10, {paddingLeft: 10}]}>
                    {photo ? (
                        <View style={{paddingRight: 10}}>
                            <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />
                        </View>
                    ) : null}
                    <View style={[Theme.styles.flex1]}>

                        <View>
                            <Text style={[themeTextStyle, Theme.styles.fs17, Theme.styles.bold]}>{full_name}</Text>
                            <Text style={[themeTextStyle, Theme.styles.fs13, Theme.styles.normal, Theme.styles.mb10]}>({position})</Text>
                        </View>
                        <Text style={[themeTextStyle, Theme.styles.fs13, Theme.styles.semiBold]}>{company}</Text>
                    </View>
                </View>
                <Text style={[themeTextStyle, Theme.styles.ph10]}>
                    {comment}
                </Text>
            </View>
            <View style={[Theme.styles.flexRow, Theme.styles.mt20, Theme.styles.justifyEvenly]}>
                <Pressable
                    style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.alignCenter]}
                    onPress={() => getTestimonial(id)}
                >
                    <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, { marginLeft: 10 }]}><FontAwesome name="pencil" size={20} color='white' /> Editar</Text>
                </Pressable>
                <Pressable
                    style={[Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.alignCenter]}
                    onPress={() => deleteTestimonial(id)}
                >
                    <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, { marginLeft: 10 }]}><FontAwesome name="trash-o" size={20} color='white' /> Eliminar</Text>
                </Pressable>
            </View>
        </Card>
    )
}

export default Testimonial