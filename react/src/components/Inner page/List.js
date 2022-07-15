import {useSelector} from "react-redux";
import {useState} from "react";
import EditContact from "./EditContact";
import RemoveContact from "./RemoveContact";
import AddContact from "./AddContact";
import Call from "./Call"
const List = ({cookies, setLogedIn}) => {
    const contactList = useSelector((state)=>state.directory.value)
    const [directory, setDirectory] =useState(contactList)

    const logOut = () => {
        cookies.remove("token")
        setLogedIn(false)
    }
    const handleSearch=(e)=>{
        setDirectory(contactList.filter(contact=>contact.name?.toLowerCase().includes(e.target.value.toLowerCase()) || contact.phone?.includes(e.target.value)))

        if (e.target.value===""){
            setDirectory(contactList)
        }
    }
    return <>
        <button onClick={logOut} className='logout'>Log out</button>
        <div className={'list-wrapper'}>
            <div className={"search"}>
                <p>Search contact</p>
                <input onChange={(e)=>handleSearch(e)}/>
            </div>
            <div className={"list-header"}>
                <p>Name</p>
                <p>Phone</p>
                <AddContact contactList={contactList} setDirectory={setDirectory}/>
            </div>

            {directory.length>0  ? directory.map(person=>(
                <div className={"person"} key={person.id}>
                    <p>{person.name}</p>
                    <p>{person.phone}</p>
                    <EditContact setDirectory={setDirectory} directory={directory} id={person.id}>Edit</EditContact>
                    <RemoveContact setDirectory={setDirectory} directory={directory} id={person.id}>Remove</RemoveContact>
                    <Call name={person.name} phone={person.phone} cookies={cookies}/>
                </div>
            )) : <p style={{textAlign:"center"}}>Contact not found</p>}
        </div>
    </>
}

export default List