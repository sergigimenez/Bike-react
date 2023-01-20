import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { onLogin } from "../store/auth/authSlice"
import { startLogout } from "../store/auth/thunks.js"

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch()
  
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async(user) => {
        if(!user){
            return dispatch (startLogout())
        }
        const {uid, email, displayName, photoURL} = user
        dispatch(onLogin({uid, email, displayName, photoURL}))
      })
    }, [])

    return status
}
