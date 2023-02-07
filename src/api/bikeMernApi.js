import axios from "axios";
import {getEnvVariables} from "../getEnvVairables.js";

const {VITE_API_URL, VITE_API_URL_PROD} = getEnvVariables()

const bikeMernApi = axios.create({
    //baseURL: VITE_API_URL
    baseURL: VITE_API_URL_PROD
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
