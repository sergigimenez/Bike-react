export const getEnvVariables = () => {
  //import.meta.env

  return {
    //...import.meta.env
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_URL_PROD: process.env.NEXT_PUBLIC_API_URL_PROD,
  };
};
