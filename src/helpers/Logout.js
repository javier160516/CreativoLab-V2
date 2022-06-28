import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Logout = async () => {
    try {
        await axios.post('https://dev.creativolab.com.mx/api/v1/logout')
        AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
}