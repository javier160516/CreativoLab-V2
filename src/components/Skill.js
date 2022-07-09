import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Card, ProgressBar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';

const Skill = ({ skills, getSkill, deleteSkill }) => {
    const { themeTextStyle, themeCardsHabilidades, themeBorderHabilidades, themeCategoriesSkills, themeTextCategoriesSkill } = DetectarTema();
    const { category, percentage, skill, id } = skills;
    return (
        <Card style={[Theme.styles.mh10, Theme.styles.mt10, Theme.styles.mb10, Theme.styles.bordeRedondo1, Theme.styles.ph10, Theme.styles.pv20, themeCardsHabilidades, themeBorderHabilidades]} elevation={5}>
            <View style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter]}>
                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, Theme.styles.flex1, Theme.styles.bold, themeTextStyle, { flexWrap: 'wrap' }]}>{skill}</Text>
                <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                    <Pressable
                        style={[Theme.styles.mh10, Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, { padding: 5 }]}
                        onPress={() => getSkill(id)}
                    >
                        <FontAwesome name="pencil" size={20} color='white' />
                    </Pressable>
                    <Pressable
                        style={[Theme.styles.mh10, Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, { padding: 5 }]}
                        onPress={() => deleteSkill(id)}
                    >
                        <FontAwesome name="trash-o" size={18} color="white" />
                    </Pressable>
                </View>
            </View>
            <View>
                <ProgressBar progress={0.5} color={Theme.colors.azul} style={[Theme.styles.bordeRedondo2, Theme.styles.mt20, { height: 20 }]} />
                <Text style={[Theme.styles.positionAbsolute, Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.w100, Theme.styles.textCenter, Theme.styles.mt20]}>{percentage}%</Text>
            </View>
            <View style={[Theme.styles.flexRow, Theme.styles.mt20]}>
                <Text style={[themeTextCategoriesSkill, themeCategoriesSkills, Theme.styles.bordeRedondo2, Theme.styles.pv5, Theme.styles.ph10]}>Categoría: {''}
                    <Text style={[Theme.styles.bold, Theme.styles.textUppercase]}>{category.category}</Text></Text>
            </View>
        </Card>
    )
}

export default Skill