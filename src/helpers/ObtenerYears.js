import React from 'react'
import { View, Text } from 'react-native'

const ObtenerYears = () => {
    const max = new Date().getFullYear();
    const min = max - 60;
    const years = [];

    for(let i = max; i >= min; i--){
        const yearObject = { id: i, year: i };
        years.push(yearObject);
    }
    return years;
}

export default ObtenerYears