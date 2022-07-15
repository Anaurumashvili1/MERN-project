import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = ({cookies,setLogedIn}) => {
    let navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [error, setError] = useState(false)

    const onLogin = () => {
        axios.post("/login", {username: usernameInput, password: passwordInput}).then(res => {
            if (res.data.status === "ok") {
                console.log(res.data.data)
                const token = res.data.data;
                setLogedIn(true)
                cookies.set("token", token);
                navigate(`/list`)

            } else {
                setError(true)
            }
        })
    }
    return <>
        <div className='login-wrapper'>
            <p>Username</p>
            <input onChange={(e) => {
                setUsernameInput(e.target.value);
                setError(false)

            }}/>
            <p>Password</p>
            <input onChange={(e) => {
                setPasswordInput(e.target.value);
                setError(false)
            }} type={"password"}/>
            {error && <p className={'error'}>Invalid username or password</p>
            } {<button onClick={onLogin}>Log in</button>}
        </div>
    </>
}

export default Login