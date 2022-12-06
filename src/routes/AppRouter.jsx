import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { BikeRoutes } from '../bikeMain/routes/BikeRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {


  const status = useCheckAuth()

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
        <Route path='/*' element={<Navigate to="/auth/login" />}></Route>
      }

      {
        (status === 'authenticated') &&
        <Route path='/*' element={<Navigate to="/bike/" />}></Route>
      }



    </Routes>
  )
}
