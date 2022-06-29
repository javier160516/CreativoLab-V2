import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import { Fontisto } from '@expo/vector-icons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
const Dashboard = () => {
  const { themeContainerStyle, themeTextStyle, themeColorIcons, themeCards } = DetectarTema();
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  return (
    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.mv30, Theme.styles.flex1, Theme.styles.alignCenter]}>
        <ScrollView style={Theme.styles.w80}>
          <Card style={Theme.styles.w100}>
            <Card.Title subtitle="Card Subtitle" subtitleStyle={[Theme.styles.fsTitle3, Theme.styles.pt20]}/>
            <Card.Content>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard;
