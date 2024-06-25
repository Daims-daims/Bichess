import { useState } from "react"
import "./LeftBar.scss"
import LeftBarMenu from "./LeftBarMenu"
import { FaChessQueen,FaUserFriends,FaHistory,FaUser,FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import TestMenu from "./testMenu";

interface Props{
    logOut:()=>void
}

const LeftBar = ({logOut}:Props)=>{

    const location = useLocation();
    const [expanded,setExpanded] = useState(false)
    const selectedRoom = location.pathname.split("/")[1]
    
    const onClickAction = (menuCLicked : string)=>{
        console.log(menuCLicked)
    }

    return <div onMouseEnter={()=>setExpanded(true)} onMouseLeave={()=>setExpanded(false)} className={expanded ? "LeftBar LeftBarExpanded" : "LeftBar" }>
        <div style={{display:"flex",flexDirection:"column",gap:"45px"}}>
            <LeftBarMenu Icon={FaUser} link={"/profile"} onClic={()=>onClickAction("Profil")} text="Mon Profil" isActive={selectedRoom ==="profile"}  />
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <LeftBarMenu Icon={FaHome} link={"/"} onClic={()=>onClickAction("Profil")} text="Accueil" isActive={selectedRoom ===""}  />
                <LeftBarMenu Icon={FaChessQueen} link={"/game"} onClic={()=>onClickAction("Profil")} text="Jouer" isActive={selectedRoom ==="game"}  />
                <LeftBarMenu Icon={FaUserFriends} link={"/friends"} onClic={()=>onClickAction("Profil")} text="Amis" isActive={selectedRoom ==="friends"}  />
                <LeftBarMenu Icon={FaHistory} link={"/history"} onClic={()=>onClickAction("Profil")} text="Historique" isActive={selectedRoom ==="history"}  />
                <TestMenu/>
            </div>
        </div>
        <LeftBarMenu Icon={LuLogOut} link={"/"} onClic={logOut} text="Déconnexion" isActive={false}  />
    </div>
}

export default LeftBar
