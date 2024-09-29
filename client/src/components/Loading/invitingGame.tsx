
import "../../pages/Game/Game.scss"
import ClassicButton from "../Button/ClassicButton"


interface Props{
    roomId: string
}

const invitingGame = ({roomId}:Props)=>{
    return <div onClick={(e)=>e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:"10px"}} className="menuBox">
            <p className="menuBoxHeader" style={{fontSize:"20px"}}>En attente du second joueur...</p>
            <img style={{width:"200px"}}src="../../../gif/loading.gif" alt="Loading pawn" />
            <div  className="menuBoxContent" >
                <p><b>Code d'accès : </b>{roomId}</p>
                <p><b>Lien :</b> {window.location.host}/game/{roomId}</p>
            </div>
            <ClassicButton text='Copier le lien' clickAction={() => {navigator.clipboard.writeText(window.location.host+"/game/"+roomId)}}/>
        </div>
}

export default invitingGame