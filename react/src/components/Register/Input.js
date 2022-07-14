
const Input = ({title,type,valid,value,handleChange})=>{
const borderColor = valid? 'green' : "red"
    return (<>

        <div>
            <p>{title}</p>
            <input style={{borderColor}} type={type} onChange={(e)=>handleChange(e)} value={value}/>
        </div>
    </>)
}

export default Input