import {useDispatch} from 'react-redux'
import {editPerson} from "../../features/directory.js";
import {useState} from "react"
import classes from "./modal.module.css"

const EditContact = ({id, setDirectory, directory}) => {
    const [showModal, setShowModal]=useState(false)
    const [name, setName]=useState(directory.find(contact=>contact.id===id).name)
    const [phone, setPhone]=useState(directory.find(contact=>contact.id===id).phone)

    const dispatch = useDispatch()
    const handleEdit = () => {
        dispatch(editPerson({name,phone, id}))
        setDirectory(directory.map(contact => contact.id !== id ? contact : {name,phone, id}))
        setShowModal(false)
    }

    return (<>
        <button onClick={() => setShowModal(true)}>Edit</button>
        {showModal && <div className={classes.modal}>
            <p>Name</p>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <p>Phone</p>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <button onClick={handleEdit}>Save</button>
        </div>}
    </>)
}
export default EditContact