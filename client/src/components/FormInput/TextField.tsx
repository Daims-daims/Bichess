import { useState } from "react"
import { color } from "../../Constante"

interface Props{
    name:string,
    value : string,
    typeField:string,
    placeholder:string,
    handleChange : (arg:React.FormEvent<HTMLInputElement>)=>void,
    darkerBackground? : boolean 
}

function TextField({name,value,typeField,placeholder,handleChange,darkerBackground}:Props){

    const [showField,setShowField] = useState(typeField==="text")
    

    return <div className="textInputFieldContainer" style={darkerBackground ? {backgroundColor :color.primary_color+"30",color:color.primary_bold}
                                                                            : {backgroundColor : color.primary_background }}>
            <input type={showField ? "text" : "password"} placeholder={placeholder} className="textInputField" name={name} value={value} onChange={handleChange}></input>
            {typeField=="password" && <div className="showPasswordBtn " onClick={()=>setShowField(!showField)}>X</div>}
        </div>
}

export default TextField