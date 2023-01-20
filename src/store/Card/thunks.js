import { setCard } from "./cardSlice"
import { onFollowCards } from "../auth/authSlice"
import {bikeMernApi} from "../../api/index.js";

/*Cargar las rutas de la BD*/
export const handleSetRoutes = () => {
    return async (dispatch, getState) => {
        try {
            const {data} = await bikeMernApi.get('/cards')

            data.msg.forEach(route => {
                dispatch(setCard(route))
            })
        }catch (e){
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL LEER CARDS
        }
    }
}
/*Cargar las rutas de la BD*/

/*Añadir nueva ruta a la BD */
export const setCardAPI = (route) => {
    return async (dispatch) => {
        try {
            const {data} = await bikeMernApi.post('/cards',route)
            dispatch(setCard(data.payload))
        }catch (e){
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
    return async(dispatch) => {
        try{
            const {data} = await bikeMernApi.get('/cards/user')

            return data.usuarioCards
        }catch(e){
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL OBTENER CARTAS POR USUARIO CARDS
        }
    }
}

export const followCardByUser = (idCard) => {
    return async (dispatch, getState) => {
        try{
            await bikeMernApi.post('/cards/follow',
            {
                "uid": getState().auth.uid,
                "cards": [idCard]
            })

            const {data} = await bikeMernApi.get('/cards/user')

            dispatch(onFollowCards(data.usuarioCards))
        }catch(e){
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL FOLLOW CARDS
        }
    }
}

export const unfollowCardByUser = (idCard) => {
    return async (dispatch, getState) => {
        try{
            await bikeMernApi.post('/cards/unfollow',
            {
                "uid": getState().auth.uid,
                "cards": [idCard]
            })

            const {data} = await bikeMernApi.get('/cards/user')

            dispatch(onFollowCards(data.usuarioCards))
        }catch(e){
            console.log(e.response.data.error) //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
        }
    }
}

/*Follow & Unfollow Route */