import TextField from "./TextField"
import "./formComponent.scss"

interface Props{
    label? : string,
    name:string,
    value : string,
    typeField:string,
    placeholder:string,
    handleChange : (arg:React.FormEvent<HTMLInputElement>)=>void
}

function FormTextInput({label,name,value,typeField,placeholder,handleChange}:Props){
    return <div className="textInputDiv">
        {label && <label className="textInputLabel">{label}</label>}
        <TextField typeField={typeField} placeholder={placeholder} name={name} value={value} handleChange={handleChange}/>
    </div>
}

export default FormTextInput