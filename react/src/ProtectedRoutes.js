import {Outlet} from "react-router"
import Registration from "./components/Register/Registration";


const ProtectedRoutes = ({logedIn})=>{
    return <>
        {logedIn? <Outlet/> : <Registration/>}
    </>
}
export default ProtectedRoutes