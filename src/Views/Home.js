import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';



import { TouchableOpacity } from 'react-native';

//Screens
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Services from './Services';
import Testimonials from './Testimonials';
import Menucomponent from '../components/Menucomponent';



const Drawer = createDrawerNavigator();

function HomeScreen(){
    return(
            <Drawer.Navigator drawerContent={props => <Menucomponent {...props}/>}>
                <Drawer.Screen name="Educacion" component={Education}/>
                <Drawer.Screen name="Habilidades" component={Skills}/>
                <Drawer.Screen name="Experiencias" component={Experience}/>
                <Drawer.Screen name="Servicios" component={Services}/>
                <Drawer.Screen name="Testimonios" component={Testimonials}/>
            </Drawer.Navigator>
            
                
            
    
    );
}



export default HomeScreen;