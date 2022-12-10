import axios from "axios";
import {getEnvVariables} from "../getEnvVairables.js";

const {VITE_API_URL} = getEnvVariables()

export const bikeMernApi = axios.create({
    baseURL: VITE_API_URL
})


