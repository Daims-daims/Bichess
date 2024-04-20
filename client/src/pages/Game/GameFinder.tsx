
import { FormEvent, useState } from 'react'
import '../../App.scss'
import ClassicButton from '../../components/Button/ClassicButton'
import '../../styles/constante.scss'
import './Game.scss'
import FormTextInput from '../../components/FormInput/FormTextInput'
import TextField from '../../components/FormInput/TextField'
import LoadingScreenGame from './LoadingScreenGame'

interface Props{
  pseudo:string
}

interface Player{
  color:"w" | "b",
  idGames : string    
}

function GameFinder({pseudo}:Props) {

  const [roomIdJoin,setRoomIdJoin] = useState("")
  const [isLoading,setIsLoading] = useState(false)
console.log(isLoading)

  const resetLoading= () => {
    setIsLoading(false)
  }

  const joinNewGame = async () => {
    setIsLoading(true)
    const cred =  await fetch("http://localhost:3030/room/"+pseudo,{
      method:"GET"
  })
  const res:Player = await cred.json()
  console.log(res)
  }


  return <div style={{width:"100%",display:"flex",flexDirection:"row",padding:"100px 200px",alignItems:'start', gap:"50px",justifyContent:"space-around"}}>
           <div className='menuBox'>
            <p className='menuBoxHeader'>Rejoindre une partie</p>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Démarrer une partie en ligne</p>
              <ClassicButton text='Lancer une partie' clickAction={joinNewGame}></ClassicButton>
            </div>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Rejoindre une partie avec un code</p>
              <div style={{display:"flex"}}>
                {// placer TextArea}\}
                  }
                <ClassicButton text='Rejoindre' clickAction={()=>setIsLoading(true)}></ClassicButton>
              </div>
            </div>
           </div>
           <div className='menuBox'>
            <p className='menuBoxHeader'>Créer une partie</p>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Créer un salon joignable par tous</p>
              <ClassicButton text='Créer un salon' clickAction={()=>console.log("Créer une partie")}></ClassicButton>
            </div>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Inviter un ami à une partie</p>
            </div>
           </div>
           {isLoading && <LoadingScreenGame resetLoading={resetLoading}/>}
        </div>
}


export default GameFinder
