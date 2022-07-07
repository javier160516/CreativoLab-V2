import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import Theme from '../Theme/Theme';
import DetectarTema from '../helpers/DetectarTema';
import { Fontisto } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const { themeContainerStyle, themeCards, themeCardsText, themeGraficsText } = DetectarTema();
  const { setLogueado } = useLogin()
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get('http://dev.creativolab.com.mx/api/v1/dashboard');
        console.log(response.data);
      } catch (error) {
        if (error.response.data.status == 401) {
          Alert.alert(
            'No Autenticado',
            'Parece que no estás autenticado, por favor, inicia sesión',
            [
              {
                text: 'Iniciar Sesión',
                onPress: () => {
                  setLogueado(false);
                  AsyncStorage.clear();
                }
              }
            ]
          )
        }
      }
    }
    obtenerDatos();
  }, [])

  return (
    <SafeAreaView style={[Theme.styles.flex1, themeContainerStyle]}>
      <StatusBar style='auto' />
      <View style={[Theme.styles.mv20, Theme.styles.flex1, Theme.styles.alignCenter]}>
        <ScrollView style={[Theme.styles.w100, Theme.styles.h100]} >
          {/* VISITANTES (HOY) */}
          <Card style={[Theme.styles.mh30, { borderLeftWidth: 4, borderStartColor: Theme.colors.azul }, Theme.styles.mv10, themeCards]} elevation={5}>
            <Card.Content style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter]}>
              <View>
                <Title style={[Theme.styles.fs13, Theme.colors.colorAzul, Theme.styles.textUppercase, Theme.styles.bold, themeCardsText]}>Visitas (Hoy)</Title>
                <Paragraph style={[Theme.colors.colorGray, Theme.styles.fs20, Theme.styles.semiBold, themeCardsText]}>+40,000</Paragraph>
              </View>
              <View>
                <Fontisto name="persons" size={35} color={Theme.colors.grisClaro} />
              </View>
            </Card.Content>
          </Card>
          {/* VISITANTES (MENSUALES) */}
          <Card style={[Theme.styles.mh30, { borderLeftWidth: 4, borderStartColor: Theme.colors.green }, Theme.styles.mv10, themeCards]} elevation={5}>
            <Card.Content style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter]}>
              <View>
                <Title style={[Theme.styles.fs13, Theme.colors.colorGreen, Theme.styles.textUppercase, Theme.styles.bold, themeCardsText]}>Visitas (Mensual)</Title>
                <Paragraph style={[Theme.colors.colorGray, Theme.styles.fs20, Theme.styles.semiBold, themeCardsText]}>+215,000</Paragraph>
              </View>
              <View>
                <Fontisto name="persons" size={35} color={Theme.colors.grisClaro} />
              </View>
            </Card.Content>
          </Card>
          {/* VISITANTES (ANUALES) */}
          <Card style={[Theme.styles.mh30, { borderLeftWidth: 4, borderStartColor: Theme.colors.greenBlue }, Theme.styles.mv10, themeCards]} elevation={5}>
            <Card.Content style={[Theme.styles.flexRow, Theme.styles.justifyBetween, Theme.styles.alignCenter]}>
              <View>
                <Title style={[Theme.styles.fs13, Theme.colors.colorGreenBlue, Theme.styles.textUppercase, Theme.styles.bold, themeCardsText]}>Visitas (Anual)</Title>
                <Paragraph style={[Theme.colors.colorGray, Theme.styles.fs20, Theme.styles.semiBold, themeCardsText]}>+2,580,000</Paragraph>
              </View>
              <View>
                <Fontisto name="persons" size={35} color={Theme.colors.grisClaro} />
              </View>
            </Card.Content>
          </Card>
          {/* RESUMEN DE GANANCIAS */}
          <Card style={[Theme.styles.mh30, Theme.styles.mv10, themeCards]} elevation={5}>
            <View style={[Theme.styles.mb40]}>
              <View style={[Theme.colors.backgroundGray2, themeCards]}>
                <Text style={[Theme.styles.mv10, Theme.styles.textCenter, Theme.colors.colorAzul, Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Resumen de Ganancias</Text>
              </View>
              <Chart
                style={[Theme.styles.w100, { height: 300 }, themeCards]}
                data={[
                  { x: -2, y: 15 },
                  { x: -1, y: 10 },
                  { x: 0, y: 12 },
                  { x: 1, y: 7 },
                  { x: 2, y: 6 },
                  { x: 3, y: 8 },
                  { x: 4, y: 10 },
                  { x: 5, y: 8 },
                  { x: 6, y: 12 },
                  { x: 7, y: 14 },
                  { x: 8, y: 12 },
                  { x: 9, y: 13.5 },
                  { x: 10, y: 18 },
                ]}
                padding={{ left: 30, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 0, max: 10 }}
                yDomain={{ min: 0, max: 20 }}
              >
                <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0), label: { color: themeGraficsText } } }} />
                <HorizontalAxis tickCount={5} theme={{ labels: { label: { color: themeGraficsText } } }} />
                <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
                <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
              </Chart>
            </View>
          </Card>

          {/* FUENTES DE INGRESOS */}
          <Card style={[Theme.styles.mh30, Theme.styles.mv10, themeCards]} elevation={5}>
            <View style={[Theme.styles.mb40]}>
              <View style={[Theme.colors.backgroundGray2, themeCards]}>
                <Text style={[Theme.styles.mv10, Theme.styles.textCenter, Theme.colors.colorAzul, Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Fuente de ingresos</Text>
              </View>
              <Chart
                style={{ height: 200, width: '100%', marginTop: 40 }}
                data={[
                  { x: 5, y: 15 },
                  { x: 6, y: 6 },
                  { x: 7, y: 15 },
                  { x: 8, y: 3 },
                ]}
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 5, max: 8 }}
              >
                <VerticalAxis
                  tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
                  theme={{
                    axis: { stroke: { color: '#aaa', width: 2 } },
                    ticks: { stroke: { color: '#aaa', width: 2 } },
                    labels: { formatter: (v) => v.toFixed(0), label: { color: themeGraficsText } },
                  }}
                />
                <HorizontalAxis
                  tickCount={9}
                  theme={{
                    axis: { stroke: { color: '#aaa', width: 2 } },
                    ticks: { stroke: { color: '#aaa', width: 2 } },
                    labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(0), label: { color: themeGraficsText } },
                  }}
                />
                <Line theme={{ stroke: { color: Theme.colors.azul, width: 2 } }} />
                <Line smoothing="bezier" tension={0.15} theme={{ stroke: { color: Theme.colors.green, width: 2 } }} />
                <Line smoothing="bezier" tension={0.3} theme={{ stroke: { color: Theme.colors.greenBlue, width: 2 } }} />
              </Chart>
              {/* <Chart
                style={[Theme.styles.w100, { height: 300 }]}
                data={[
                  { x: -2, y: 15 },
                  { x: -1, y: 10 },
                  { x: 0, y: 12 },
                  { x: 1, y: 7 },
                  { x: 2, y: 6 },
                  { x: 3, y: 8 },
                  { x: 4, y: 10 },
                  { x: 5, y: 8 },
                  { x: 6, y: 12 },
                  { x: 7, y: 14 },
                  { x: 8, y: 12 },
                  { x: 9, y: 13.5 },
                  { x: 10, y: 18 },
                ]}
                padding={{ left: 30, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 0, max: 10 }}
                yDomain={{ min: 0, max: 20 }}
              >
                <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0),label: { color: themeGraficsText } } }} />
                <HorizontalAxis tickCount={5}  theme={{ labels: { label: { color: themeGraficsText }} }}/>
                <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
                <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
              </Chart> */}
              <View style={[Theme.styles.flexRow, Theme.styles.justifyEvenly, Theme.styles.alignCenter, Theme.styles.mt20]}>
                <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                  <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: Theme.colors.azul, marginRight: 5 }}></View>
                  <Text style={themeCardsText}>Directo</Text>
                </View>
                <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                  <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: Theme.colors.green, marginRight: 5 }}></View>
                  <Text style={themeCardsText}>Social</Text>
                </View>
                <View style={[Theme.styles.flexRow, Theme.styles.alignCenter]}>
                  <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: Theme.colors.greenBlue, marginRight: 5 }}></View>
                  <Text style={themeCardsText}>Remisión</Text>
                </View>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard;