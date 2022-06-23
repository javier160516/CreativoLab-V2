import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api/v1`
})

export default clienteAxios;