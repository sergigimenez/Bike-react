import { Navigate, Route, Routes } from "react-router-dom"
import { AddRoutePages, RoutePages, BikeMainPages, ProfilePages } from "../pages"

export const BikeRoutes = () => {
  return (
    <Routes>
      <Route path="main" element={<BikeMainPages/>}></Route>
      <Route path="profile" element={<ProfilePages/>}></Route>
      <Route path="route" element={<RoutePages/>}></Route>
      <Route path="addRoute" element={<AddRoutePages/>}></Route>

      <Route path="/" element={<Navigate to="/bike/route"/>}></Route>
    </Routes>
  )
}
