const Submit = ({ handleSubmit,formIsValid})=>{

    return <button onClick={(e)=>handleSubmit(e)} style={{cursor: formIsValid? "pointer":"not-allowed"}} disabled={!formIsValid}>SUBMIT</button>
}

export default Submit