import { useState } from 'react'
import FormTextInput from '../FormInput/FormTextInput'
import './logIn.scss'
import ClassicButton from '../Button/ClassicButton'

function LogInScreen(){

    const [pseudo,setPseudo] = useState<string>("")
    const [password,setPassword] = useState("")
    const [isLogIn,setLogIn] = useState(true)

    const onChangePseudo = (e: React.FormEvent<HTMLInputElement>)=>{
        setPseudo(e.currentTarget.value)
    }
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>)=>{
        setPassword(e.currentTarget.value)
    }

    return (<div className="backgroundLogIn">
        <div className="logInWindow">
            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                <div className={isLogIn ? "btnLogIn active" : "btnLogIn"} onClick={()=>setLogIn(true)}>Connexion</div>  
                <div className={isLogIn ? "btnLogIn" : "btnLogIn active"} onClick={()=>setLogIn(false)}>Inscription</div>  
            </div>
            
            <FormTextInput typeField="text" label="Pseudo" name="psseudo" placeholder="Entrez votre pseudo" value={pseudo} handleChange={onChangePseudo}/>
            <FormTextInput typeField="password" label="Mot de Passe" name="password" placeholder="Entrez votre mot de passe" value={password} handleChange={onChangePassword}/>
            <div style={{display:"flex",flexDirection:"row-reverse"}}>{isLogIn ? 
                <ClassicButton text="Se connecter"/>
                : <ClassicButton text="S'inscrire"/>
                }
            </div>
        </div>
    </div>)
}

export default LogInScreen