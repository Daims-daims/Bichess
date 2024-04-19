import { useState } from "react";
import { color } from "../../Constante";
import "./LeftBar.scss";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props{
    onClic:()=>void,
    text:string,
    isActive:boolean,
    link:string,
    Icon:IconType
}

const LeftBarMenu = ({onClic,text,isActive,link,Icon}:Props)=>{

    const [isHovered,setIsHovered] = useState(false)

    const colorElement = isHovered?color.primary_background : isActive ? color.primary_bold : "#000000"


    return <Link style={{ textDecoration: 'none' }} to={link}><div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} onClick={()=>onClic()} className={isActive ? "LeftBarMenu MenuActive" : "LeftBarMenu"}>
        <div >
        <Icon  className='iconMenu'color={colorElement}   />
        </div>
        <div>
            <p style={{color:colorElement,whiteSpace:"nowrap"}}>{text}</p>
        </div>
    </div>
    </Link>
}


export default LeftBarMenu;