import React from 'react'
import { Text, Button, TouchableOpacity, View} from 'react-native'

const viewscreen = () => {
  <View>
    <Text>
      Hola desde screen
    </Text>
  </View> 
}

const Education = () => {
  return (
    <TouchableOpacity
    >
      <Text 
      style={{
        justifyContent: 'center',
        alignItems: 'center'
        
      }}
      >
        Mis Estudios
      </Text>
      <TouchableOpacity
      style={{padding: 40}}
      >
      <Button onPress={() => View.viewscreen()}
      title='Hola' 
      ></Button>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Education;
