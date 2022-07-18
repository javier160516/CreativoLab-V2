import React from 'react'
import { Pressable, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import DetectarTema from '../../helpers/DetectarTema';
import Theme from '../../Theme/Theme';
import { FontAwesome } from '@expo/vector-icons';

const ExperiencesComponent = ({experience, getExperience, deleteExperience}) => {
    const { themeTextStyle, themeCards } = DetectarTema();
    const {position, company, started_at, ended_at, details, id} = experience;
  return (
    <Card style={[Theme.styles.mh10, Theme.styles.mv10, themeCards]} elevation={5}>
            <Card.Content>
                <Text style={[themeTextStyle, Theme.styles.fs20, Theme.styles.mb10, Theme.styles.bold]}>{position} {''}
                    <Text style={Theme.styles.fs17}>({started_at}</Text> - {''}
                    <Text style={Theme.styles.fs17}>{ended_at})</Text>
                </Text>
                <Text style={[themeTextStyle, Theme.styles.fs17, Theme.styles.mb10]}>{company}</Text>
                <Text style={[themeTextStyle, Theme.styles.fs16, { textAlign: 'justify' }]}>{details}</Text>
                <View style={[Theme.styles.flexRow, Theme.styles.mt20,Theme.styles.mb10, Theme.styles.justifyEvenly]}>
                    <Pressable
                        style={[Theme.colors.backgroundBlue, Theme.styles.bordeRedondo1, Theme.styles.flexRow, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.alignCenter]}
                        onPress={() => getExperience(id)}
                    >
                        <FontAwesome name="pencil" size={18} color="white" />
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17,{marginLeft: 10}]}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[Theme.colors.backgroundRed, Theme.styles.bordeRedondo1, Theme.styles.flexRow, Theme.styles.pv10, Theme.styles.ph10, Theme.styles.alignCenter]}
                        onPress={() => deleteExperience(id)}
                    >
                        <FontAwesome name="trash-o" size={18} color="white" />
                        <Text style={[Theme.colors.WhiteColor, Theme.styles.fs17, {marginLeft: 10}]}>Eliminar</Text>
                    </Pressable>
                </View>
            </Card.Content>
        </Card>
  )
}

export default ExperiencesComponent