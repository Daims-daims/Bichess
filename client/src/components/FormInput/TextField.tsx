import { useState } from "react"

interface Props{
    name:string,
    value : string,
    typeField:string,
    placeholder:string,
    handleChange : (arg:React.FormEvent<HTMLInputElement>)=>void
}

function TextField({name,value,typeField,placeholder,handleChange}:Props){

    const [showField,setShowField] = useState(typeField=="text")

    return <div className="textInputFieldContainer" >
            <input type={showField ? "text" : "password"} placeholder={placeholder} className="textInputField" name={name} value={value} onChange={handleChange}></input>
            {typeField=="password" && <div className="showPasswordBtn " onClick={()=>setShowField(!showField)}>X</div>}
        </div>
}

export default TextField