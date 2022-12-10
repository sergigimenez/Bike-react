import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, onLogin, onLogout, onFailLogout, clearErrorMessage } from "./authSlice"
import {bikeMernApi} from "../../api";

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await singInWithGoogle();

        if (!result.ok) return dispatch(onLogout(result.errorMessage))

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

            dispatch(onLogin({name: data.name, uid: data.uid, cards: data.cards}))
        }catch (error){
            dispatch(onFailLogout('Credenciales incorrectas'))
            setTimeout(function (){
                dispatch(clearErrorMessage())
            }, 10)
        }
    }
}

/*export const startCreateUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if (!ok) return dispatch(onLogout({ errorMessage }))

        return dispatch(onLogin({ uid, displayName, email, photoURL }))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, errorMessage, uid, photoURL, displayName } = await loginWithEmailPassword({ email, password })

        if (!ok) return dispatch(onLogout({ errorMessage }))

        return dispatch(onLogin({ uid, displayName, email, photoURL }))
    }
}*/

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()
        dispatch(onLogout({}))
    }
}