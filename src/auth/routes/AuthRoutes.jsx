import { Navigate, Route, Routes } from "react-router-dom"
import {LoginPages, RegisterPages} from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPages/>}></Route>
        <Route path="register" element={<RegisterPages/>}></Route>

        <Route path="/*" element={<Navigate to="/auth/login"/>}></Route>
    </Routes>
  )
}
