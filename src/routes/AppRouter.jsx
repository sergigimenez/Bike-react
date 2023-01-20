import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { BikeRoutes } from '../bikeMain/routes/BikeRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import {checkAuthToken} from '../store/auth/thunks.js'
import {Loader} from "./Loader";

export const AppRouter = () => {

  const dispatch = useDispatch()
  const {status} = useSelector(state => state.auth)

  window.onload  = () => {
    dispatch(checkAuthToken())
  }

  useEffect(() => {

  }, [status])
  
  return (
    <Routes>

      {
        (status === 'authenticated')
          ? <Route path="/bike/*" element={<BikeRoutes />}></Route>
          : <Route path="/auth/*" element={<AuthRoutes />}></Route>
      }

      {
        (status !== 'authenticated') &&
        <Route path='/*' element={<Navigate to="/auth/" />}></Route>
      }

      {
        (status === 'authenticated') &&
        <Route path='/*' element={<Navigate to="/bike/" />}></Route>
      }



    </Routes>
  )
}
