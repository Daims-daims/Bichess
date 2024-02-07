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
    withPGNViewer : boolean
    invert:boolean,
    roomId:string,
    pseudo:string
    colorPlayer : "w" | "b"
    indexBoard : 1 | 2 
}

//PGN TEST "e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7","c4","c6","cxb5","axb5","Nc3","Bb7","Bg5","b4","Nb1","h6","Bh4","c5","dxe5","Nxe4","Bxe7","Qxe7"
//FEN TEST 8/4PPPP/1k6/8/2K3N1/8/5pp1/5N2
function ChessGame({withPGNViewer,pseudo,invert,roomId,colorPlayer,indexBoard}:Props){
    const [winner,setWinner] = useState<string|null>("")
    const [pieces,setPieces] = useState(setStatePiecesFromFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"))
    const [playerToPlay,setPlayerToPlay] = useState<"w"|"b">("w")
    const [listMove,setListMove] = useState<string[]>([])
    
    const [countdownWhite,countdownBlack, switchTimer] = useClocksGame(60*lengthGame)

    const [l_move_test,setL_move_test] = useState(["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7","c4","c6","cxb5","axb5","Nc3","Bb7","Bg5","b4","Nb1","h6","Bh4","c5","dxe5","Nxe4","Bxe7","Qxe7"])

    
    const connection = useRef<WebSocket>()
    
    

    const onNewMove = useCallback((newMove:string,sendData:boolean)=>{
        if(newMove[0]!="w" && newMove[0]!="b" ) throw new Error("Move wrongly formatted : "+ newMove);

        const newColor = newMove[0]==="w" ? "b" : "w"
        console.log(newMove)
        console.log(listMove)
        console.log(playerToPlay,newColor)
        setPieces(cur=>applyMove(newMove.slice(1),newMove[0] as "w"|"b",cur))
        switchTimer(newColor)
        setListMove(cur=>cur.concat(newMove))
        setPlayerToPlay(newColor)
        if(sendData && connection.current) connection.current.send(newMove)
    },[listMove, playerToPlay, switchTimer])


    useEffect(() => {
        if(!connection.current){
            const socket = new WebSocket("ws://localhost:8082/"+roomId+"/"+pseudo+"/"+indexBoard)

            // Connection opened
            socket.addEventListener("open", () => {
            // socket.send("Connection established")
            })

            // Listen for messages
            socket.addEventListener("message", (event):void => {
                const arr = JSON.parse(event.data).data;
                let newData = '';
                arr.forEach((element:number) => {
                  newData+=String.fromCharCode(element);
                });
                console.log(newData)
                onNewMove(newData,false)
            })

            connection.current = socket
        }
        // return () => {if(connection.current) connection.current.close()}
    }, [roomId, onNewMove, indexBoard])
    
    const applyMoveList = ()=>{
        setPieces(applyMove(l_move_test[0],playerToPlay,pieces))
        onNewMove(l_move_test[0],false)
        setL_move_test(l_move_test.slice(1))
    }

    useEffect(()=>{
        if(! playerStillHasMove(playerToPlay,pieces)){
            setWinner(playerToPlay === "w" ? "black" : "white" )
            console.log("fin test")
        }
        console.log("fin useEffect")
    },[pieces,playerToPlay])

    useEffect(()=>{
        if(countdownWhite===0){
            setWinner("black")
        }
    },[countdownWhite])
    
    useEffect(()=>{
        if(countdownBlack===0){
            setWinner("white")
        }
    },[countdownBlack])


    const onGameOver = useCallback((name:string)=>{
        setWinner(name)
    },[])

    const listLetter = []
    for(let x = invert ? 7 : 0 ;invert ? x>-1 : x<8;invert ? x--:x++){
        listLetter.push(<div key ={"x"+x} style={{display:"grid",placeContent:"center"}}>{dictCoordToLetter[x].toUpperCase()}</div>)
    }
    const listNumber = []
    for(let y = !invert ? 7 : 0 ;!invert ? y>-1 : y<8;!invert ? y--:y++){
        listNumber.push(<div key ={"y"+y} style={{display:"grid",placeContent:"center"}}>{y+1}</div>)
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
                            {winner && <ResultGame result={winner} />}
                            <Chessboard key={roomId+(invert ? 2 : 1)} invert={invert} playerToPlay={playerToPlay} onPieceMove={onNewMove} onGameOver={onGameOver} updatePieces={updatePieces} disableChessBoard={playerToPlay!==colorPlayer} pieces={pieces} />
                            <div className="columnFile">
                                {listLetter}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Clock countdown={invert ? countdownBlack : countdownWhite}/>
                <button onClick={applyMoveList}>{playerToPlay}</button>
            </div>
        </div>
    )
}

export default ChessGame