import {  useEffect, useState } from "react"
import PGNViewer from "./PGNViewer"
import Chessboard from "./Chessboard/Chessboard"
import Clock from "./Clock"
import { dictCoordToLetter, lengthGame } from "../Constante"
import { setStatePiecesFromFEN } from "../lib/initPieces"
import { IPiece } from "../lib/Type"
import { applyMove } from "../lib/applyMove"

interface Props{
    withPGNViewer : boolean
    invert:boolean
}

//PGN TEST "e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7","c4","c6","cxb5","axb5","Nc3","Bb7","Bg5","b4","Nb1","h6","Bh4","c5","dxe5","Nxe4","Bxe7","Qxe7"

function ChessGame({withPGNViewer,invert}:Props){
const [winner,setWinner] = useState<string|null>("")
const [pieces,setPieces] = useState(setStatePiecesFromFEN("8/4PPPP/1k6/8/2K3N1/8/5pp1/5N2"))
const [playerToPlay,setPlayerToPlay] = useState<"w"|"b">("w")
const [listMove,setListMove] = useState<string[]>([])
const [countdownWhite,setCoundownWhite] = useState(60*lengthGame)
const [countdownBlack,setCoundownBlack] = useState(60*lengthGame)
const [timer,setTimer] = useState<number>()

const [l_move_test,setL_move_test] = useState(["e8=Q","gxf1=R","f8=N"])

const applyMoveList = ()=>{
    setPieces(applyMove(l_move_test[0],playerToPlay,pieces))
    onNewMove(l_move_test[0])
    setL_move_test(l_move_test.slice(1))
}

//   useEffect(()=>{
//     const newTimer =setInterval(()=>{
//                         setCoundownWhite(ctr=>ctr-1)
//                     },1000)     
//     setTimer(newTimer)
//   },[])

    if(countdownBlack*countdownWhite===0) clearInterval(timer)

    useEffect(()=>{
        if(countdownWhite===0){
            setWinner("Black")
        }
    },[countdownWhite])
    
    useEffect(()=>{
        if(countdownBlack===0){
            setWinner("White")
        }
    },[countdownBlack])

    const switchCountDown = (color:"w"|'b')=>{
        clearInterval(timer)
        const newTimer = color==="w" ? 
                    setInterval(()=>{
                        setCoundownWhite(ctr=>ctr-1)
                    },1000) :
                    setInterval(()=>{
                        setCoundownBlack(ctr=> ctr- 1)
                    },1000)
        setTimer(newTimer)
    }


    const onGameOver = (name:string)=>{
        setWinner(name)
    }

    const onNewMove = (newMove:string)=>{
        const newColor = playerToPlay==="w" ? "b" : "w"
        switchCountDown(newColor)
        setListMove(listMove.concat(newMove))
        setPlayerToPlay(newColor)
    }

    const listLetter = []
    for(let x = invert ? 7 : 0 ;invert ? x>-1 : x<8;invert ? x--:x++){
        listLetter.push(<div style={{display:"grid",placeContent:"center"}}>{dictCoordToLetter[x].toUpperCase()}</div>)
    }
    const listNumber = []
    for(let y = !invert ? 7 : 0 ;!invert ? y>-1 : y<8;!invert ? y--:y++){
        listNumber.push(<div style={{display:"grid",placeContent:"center"}}>{y+1}</div>)
    }

    const updatePieces = (newPieces:IPiece[])=>{
        setPieces(newPieces)
    }

    return (
        <div style={{display:"flex",gap:"10px"}}>
            {withPGNViewer && <PGNViewer listMove={listMove}></PGNViewer>}
            <div style={{display:"grid",flexDirection:"column",gap:"10px",justifyContent:"space-between"}}>
                <Clock countdown={invert ? countdownWhite : countdownBlack}/>
                <div>
                    <div style={{display:"flex"}}>
                        <div className="rowFile">
                            {listNumber}
                        </div>
                        <div >
                            <Chessboard invert={invert} playerToPlay={playerToPlay} onPieceMove={onNewMove} onGameOver={onGameOver} updatePieces={updatePieces} pieces={pieces} />
                            <div className="columnFile">
                                {listLetter}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Clock countdown={invert ? countdownBlack : countdownWhite}/>
                <button onClick={applyMoveList}>Next Move</button>
                {winner && <span style={{color:"white"}}> Le gagnant est {winner} </span>}
            </div>
        </div>
    )
}

export default ChessGame