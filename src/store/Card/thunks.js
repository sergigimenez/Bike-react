import { clearCards, setCard, setProvincias, setTitleCard, setStatusSearch, setTotalResults } from "./cardSlice"
import { onFollowCards } from "../auth/authSlice"
import { bikeMernApi } from "../../api/index.js";
import { async } from "@firebase/util";

/*Cargar las rutas de la BD*/
export const handleSetRoutes = (numPage) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await bikeMernApi.get(`/cards/num/${(numPage-1)*25}`)

            dispatch(clearCards())

            dispatch(setCard(data.msg))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}
/*Cargar las rutas de la BD*/

/*Obetener todas las provincias*/

export const getProvinciasThunks = () => {
    return async (dispatch) => {
        try {
            console.log("entra prov")
            const { data } = await bikeMernApi.get('/cards/provincias')

            dispatch(setProvincias(data.resp))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}

/*Obetener todas las provincias*/

/*Obetener todos los titulos de las carreras*/

export const getTitleCardThunks = () => {
    return async (dispatch) => {
        try {
            console.log("entra carreras")
            const { data } = await bikeMernApi.get('/cards/titleCard')

            dispatch(setTitleCard(data.resp))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}

/*Obetener todos los titulos de las carreras*/

/*Añadir nueva ruta a la BD */
export const searchCard = (numPage, fieldProvincias, fieldTitleCarreras, fieldDistancia, fieldDesnivel) => {
    return async (dispatch) => {
        try {
            let query = {
                "params": {
                    "provincias": fieldProvincias.length != 0 ? fieldProvincias.map(prov => prov.sigla): [],
                    "poblacion": [],
                    "titleCard": fieldTitleCarreras != null ? fieldTitleCarreras.titleCard : null,
                    "distancia": {
                        "gte": fieldDistancia[0],
                        "lte": fieldDistancia[1]
                    },
                    "desnivel": {
                        "gte": fieldDesnivel[0],
                        "lte": fieldDesnivel[1]
                    },
                    "fecha": null
                }
            }

            const { data } = await bikeMernApi.post(`/cards/search/${(numPage-1)*25}`, query)

            dispatch(clearCards())
            dispatch(setStatusSearch())
            dispatch(setTotalResults(Math.ceil(data.totalResults/25)))

            dispatch(setCard(data.resp))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL AÑADIR CARDS
        }
    }
}
/*Añadir nueva ruta a la BD */

/*Añadir nueva ruta a la BD */
export const setCardAPI = (route) => {
    return async (dispatch) => {
        try {
            const { data } = await bikeMernApi.post('/cards', route)
            dispatch(setCard(data.payload))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL AÑADIR CARDS
        }
    }
}
/*Añadir nueva ruta a la BD */

/*Upload Image */
export const uploadImage = (file, titulo) => {
    return async (dispatch) => {
        if (!file) throw new Error('No tenemos ningun archivo que subir')
        const resp = fileUpload(file, titulo)
        return resp
    }
}

export const fileUpload = async (file, titulo) => {
    if (!file) throw new Error('No tenemos ningun archivo que subir')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dhvkbs4lv/upload'

    const fromData = new FormData();
    fromData.append('upload_preset', 'react-bike')
    fromData.append('file', file)
    fromData.append('public_id', titulo)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: fromData
        })

        if (!resp.ok) throw new Error('No se puede subir la imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url
    } catch (error) {
        throw new Error(error.message)
    }
}
/*Upload Image */

/*Follow & Unfollow Route */
export const getCardByUserId = () => {
    return async (dispatch) => {
        try {
            const { data } = await bikeMernApi.get('/cards/user')

            return data.usuarioCards
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL OBTENER CARTAS POR USUARIO CARDS
        }
    }
}

export const followCardByUser = (idCard) => {
    return async (dispatch, getState) => {
        try {
            await bikeMernApi.post('/cards/follow',
                {
                    "uid": getState().auth.uid,
                    "cards": [idCard]
                })

            const { data } = await bikeMernApi.get('/cards/user')

            dispatch(onFollowCards(data.usuarioCards))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL FOLLOW CARDS
        }
    }
}

export const unfollowCardByUser = (idCard) => {
    return async (dispatch, getState) => {
        try {
            await bikeMernApi.post('/cards/unfollow',
                {
                    "uid": getState().auth.uid,
                    "cards": [idCard]
                })

            const { data } = await bikeMernApi.get('/cards/user')

            dispatch(onFollowCards(data.usuarioCards))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
        }
    }
}

/*Follow & Unfollow Route */