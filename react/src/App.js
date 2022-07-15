import {useState} from "react"
import Login from "./components/Login/Login"
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import List from "./components/Inner page/List"
import ProtectedRoutes from "./ProtectedRoutes"
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
    const [logedIn, setLogedIn] = useState(cookies.get("token") !== undefined)
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes logedIn={logedIn}/>}>
                    <Route path="/" element={<List cookies={cookies} setLogedIn={setLogedIn}/>}/>
                </Route>
                <Route path={"login"} element={logedIn ? <List cookies={cookies} setLogedIn={setLogedIn}/> :
                    <Login cookies={cookies} setLogedIn={setLogedIn}/>}/>

                <Route element={<ProtectedRoutes logedIn={logedIn}/>}>
                    <Route path={"list"} element={<List cookies={cookies} setLogedIn={setLogedIn}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
