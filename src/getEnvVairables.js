

export const getEnvVariables = () => {
    //import.meta.env

    return {
        //...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_API_URL_PROD: import.meta.env.VITE_API_URL_PROD
    }
}