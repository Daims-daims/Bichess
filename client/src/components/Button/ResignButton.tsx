import { FaFlag } from "react-icons/fa";
import { useState } from "react";
import WindowValidation from "../windowValidation";


interface Props{
    onResignAction:()=>void,
    isActivated:boolean,
    setActivatedMenu:(menu:string)=>void
}

function ResignButton({onResignAction,isActivated,setActivatedMenu}:Props){
    

    const onClickAction=()=>{
        if(isActivated)
            setActivatedMenu("")
        else 
            setActivatedMenu("resign")
    }

    return <div style={{position:"relative"}}>
        {isActivated && <WindowValidation cancelAction={()=>setActivatedMenu("")} isVisible={isActivated} validationAction={onResignAction} validationText="Oui" mainText="Proposer nulle ?" cancelText="Non"/>} 
        <div className="boxIconGame" style={{boxSizing:'border-box',padding:"5px",height:"40px",aspectRatio:1,display:"grid",placeItems:"center"}} onClick={onClickAction}>
            <FaFlag className="iconGame"/>
        </div>
    </div>

}



export default ResignButton