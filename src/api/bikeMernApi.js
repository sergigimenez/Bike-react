import axios from "axios";
import {getEnvVariables} from "../getEnvVairables.js";

const {VITE_API_URL} = getEnvVariables()

const bikeMernApi = axios.create({
    baseURL: VITE_API_URL
})

bikeMernApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token'),
        'x-debug': 1 //TODO QUITAR
    }

    return config
})

export default bikeMernApi;
