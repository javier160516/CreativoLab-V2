import React, { useState } from 'react'
import { Text, View, Modal, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native'
import Theme from '../Theme/Theme'
import DetectarTema from '../helpers/DetectarTema'
import TextInput from './TextInput';
import ComponentImage from './ComponentImage';




const ModalTestimonials = ({ showModalTestimonials, setShowModalTestimonials }) => {
    const [showComponentImage, setShowComponentImage] = useState(false);
    const [image, setImage] = useState(null);
    // const [imageCamera, setImageCamera] = useState(null);
    const { themeCards, themeCardsText, themeBorderActiveInput, themeBorderSelectionInput, themeBorderOutlineInput } = DetectarTema();
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalTestimonials}
                onRequestClose={() => {
                    setShowModalTestimonials(false);
                }}

            >
                <View style={[themeCards, Theme.styles.flex1]}>
                    <ScrollView >

                        <Text style={[Theme.styles.fs22, Theme.styles.textCenter, Theme.styles.mt40, Theme.styles.mb20, Theme.styles.semiBold, themeCardsText]}>Añadir Testimonio</Text>
                        <View style={[Theme.styles.mh20]}>
                            <View style={[Theme.styles.alignCenter]}>
                                <TouchableOpacity style={[Theme.colors.backgroundGray3, Theme.styles.pv30, Theme.styles.ph30, Theme.styles.mv20, Theme.styles.bordeRedondo1]}
                                    onPress={() => setShowComponentImage(true)}>
                                </TouchableOpacity>
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            </View>
                            <View>
                                <Text style={[themeCardsText, Theme.styles.fs17]}>
                                    Nombre
                                </Text>
                                <TextInput
                                    placeholder="Empresa"
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
                            <View style={[Theme.styles.mv10]}>
                                <Text style={[themeCardsText, Theme.styles.fs17]}>Puesto</Text>
                                <TextInput
                                    placeholder="Puesto"
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
                                <Text style={[themeCardsText, Theme.styles.fs17]}>
                                    Empresa
                                </Text>
                                <TextInput
                                    placeholder="Empresa"
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
                            <View style={[Theme.styles.mv10]}>
                                <Text style={[themeCardsText, Theme.styles.fs17]}>Detalles</Text>
                                <TextInput
                                    placeholder="Detalles"
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
                        </View>
                        <View style={[Theme.styles.flexRow, Theme.styles.mv20, Theme.styles.mh30]}>
                            <Pressable style={[Theme.colors.backgroundRed, Theme.styles.flex1, Theme.styles.pv10, Theme.styles.bordeRedondo1, Theme.styles.mh10]}
                                onPress={() => setShowModalTestimonials(!showModalTestimonials)}
                            >
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter]}>Cancelar</Text>
                            </Pressable>


                            <Pressable style={[Theme.styles.flex1, Theme.colors.backgroundBlue, Theme.styles.pv10, Theme.styles.bordeRedondo1, Theme.styles.mh10]}>
                                <Text style={[Theme.colors.WhiteColor, Theme.styles.bold, Theme.styles.fs17, Theme.styles.textCenter]}>Guardar</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <ComponentImage
                showComponentImage={showComponentImage}
                setShowComponentImage={setShowComponentImage}
                image={image}
                setImage={setImage}
                // imageCamera={imageCamera}
                // setImageCamera={setImageCamera}
            />

        </View>

    )
}

export default ModalTestimonials