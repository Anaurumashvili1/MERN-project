import {useDispatch} from 'react-redux'
import { addPerson} from "../../features/directory.js";
import {useState} from "react"
import classes from "./modal.module.css"

const AddContact = ({ setDirectory, contactList}) => {
    const [showModal, setShowModal]=useState(false)
    const [name, setName]=useState("")
    const [phone, setPhone]=useState("")
    const dispatch = useDispatch();

    const addContact = () => {
        dispatch(addPerson({name,phone, id:contactList.length+1}))
        setDirectory([...contactList, {name, phone,id:contactList.length+1}])
        setShowModal(false)
    }

    return (<>
        <button onClick={() => setShowModal(true)} className={classes.add}>Add new contact</button>
        {showModal && <div className={classes.modal}>
            <p>Name</p>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <p>Phone</p>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <button onClick={addContact}>Add</button>
        </div>}
    </>)
}
export default AddContact