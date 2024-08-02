import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import WindowValidation from "../windowValidation";

interface Props{
    onDrawAction:()=>void,
    isActivated:boolean,
    setActivatedMenu:(menu:string)=>void
}

function DrawButton({onDrawAction,isActivated,setActivatedMenu}:Props){
    

    const onClickAction=()=>{
        if(isActivated)
            setActivatedMenu("")
        else 
            setActivatedMenu("draw")
    }

    return <div style={{position:"relative"}}>
        {isActivated && <WindowValidation cancelAction={()=>setActivatedMenu("")} isVisible={isActivated} validationAction={onDrawAction} validationText="Oui" mainText="Abandonner ?" cancelText="Non"/>}
        <div className="boxIconGame" style={{boxSizing:'border-box',padding:"5px",height:"40px",aspectRatio:1,display:"grid",placeItems:"center"}} 
        onClick={onClickAction} >
            <FaTimes className="iconGame "/>
        </div>
    </div>

}



export default DrawButton