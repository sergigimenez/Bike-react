import { singInWithGoogle, signInWithFacebook } from "../../firebase/providers"
import { checkingCredentials, onLogin, onLogout, onFailLogout, clearErrorMessage, setAdmin } from "./authSlice"
import { clearCards } from "../Card/cardSlice.js"
import { bikeMernApi } from "../../api";

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await singInWithGoogle();

        if (!result.ok) return dispatch(startLogout(result.errorMessage))

        const { data } = await bikeMernApi.post('/auth/google', { "email": result.email, "uid": result.uid, "name": result.displayName })
        localStorage.setItem('token', data.token)
        localStorage.setItem('token-init-date', new Date().getTime())

        return dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email, cards: data.cards, cardsLiked: data.cardsLiked }))
    }
}

export const startFacebookSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await signInWithFacebook();

        if (result.status != "connected") return dispatch(startLogout("No estas logeado en facebook"))

        const { data } = await bikeMernApi.post('/auth/facebook', { "uid": result.authResponse.userID, "name": "usuario de test" })
        localStorage.setItem('token', data.token)
        localStorage.setItem('token-init-date', new Date().getTime())

        return dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email, cards: data.cards, cardsLiked: data.cardsLiked }))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        try {
            const { data } = await bikeMernApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email, cards: data.cards, cardsLiked: data.cardsLiked }))
        } catch (error) {

            dispatch(onFailLogout('Credenciales incorrectas'))
            setTimeout(function () {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }
}

export const createAccountWithEmailPassword = (email, password, repeatEmail, repeatPassword, name) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        try {
            const { data } = await bikeMernApi.post('/auth/new', { email, repeatEmail, password, repeatPassword, name })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email, cards: data.cards, cardsLiked: data.cardsLiked }))
        } catch (error) {
            dispatch(onFailLogout(error.response.data.msg))
            setTimeout(function () {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }
}

export const checkAuthToken = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        if (!token) {
            return dispatch(startLogout())
        }

        try {
            const { data } = await bikeMernApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email, cards: data.cards, cardsLiked: data.cardsLiked }))
        } catch (e) {
            localStorage.clear()
            dispatch(startLogout())
        }
    }
}

export const startLogout = (errorMessage) => {
    return async (dispatch) => {
        //await logoutFirebase()
        localStorage.clear()
        dispatch(clearCards())
        dispatch(onLogout(errorMessage))
    }
}

export const setAdminThunk = () => {
    return async (dispatch) => {
        await dispatch(setAdmin())
    }
}