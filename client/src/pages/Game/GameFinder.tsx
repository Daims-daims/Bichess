
import {useState } from 'react'
import '../../App.scss'
import ClassicButton from '../../components/Button/ClassicButton'
import '../../styles/constante.scss'
import './Game.scss'
import QueuingScreenGame from './QueuingScreenGame'
import { useNavigate } from 'react-router-dom'
import FormTextInput from '../../components/FormInput/FormTextInput'
import TextField from '../../components/FormInput/TextField'
import InvitingScreenGame from './InvitingScreenGame'

interface Props{
  pseudo:string
}

interface Player{
  color:"w" | "b",
  idGames : string    
}

function GameFinder({pseudo}:Props) {

  const [isQueuing,setIsQueuing] = useState(false)
  const [isInviting,setIsInviting] = useState(false)
  const [roomIdInvitation,setRoomIdInvitation] = useState("")
  const navigate = useNavigate()
  const [accessCode,setAccessCode] = useState("")

  const resetLoading= () => {
    setIsQueuing(false)
  }

  const joinNewGame = async () => {
    setIsQueuing(true)
    const cred =  await fetch("http://localhost:3030/room/"+pseudo,{
      method:"GET"
  })
  const res:Player = await cred.json()
  console.log(res)
  navigate("/game/"+res.idGames.replace("room",""))
  }

  const createNewRoom = async () => {
    const cred =  await fetch("http://localhost:3030/room/"+pseudo,{
      method:"POST"
  })
  const res:Player = await cred.json()
  console.log(res)
  setIsInviting(true)
  setRoomIdInvitation(res.idGames.replace("room",""))
  navigate("/game/"+res.idGames.replace("room",""))
  }

  const handleChange = (e : React.FormEvent<HTMLInputElement>)=>{
    setAccessCode(e.currentTarget.value)
  }
  console.log(isInviting,isQueuing);
  
  return <div style={{width:"100%",display:"flex",flexDirection:"row",padding:"100px 200px",alignItems:'start', gap:"50px",justifyContent:"space-around"}}>
           <div className='menuBox'>
            <p className='menuBoxHeader'>Rejoindre une partie</p>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Démarrer une partie en ligne</p>
              <ClassicButton text='Lancer une partie' clickAction={joinNewGame}></ClassicButton>
            </div>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Rejoindre une partie avec un code</p>
              <div style={{display:"flex",gap:"10px",maxWidth:"250px"}}>
                <TextField placeholder="Code d'accés" name='accessCode' typeField='text' value={accessCode} handleChange={handleChange} darkerBackground={true} />
                <ClassicButton text='Rejoindre' clickAction={()=>navigate("/game/"+accessCode.toUpperCase())}></ClassicButton>
              </div>
            </div>
           </div>
           <div className='menuBox'>
            <p className='menuBoxHeader'>Créer une partie</p>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Créer un salon joignable par code</p>
              <ClassicButton text='Créer un salon' clickAction={createNewRoom}></ClassicButton>
            </div>
            {/* <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Inviter un ami à une partie</p> To be done later when socket connexion is made with whole client
            </div> */}
           </div>
           {isQueuing && <QueuingScreenGame resetLoading={resetLoading}/>}
           {isInviting && <InvitingScreenGame resetLoading={resetLoading} roomId={roomIdInvitation} />}
        </div>
}


export default GameFinder
