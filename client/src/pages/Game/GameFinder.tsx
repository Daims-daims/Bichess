
import { FormEvent, useState } from 'react'
import '../../App.scss'
import ClassicButton from '../../components/Button/ClassicButton'
import '../../styles/constante.scss'
import './Game.scss'
import FormTextInput from '../../components/FormInput/FormTextInput'
import TextField from '../../components/FormInput/TextField'

function GameFinder() {

  const [roomIdJoin,setRoomIdJoin] = useState("")



  return <div style={{width:"100%",display:"flex",flexDirection:"row",padding:"100px 200px",alignItems:'start', gap:"50px",justifyContent:"space-around"}}>
           <div className='menuBox'>
            <p className='menuBoxHeader'>Rejoindre une partie</p>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Démarrer une partie en ligne</p>
              <ClassicButton text='Lancer une partie' clickAction={()=>console.log("Lancer une partie")}></ClassicButton>
            </div>
            <div className='menuBoxButtonSection'>
              <p className='menuBoxSectionTitle'>Rejoindre une partie avec un code</p>
              <div style={{display:"flex"}}>
                {// placer TextArea}\}
                  }
                <ClassicButton text='Rejoindre' clickAction={()=>console.log("Rejoindre")}></ClassicButton>
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
        </div>
}


export default GameFinder
