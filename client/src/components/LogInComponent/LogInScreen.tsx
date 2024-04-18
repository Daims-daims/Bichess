import { useState } from 'react'
import FormTextInput from '../FormInput/FormTextInput'
import './logIn.scss'
import ClassicButton from '../Button/ClassicButton'
import { backBaseUrl } from '../../Constante'
import { useCookies } from 'react-cookie'

function LogInScreen(){

    const [pseudo,setPseudo] = useState<string>("")
    const [password,setPassword] = useState("")
    const [isLogIn,setLogIn] = useState(true)
    const [signUpState,setSignedUpState] = useState("")
    const [logInState,setlogInState] = useState("")
    const [_,setCookies] = useCookies(["access_token"])

    const onChangePseudo = (e: React.FormEvent<HTMLInputElement>)=>{
        setPseudo(e.currentTarget.value)
    }
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>)=>{
        setPassword(e.currentTarget.value)
    }

    const resetCredentials = ()=>{
        setPassword("")
    }

    const onSignUp= async ()=>{
        const body = {
            pseudo : pseudo,
            password : password
        }
        fetch(backBaseUrl+"/signup",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(body)
        }).then(l=>l.status===200 ? setSignedUpState("success") : setSignedUpState("error"))
        console.log()
    }

    const onLogin= async ()=>{
        const body = {
            pseudo : pseudo,
            password : password
        }
        fetch(backBaseUrl+"/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(body)
        }).then(l=>l.status===200 ? confirmLogin() : console.log(l))
    }

    const confirmLogin = async()=>{
        setCookies("access_token",pseudo)
    }

    console.log(signUpState)
    console.log(signUpState!=="")

    return (<div className="backgroundLogIn">
        <div className="logInWindow">

            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                <div className={isLogIn ? "btnLogIn active" : "btnLogIn"} onClick={()=>{resetCredentials();setLogIn(true)}}>Connexion</div>  
                <div className={isLogIn ? "btnLogIn" : "btnLogIn active"} onClick={()=>{resetCredentials();setLogIn(false)}}>Inscription</div>  
            </div>
            
            <FormTextInput typeField="text" label="Pseudo" name="psseudo" placeholder="Entrez votre pseudo" value={pseudo} handleChange={onChangePseudo}/>
            <FormTextInput typeField="password" label="Mot de Passe" name="password" placeholder="Entrez votre mot de passe" value={password} handleChange={onChangePassword}/>
            
            {!isLogIn && signUpState!=="" && ("success" === signUpState  ? 
                                                <p className='signUpSuccess'>Vous êtes désormais inscrit, <br></br>Veuillez vous connecter</p>:
                                                <p className='signUpError'>Cet utilisateur existe déjà</p>)}

            <div style={{display:"flex",flexDirection:"row-reverse"}}>{isLogIn ? 
                <ClassicButton clickAction={onLogin} text="Se connecter"/>
                : <ClassicButton clickAction={onSignUp} text="S'inscrire"/>
                }
            </div>

        </div>
    </div>)
}

export default LogInScreen