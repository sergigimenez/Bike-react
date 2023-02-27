import { async } from '@firebase/util'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth, initConfigFacebook } from './config'

const googleProvider = new GoogleAuthProvider()

initConfigFacebook();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)

        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const signInWithFacebook = async () => {
    try {
        var resp = null

        FB.getLoginStatus(function (response) {
            if (response.status == "unknown") {
                FB.login()
            }
            resp = response
        });
        
        return resp
    } catch (e) {
        return e
    }
}