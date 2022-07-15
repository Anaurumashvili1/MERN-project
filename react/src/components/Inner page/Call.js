import axios from "axios"

const Call = ({name, phone, cookies}) => {
    const token = cookies.get("token")
    const headers = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    const call = ()=>{
        axios.post("/call",{name, phone},headers).then(res=>console.log(res)).catch(error=>console.log(error))

    }
    return <>
        <button onClick={call}>Call</button>
    </>
}

export default Call