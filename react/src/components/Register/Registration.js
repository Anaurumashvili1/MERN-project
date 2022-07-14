import {useState} from "react";
import Input from "./Input";
import Submit from "./Submit";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [valid, setValid] = useState({username: null, password: null, confirmPassword: null})
    const [value, setValue] = useState({username: "", password: "", confirmPassword: ""})
    const [error, setError] = useState(false)
    let navigate = useNavigate();

    const handleUsername = (e) => {
        setError(false)
        setValue(prevState => ({...prevState, username: e.target.value}))
        setValid(prevState => ({...prevState, username: e.target.value.length > 3 && e.target.value.length < 30}))
    }
    const handlePassword = (e) => {
        setValue(prevState => ({...prevState, password: e.target.value}))
        setValid(prevState => ({
            ...prevState,
            password: e.target.value.length > 6 && !!e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
            confirmPassword: value.confirmPassword === e.target.value && value.confirmPassword !== ""
        }))
    }
    const handleConfirmPassword = (e) => {
        setValue(prevState => ({...prevState, confirmPassword: e.target.value}))
        setValid(prevState => ({...prevState, confirmPassword: e.target.value == value.password}))

    }
    const formIsValid = valid.username && valid.password && valid.confirmPassword

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formIsValid) {
            const data = {username: value.username, password: value.password}
            axios.post('/users', {...data}).then(res => {
                console.log(res.data);
                if (res.data.error && res.data.error === "Username already exists") {
                    setError(true)
                }
                else if(res.data.status==="success"){
                    navigate("login")
                }

            }).catch(err => console.log(err))
        }
    }

    return (
        <form className="registration">
            <Input title={'Username:'} handleChange={handleUsername} type={'text'} value={value.username}
                   valid={valid.username}/>
            {error && <span className={'error'}>Username already exists</span>
            } <Input title={'Password:'} handleChange={handlePassword} type={'password'} value={value.password}
                     valid={valid.password}/>
            <Input title={'Confirm Password:'} handleChange={handleConfirmPassword} type={'password'}
                   value={value.confirmPassword} valid={valid.confirmPassword}/>
            <Submit handleSubmit={handleSubmit} formIsValid={formIsValid}/>
            <a href={"login"}>Log in if you already have an account</a>
        </form>
    );
}

export default Registration
