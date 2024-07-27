
import ClassicButton from '../../components/Button/ClassicButton'
import '../../App.scss'
import '../../styles/constante.scss'
import { backEndUrl, color } from '../../Constante'
import { useState } from 'react'
import { UserRequest } from './friendsInterface'


interface Props{
    userToDisplay : UserRequest,
    sendFriendRequest : (userToUpdate:UserRequest)=>void
    selected : boolean
}

function FriendsUserComponent({userToDisplay,selected,sendFriendRequest}:Props) {

    const [isHovered,setIsHovered] = useState(false)


  return <div   onMouseEnter={()=>setIsHovered(true)} 
                onMouseLeave={()=>setIsHovered(false)}
                style={{display:"flex",
                        // width:"100%",
                        boxSizing:"border-box",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        placeItems:"center",
                        padding:'5px',
                        borderRadius:'5px',
                        backgroundColor: isHovered || selected ? color.primary_color_fade : undefined}}>
        <div style={{display:"flex",placeItems:"center",gap:"10px"}}>
            <div style={{"borderRadius":"50%","backgroundColor":color.primary_color,"width":"25px","height":"25px"}} />
            <div style={{color:color.primary_color,fontSize:"20px",fontWeight:800}}>
                {userToDisplay.pseudo} 
            </div>
        </div>
        <div style={{display:"flex",gap:"10px",padding:"5px"}}>
            {userToDisplay.statusFriend === "pending" && <ClassicButton clickAction={function (): void { throw new Error('Function not implemented.') } } text={"En attente"} disabledStyle={true}  />}
            {userToDisplay.statusFriend === "none" && <ClassicButton clickAction={()=>sendFriendRequest(userToDisplay)} text={"Ajouter"} />}
        </div>

    </div>
}


export default FriendsUserComponent
