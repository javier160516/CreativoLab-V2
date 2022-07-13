import React, { useState } from 'react'
import { Text, Pressable, TouchableOpacity, Modal, View, ScrollView, Image } from 'react-native'
import DetectarTema from '../helpers/DetectarTema';
import Theme from '../Theme/Theme';
import TextInput from './TextInput';
import { Entypo } from '@expo/vector-icons';
import ImageProduct from './ImageProduct';
import { Picker } from '@react-native-picker/picker';


const ModalProductos = ({ showModalProducto, setShowModalProducto }) => {
    const [showImageProduct, setShowImageProduct] = useState(false);
    const [image, setImage] = useState(null);
    const { themeCards, themeCardsText, themeBordeSelectPicker, themeBorderSelectionInput, themeBorderOutlineInput, themeBorderActiveInput } = DetectarTema();
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalProducto}
                onRequestClose={() => {
                    setShowModalProducto(false);
                }}
            >
                <View style={[Theme.styles.flex1, themeCards]}>
                    <ScrollView>
                        <Text style={[Theme.styles.textCenter, themeCardsText, Theme.styles.bold, Theme.styles.fs20, Theme.styles.pv10]}>Agregar Producto</Text>
                        <View style={[Theme.styles.mh20, Theme.styles.pv20]}>
                            <View>
                                <Text style={[Theme.styles.fs17, themeCardsText, Theme.styles.bold]}>Nombre</Text>
                                <TextInput
                                    placeholder="Nombre"
                                    textAlign='center'
                                    mode="outlined"
                                    selectionColor={themeBorderSelectionInput}
                                    outlineColor={themeBorderOutlineInput}
                                    activeOutlineColor={themeBorderActiveInput}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    placeholderTextColor={Theme.colors.gris}
                                    style={[Theme.styles.mt10, themeCards]}
                                    theme={{ colors: { text: themeCardsText.color } }}
                                />
                            </View>
                            <View>
                                <Text style={[Theme.styles.mt10, themeCardsText, Theme.styles.fs17, Theme.styles.bold]}>Ubicación</Text>
                                <TextInput
                                    multiline={true}
                                    placeholder="Ubicación"
                                    textAlign='center'
                                    mode="outlined"
                                    selectionColor={themeBorderSelectionInput}
                                    outlineColor={themeBorderOutlineInput}
                                    activeOutlineColor={themeBorderActiveInput}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    placeholderTextColor={Theme.colors.gris}
                                    style={[Theme.styles.mt10, themeCards]}
                                    theme={{ colors: { text: themeCardsText.color } }}
                                />
                                <View style={[Theme.styles.pv10]}>
                                    <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Tipo</Text>
                                    <View style={[Theme.styles.borde1, Theme.styles.bordeRedondo1, Theme.styles.mt10, themeBordeSelectPicker]}>
                                        <Picker
                                            mode='dropdown'
                                            style={[themeCards, themeCardsText]}
                                        >
                                            <Picker.Item label='---Seleccionar Tipo---' style={{ backgroundColor: themeCards.backgroundColor, color: themeCardsText.color }} />
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={[Theme.styles.bold, Theme.styles.fs17, themeCardsText]}>Precio</Text>
                                <View style={[themeCards, Theme.styles.flexRow, Theme.styles.alignCenter]}>
                                    <Text style={[Theme.styles.fs20, themeCardsText, Theme.styles.positionAbsolute, Theme.styles.zindex, { left: 10, top: 30, height: '50%' }]}>$</Text>
                                    <TextInput
                                        textAlign={'Center'}
                                        mode="outlined"
                                        keyboardType='numeric'
                                        selectionColor={themeBorderSelectionInput}
                                        outlineColor={themeBorderOutlineInput}
                                        activeOutlineColor={themeBorderActiveInput}
                                        returnKeyType='next'
                                        underlineColor="transparent"
                                        placeholderTextColor={Theme.colors.gris}
                                        style={[Theme.styles.mt10, themeCards, Theme.styles.ph20]}
                                        theme={{ colors: { text: themeCardsText.color } }}
                                    />
                                    <Text style={[Theme.styles.fs20, themeCardsText, Theme.styles.positionAbsolute, Theme.styles.zindex, { right: 20, top: 30, height: '50%' }]}>.00</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[Theme.styles.mt10, Theme.styles.fs17, Theme.styles.bold, themeCardsText]}>Descripción</Text>
                                <TextInput
                                    multiline={true}
                                    placeholder="Descripción"
                                    textAlign='center'
                                    mode="outlined"
                                    selectionColor={themeBorderSelectionInput}
                                    outlineColor={themeBorderOutlineInput}
                                    activeOutlineColor={themeBorderActiveInput}
                                    returnKeyType='next'
                                    underlineColor="transparent"
                                    placeholderTextColor={Theme.colors.gris}
                                    style={[Theme.styles.mt10, themeCards]}
                                    theme={{ colors: { text: themeCardsText.color } }}
                                />
                                <View style={[Theme.styles.alignCenter, Theme.styles.justifyCenter, Theme.styles.pv20]}>
                                    <TouchableOpacity style={[Theme.styles.bordeRedondo1, Theme.colors.backgroundGray3, Theme.styles.pv10, Theme.styles.ph10]}
                                        onPress={() => setShowImageProduct(true)}
                                    >
                                        {image ?
                                            (<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />) :
                                            (
                                                <Entypo name="camera" size={24} color="black" />
                                            )

                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[Theme.styles.alignCenter, Theme.styles.flexRow, Theme.styles.justifyCenter]}>
                            <Pressable style={[Theme.styles.mh30, Theme.colors.backgroundRed, Theme.styles.pv10, Theme.styles.ph30, Theme.styles.bordeRedondo1]}
                                onPress={() => { setShowModalProducto(!showModalProducto) }}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs16, Theme.styles.textCenter, Theme.styles.semiBold]}>Cerrar</Text>
                            </Pressable>
                            <Pressable style={[Theme.styles.mh30, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.ph30, Theme.styles.bordeRedondo1]}
                                onPress={() => { setShowModalProducto(!showModalProducto) }}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.fs16, Theme.styles.textCenter, Theme.styles.semiBold]}>Guardar</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <ImageProduct
                showImageProduct={showImageProduct}
                setShowImageProduct={setShowImageProduct}
                image={image}
                setImage={setImage}
            />

        </View>
    )
}

export default ModalProductos