import { useEffect, useState } from "react"
import { setStatePiecesFromFEN } from "../lib/initPieces"
import { applyMove } from "../lib/applyMove"
import { IPiece } from "../lib/Type"
import { isKingAttacked, playerStillHasMove } from "../lib/Piece"


const useChessBoard = ()=>{
    const [pieces,setPieces] = useState<IPiece[]>([])
    const [playerToPlay, setPlayerToPlay] = useState<"w"|"b">("w")
    const [colorPlayer, setColorPlayer] = useState<"w"|"b">("w")
    const [result,setResult] = useState<"white"|"draw"|"black"|"">("")

    const initBoard = (FEN:string,colorPlayer:"w"|"b")=>{
        setPieces(setStatePiecesFromFEN(FEN))
        setColorPlayer(colorPlayer)
    }

    const applyNewMove = (newMove:string)=>{
        var newPieces:IPiece[]=[]
        if(newMove[0]!="w" && newMove[0]!="b" ) throw new Error("Move wrongly formatted : "+ newMove);
        const newColor = newMove[0]==="w" ? "b" : "w"
        setPieces((cur)=>{
            console.log("cur",cur)
            newPieces = applyMove(newMove.slice(1),newMove[0] as "w"|"b",cur)
            return newPieces})
        setPlayerToPlay(newColor)
    }

    useEffect(()=>{
        if(pieces.length>0) checkResult(playerToPlay,pieces)
    },[pieces,playerToPlay])

    const checkResult= (colorPlayer:"w"|"b",newPieces:IPiece[])=>{
        console.log(colorPlayer,newPieces)
        if(!playerStillHasMove(colorPlayer,newPieces)){
            if(isKingAttacked(colorPlayer,newPieces)){
                setResult(colorPlayer==="w"?"black":"white")
            }
            else{
                setResult("draw")
            }
        }
    }

    

    return[pieces,playerToPlay,colorPlayer,applyNewMove,initBoard,result] as const

}

export default useChessBoard