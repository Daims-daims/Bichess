import { useEffect, useRef, useState } from "react"


function useClocksGame(startTime:number,isDisabled:boolean){
    const [countdownWhite,setCoundownWhite] = useState(startTime)
    const [countdownBlack,setCoundownBlack] = useState(startTime)

    const intervalIDRef = useRef<number>();


    const setIntervalWhite = ()=>{
        intervalIDRef.current = setInterval(()=>{
            setCoundownWhite(l=>l-1)
        },1000)
    }

    const setIntervalBlack = ()=>{
        intervalIDRef.current = setInterval(()=>{
            setCoundownBlack(l=>l-1)
        },1000)
    }

    // const beginCount = ()=>{
    //     setIntervalWhite()
    // }

    const switchTimer = (color:"w"|"b")=>{
        clearInterval(intervalIDRef.current)
        if(!isDisabled){
        if(color=="w"){
            setIntervalWhite()
        }
        else{
            setIntervalBlack()
        }}
    }

    
    useEffect(()=>{
        if(countdownBlack * countdownWhite == 0 ){
            clearInterval(intervalIDRef.current)
        }
    },[countdownWhite,countdownBlack])

    return [countdownWhite,countdownBlack,switchTimer]as const
    
}


export {useClocksGame};