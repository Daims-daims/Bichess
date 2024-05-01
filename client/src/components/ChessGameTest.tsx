import {  useCallback, useEffect, useRef, useState } from "react"
import PGNViewer from "./PGNViewer"
import Chessboard from "./Chessboard/Chessboard"
import Clock from "./Clock"
import { dictCoordToLetter, lengthGame } from "../Constante"
import { setStatePiecesFromFEN } from "../lib/initPieces"
import { IPiece } from "../lib/Type"
import { applyMove } from "../lib/applyMove"
import { playerStillHasMove } from "../lib/Piece"
import { ResultGame } from "./ResultGame"
import { useClocksGame } from "../hooks/useClocksGame"

interface Props{
    invert:boolean,
    roomId?:string,
    pseudo:string
    colorPlayer : "w" | "b"
    playerToPlay : "w" | "b"
    indexBoard : 1 | 2 ,
    onlineGame : boolean,
    pieces:IPiece[],
    onNewMove : (move:string)=>void
}

//PGN TEST "e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7","c4","c6","cxb5","axb5","Nc3","Bb7","Bg5","b4","Nb1","h6","Bh4","c5","dxe5","Nxe4","Bxe7","Qxe7"
//FEN TEST 8/4PPPP/1k6/8/2K3N1/8/5pp1/5N2
function ChessGameTest({pieces,pseudo,invert,roomId,colorPlayer,indexBoard,onlineGame,playerToPlay,onNewMove}:Props){
    const [winner,setWinner] = useState<string|null>("")
    // const [listMove,setListMove] = useState<string[]>([])
    
    const [countdownWhite,countdownBlack, switchTimer] = useClocksGame(60*lengthGame,!onlineGame)

    //const [l_move_test,setL_move_test] = useState(["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7","c4","c6","cxb5","axb5","Nc3","Bb7","Bg5","b4","Nb1","h6","Bh4","c5","dxe5","Nxe4","Bxe7","Qxe7"])

    
    


    // useEffect(()=>{
    //     if(! playerStillHasMove(playerToPlay,pieces)){
    //         setWinner(playerToPlay === "w" ? "black" : "white" )
    //     }
    // },[pieces,playerToPlay])



    const listLetter = []
    for(let x = invert ? 7 : 0 ;invert ? x>-1 : x<8;invert ? x--:x++){
        listLetter.push(<div className="letterFile" key ={"x"+x} style={{display:"grid",placeContent:"center"}}>{dictCoordToLetter[x].toUpperCase()}</div>)
    }
    const listNumber = []
    for(let y = !invert ? 7 : 0 ;!invert ? y>-1 : y<8;!invert ? y--:y++){
        listNumber.push(<div className="letterFile" key ={"y"+y} style={{display:"grid",placeContent:"center"}}>{y+1}</div>)
    }  

    const updatePieces = (newPieces:IPiece[])=>{
        console.log("test")
        // setPieces(newPieces)
    }  


    return (
        <div style={{display:"flex",gap:"10px"}}>
            <div style={{display:"grid",flexDirection:"column",gap:"0px",justifyItems:(indexBoard == 1 ? "end" : "start")}}>
                <Clock countdown={invert ? countdownWhite : countdownBlack}/>
                <div>
                    <div style={{display:"flex",flexDirection:(indexBoard==1 ? "row" : "row-reverse"),marginTop:"10px"}}>
                        <div className="rowFile">
                            {listNumber}
                        </div>
                        <div >
                            {winner && <ResultGame result={winner} />}
                            <Chessboard key={roomId ? roomId+(invert ? 2 : 1) : invert ? 2 : 1} 
                                        invert={invert} 
                                        playerToPlay={playerToPlay} 
                                        onPieceMove={onNewMove} 
                                        onGameOver={()=>console.log("game over")} 
                                        updatePieces={updatePieces} 
                                        disableChessBoard={playerToPlay!==colorPlayer && onlineGame} 
                                        pieces={pieces} />
                            <div className="columnFile">
                                {listLetter}
                            </div>
                        </div>
                    </div>

                </div>
                <Clock countdown={invert ? countdownBlack : countdownWhite}/>
            </div>
        </div>
    )
}

export default ChessGameTest