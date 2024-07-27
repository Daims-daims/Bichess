
import ClassicButton from '../../components/Button/ClassicButton'
import '../../App.scss'
import '../../styles/constante.scss'
import { backEndUrl, color } from '../../Constante'
import { useState } from 'react'
import { Friend, UserRequest } from './friendsInterface'
import ErrorButton from '../../components/Button/ErrorButton'
import SuccessButton from '../../components/Button/SuccessButton'
import apiCall from '../../lib/api'


interface Props{
    friendToDisplay : Friend,
    selected : boolean,
    addFriendToList:(friendToAdd: Friend) => void,
    deleteFriendFromList:(friendToAdd: Friend) => void
}

interface ResultResponseRequest{
    status : 'ok' | 'error'
}

function FriendsRequestComponent({friendToDisplay,selected,addFriendToList,deleteFriendFromList}:Props) {

    const [isHovered,setIsHovered] = useState(false)

    const acceptFriendRequest = ()=>{
        apiCall<ResultResponseRequest>("/friendsRequest","POST",{
            "idFriendRequest":friendToDisplay.id,
            "isRequestAccepted":true
        }).then(r=>{
            console.log(r)
            if(r.status==='ok')
                addFriendToList({...friendToDisplay,pending:false,accepted:true})
        })
        console.log("accept");
    }

    const denyFriendRequest = ()=>{
        apiCall<ResultResponseRequest>("/friendsRequest","POST",{
            "idFriendRequest":friendToDisplay.id,
            "isRequestAccepted":false
        }).then(r=>{
            console.log(r)
            if(r.status==='ok')
                deleteFriendFromList(friendToDisplay)
        })
        console.log("deny");
    }

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
                {friendToDisplay.pseudo} 
            </div>
        </div>
        <div style={{display:"flex",gap:"10px",padding:"5px"}}>
            {!friendToDisplay.isReceiver && <ClassicButton clickAction={()=>{}} text={"En attente"} disabledStyle={true}  />}
            {friendToDisplay.isReceiver && <div style={{display:"flex",gap:"10px"}}>
                    <SuccessButton clickAction={acceptFriendRequest} text={"Accepter"} />
                    <ErrorButton clickAction={denyFriendRequest} text={"Refuser"} />
                </div>
                }
        </div>

    </div>
}


export default FriendsRequestComponent
