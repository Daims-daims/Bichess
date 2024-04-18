import { useState } from "react"
import "./LeftBar.scss"
import LeftBarMenu from "./LeftBarMenu"
import { FaChessQueen,FaUserFriends,FaHistory,FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

interface Props{
    logOut:()=>void
}

const LeftBar = ({logOut}:Props)=>{

    const [expanded,setExpanded] = useState(false)
    
    const onClickAction = (menuCLicked : string)=>{
        console.log(menuCLicked)
    }

    return <div onMouseEnter={()=>setExpanded(true)} onMouseLeave={()=>setExpanded(false)} className={expanded ? "LeftBar LeftBarExpanded" : "LeftBar" }>
        <div style={{display:"flex",flexDirection:"column",gap:"45px"}}>
            <LeftBarMenu Icon={FaUser} onClic={()=>onClickAction("Profil")} text="Mon Profil" isActive={false} expanded={expanded} />
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <LeftBarMenu Icon={FaChessQueen} onClic={()=>onClickAction("Profil")} text="Jouer" isActive={true} expanded={expanded} />
                <LeftBarMenu Icon={FaUserFriends} onClic={()=>onClickAction("Profil")} text="Amis" isActive={false} expanded={expanded} />
                <LeftBarMenu Icon={FaHistory} onClic={()=>onClickAction("Profil")} text="Historique" isActive={false} expanded={expanded} />
            </div>
        </div>
        <LeftBarMenu Icon={LuLogOut} onClic={logOut} text="Déconnexion" isActive={false} expanded={expanded} />
    </div>
}

export default LeftBar
