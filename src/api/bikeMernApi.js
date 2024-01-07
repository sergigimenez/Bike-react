import axios from "axios";
import { useSelector } from "react-redux";
import { getEnvVariables } from "../getEnvVairables.js";

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_URL_PROD } = getEnvVariables();

let baseUrlConnection = "https://bike-mern.herokuapp.com/api"; //localStorage.getItem('admin') ? NEXT_PUBLIC_API_URL : NEXT_PUBLIC_API_URL_PROD

const bikeMernApi = axios.create({
  //baseURL: NEXT_PUBLIC_API_URL,
  //baseURL: NEXT_PUBLIC_API_URL_PROD
  baseURL: baseUrlConnection,
});

bikeMernApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
    "x-debug": 1, //TODO QUITAR
  };

  return config;
});

export default bikeMernApi;
