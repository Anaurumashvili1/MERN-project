
import {useDispatch} from 'react-redux'
import {removePerson} from "../../features/directory.js";
const RemoveContact=({id,setDirectory,directory})=>{
    const dispatch = useDispatch()

    const remove=()=>{
        dispatch(removePerson(id))
        setDirectory(directory.filter(contact=>contact.id!==id))
    }
    return <button onClick={remove}>Remove</button>
}
export default RemoveContact