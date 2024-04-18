import { useState } from "react";
import { color } from "../../Constante";
import "./LeftBar.scss";
import { IconType } from "react-icons";

interface Props{
    onClic:()=>void,
    text:string,
    isActive:boolean,
    expanded:boolean,
    Icon:IconType
}

const LeftBarMenu = ({onClic,text,isActive,expanded,Icon}:Props)=>{

    const [isHovered,setIsHovered] = useState(false)

    const colorElement = isHovered?color.primary_background : isActive ? color.primary_bold : "#000000"


    return <div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} onClick={()=>onClic()} className={isActive ? "LeftBarMenu MenuActive" : "LeftBarMenu"}>
        <Icon size={25} color={colorElement} />
        {expanded && <p style={{color:colorElement}}>{text}</p>}
    </div>
}


export default LeftBarMenu;