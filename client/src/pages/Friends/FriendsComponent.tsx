
import ClassicButton from '../../components/Button/ClassicButton'
import '../../App.scss'
import '../../styles/constante.scss'
import {Friend} from './friendsInterface'
import { color } from '../../Constante'
import { useState } from 'react'


interface Props{
    friendToDisplay : Friend,
    onClickGeneral : (friend:Friend)=>void,
    selected : boolean
}

function FriendsComponent({friendToDisplay,onClickGeneral,selected}:Props) {

    const [isHovered,setIsHovered] = useState(false)

  return <div   onMouseEnter={()=>setIsHovered(true)} 
                onMouseLeave={()=>setIsHovered(false)}
                onClick={()=>onClickGeneral(friendToDisplay)}
                style={{display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        placeItems:"center",
                        padding:'5px',
                        borderRadius:'5px',
                        backgroundColor: isHovered || selected ? color.primary_color_fade : undefined}}>
        <div style={{display:"flex",placeItems:"center",gap:"10px"}}>
            <div style={{"borderRadius":"50%","backgroundColor":color.primary_color,"width":"25px","height":"25px"}} />
            <div style={{color:color.primary_color,fontSize:"20px",fontWeight:800}}>
                {friendToDisplay.pseudo} ({friendToDisplay.score}/{friendToDisplay.numberGame})
            </div>
        </div>
        <div style={{display:"flex",gap:"10px",padding:"5px"}}>
            <ClassicButton clickAction={function (): void {throw new Error('Function not implemented.')} } text={"Inviter"} />
            <ClassicButton clickAction={function (): void {throw new Error('Function not implemented.')} } text={"Voir historique"} />
        </div>

    </div>
}


export default FriendsComponent
