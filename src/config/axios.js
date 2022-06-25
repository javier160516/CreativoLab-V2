import axios from "axios";
import {BACKEND_URL} from '@env';

const clienteAxios = axios.create({
    baseURL: `${BACKEND_URL}/api/v1`
})

export default clienteAxios;