import { clearCards, setCard, setProvincias, setPoblaciones, setTitleCard, setStatusSearch, setTotalResults, updateLikesOneCard } from "./cardSlice"
import { onFollowCards, onLikeCards } from "../auth/authSlice"
import { bikeMernApi } from "../../api/index.js";
import { async } from "@firebase/util";

/*Cargar las rutas de la BD*/
export const handleSetRoutes = (numPage) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await bikeMernApi.get(`/cards/num/${(numPage - 1) * 25}`)

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
            const { data } = await bikeMernApi.get('/cards/provincias')

            dispatch(setProvincias(data.resp))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}

/*Obetener todas las poblaciones*/

export const getPoblacionesThunks = () => {
    return async (dispatch) => {
        try {
            const { data } = await bikeMernApi.get('/cards/poblaciones')

            dispatch(setPoblaciones(data.resp))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}

/*Obetener todas las poblaciones*/

/*Obetener todos los titulos de las carreras*/

export const getTitleCardThunks = () => {
    return async (dispatch) => {
        try {
            const { data } = await bikeMernApi.get('/cards/titleCard')

            dispatch(setTitleCard(data.resp))
        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}

/*Obetener todos los titulos de las carreras*/

/*Añadir nueva ruta a la BD */
export const searchCard = (numPage, fieldProvincias, fieldPoblaciones, fieldTitleCarreras, fieldDistancia, fieldDesnivel) => {
    return async (dispatch) => {
        try {
            let query = {
                "params": {
                    "provincias": fieldProvincias.length != 0 ? fieldProvincias.map(prov => prov.sigla) : [],
                    "poblacion": fieldPoblaciones.length != 0 ? fieldPoblaciones.map(pob => pob.poblacion) : [],
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

            const { data } = await bikeMernApi.post(`/cards/search/${(numPage - 1) * 25}`, query)

            dispatch(clearCards())
            dispatch(setStatusSearch())
            dispatch(setTotalResults(Math.ceil(data.totalResults / 25)))

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

/*Like Route */

export const likeRouteByUser = (idCard) => {
    return async (dispatch, getState) => {
        try {
            const resp = await bikeMernApi.post('/cards/like',
                {
                    "uid": getState().auth.uid,
                    "cardId": idCard
                })
            //dispatch(updateLikesOneCard({idCard, totalLikes: resp.data.totalLikes}))

            const { data } = await bikeMernApi.get('/cards/user')
            dispatch(onLikeCards(data.cardsLiked))

        } catch (e) {
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
        }
    }
}

/*Like Route */