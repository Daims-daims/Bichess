import { useState } from "react"
import { setStatePiecesFromFEN } from "../lib/initPieces"
import { applyMove } from "../lib/applyMove"
import { IPiece } from "../lib/Type"


const useChessBoard = ()=>{
    const [pieces,setPieces] = useState<IPiece[]>([])
    const [playerToPlay, setPlayerToPlay] = useState<"w"|"b">("w")
    const [colorPlayer, setColorPlayer] = useState<"w"|"b">("w")

    const initBoard = (FEN:string,colorPlayer:"w"|"b")=>{
        setPieces(setStatePiecesFromFEN(FEN))
        setColorPlayer(colorPlayer)
    }

    const applyNewMove = (newMove:string)=>{
        console.log(pieces)
        if(newMove[0]!="w" && newMove[0]!="b" ) throw new Error("Move wrongly formatted : "+ newMove);
        const newColor = newMove[0]==="w" ? "b" : "w"
        setPieces(cur=>applyMove(newMove.slice(1),newMove[0] as "w"|"b",cur))
        setPlayerToPlay(newColor)
    }


    return[pieces,playerToPlay,colorPlayer,applyNewMove,initBoard] as const

}

export default useChessBoard