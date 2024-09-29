
import InvitingGame  from "../../components/Loading/invitingGame"
import LoadingGame from "../../components/Loading/queuingGame"

interface Props{
    resetLoading : ()=>void
    roomId: string
}


const InvitingScreenGame = ({resetLoading,roomId}:Props)=>{

    return <div onClick={()=>resetLoading()}style={{display:"grid",zIndex:"1",position:"absolute",top:"0px",left:"0px",backgroundColor:"#FF855133",width:"100%",height:"100%",placeItems:'center'}}>
        <InvitingGame roomId={roomId}/>
    </div>
}

export default InvitingScreenGame