import {Navigate, Route, Routes} from "react-router-dom"
import {LoginPages, RegisterPages} from '../pages'
import {useSelector} from "react-redux";
import {Loader} from "../../routes/Loader";

export const AuthRoutes = () => {

    const {status} = useSelector(state => state.auth)

    return (
        <Routes>
            <Route path="login" element={<LoginPages/>}></Route>
            <Route path="register" element={<RegisterPages/>}></Route>
            {/**<Route path="loader" element={<Loader/>}></Route>*/}

            {
                /*
                (status == "checking") &&
                <Route path="/" element={<Navigate to="/auth/loader"/>}></Route>
                */ 
            }

            {
                /*
                (status != "checking") &&
                <Route path="/*" element={<Navigate to="/auth/login"/>}></Route>
                */
            }
            <Route path="/*" element={<Navigate to="/auth/login"/>}></Route>
        </Routes>
    )
}
