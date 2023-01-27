import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, onLogin, onLogout, onFailLogout, clearErrorMessage } from "./authSlice"
import {clearCards} from "../Card/cardSlice.js"
import {bikeMernApi} from "../../api";

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await singInWithGoogle();

        if (!result.ok) return dispatch(startLogout(result.errorMessage))

        return dispatch(onLogin(result))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        try {
            const {data} = await bikeMernApi.post('/auth',{email,password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(onLogin({name: data.name, uid: data.uid, email: data.email, cards: data.cards}))
        }catch (error){
            dispatch(onFailLogout('Credenciales incorrectas'))
            setTimeout(function (){
                dispatch(clearErrorMessage())
            }, 10)
        }
    }
}

export const checkAuthToken = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        if(!token){
            return dispatch(startLogout())
        }

        try {
            const {data} = await bikeMernApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid, email: data.email, cards: data.cards}))
        }catch (e){
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