import { useEffect, useRef, useState } from "react"
import LoadingScreenGame from "./LoadingScreenGame"
import { useNavigate } from "react-router-dom"
import useChessBoard from "../../hooks/useChessBoard"
import ChessGameOnline from "../../components/ChessGameOnline"
import getScorePlayer from "../../lib/calculateScore"
import { color } from "../../Constante"

interface Props{
    pseudo:string
}

// interface gameMessage{
//     event : string,
//     boardIndex : 0|1,
//     move? : string,
//     FEN? : string,
//     FENBoard1? : string,
//     FENBoard2? : string,
//     remainingTime? : string
// }

const GameRoom = ({pseudo}:Props)=>{
    const navigate = useNavigate()
    
    const idRoom = location.pathname.split("/")[2]
    const [isLoading,setIsLoading] = useState(true)
    const [pseudoOpponent,setPseudoOpponent] = useState("")
    const [piecesBoard_1,playerToPlayBoard_1,colorPlayerBoard_1,applyNewMoveBoard_1,initBoard_1,resultBoard_1] = useChessBoard();
    const [piecesBoard_2,playerToPlayBoard_2,colorPlayerBoard_2,applyNewMoveBoard_2,initBoard_2,resultBoard_2] = useChessBoard();

    const connection = useRef<WebSocket>()

    console.log(idRoom)

    const resetLoading = ()=>{
        setIsLoading(false)
        navigate("/game")
    }

    useEffect(() => {
        if(!connection.current){
            console.log("connecting to game as "+pseudo)
            const socket = new WebSocket("ws://localhost:8082/"+idRoom+"/"+pseudo)
            // Connection opened
            socket.addEventListener("open", () => {
            // socket.send("Connection established")
            })
            // Listen for messages
            socket.addEventListener("message", (event):void => {
                const msg = JSON.parse(event.data);
                console.log(msg)
                if(msg.event === "start"){
                    console.log("start")
                    initBoard_1(msg.FENBoard1,msg.color)
                    initBoard_2(msg.FENBoard2,msg.color==="w"?"b":"w")
                    setIsLoading(false)
                    setPseudoOpponent(msg.opponent)
                }
                if(msg.event === "move" || msg.event === "result"){
                    if(msg.boardIndex === 0 ){
                        applyNewMoveBoard_1(msg.move)
                    }
                    else{
                        applyNewMoveBoard_2(msg.move)
                    }
                }
            })
            connection.current = socket
        }
        // return () => {if(connection.current) connection.current.close()}
    }, [applyNewMoveBoard_1, applyNewMoveBoard_2, idRoom, initBoard_1, initBoard_2, pseudo])

    
    useEffect(() => {
        if(connection.current && resultBoard_1!=""){
            const data = {
                "event":"result",
                "result":resultBoard_1,
                "boardIndex":0
            }
            connection.current.send(JSON.stringify(data))
        }
    }, [resultBoard_1])

    useEffect(() => {
        if(connection.current && resultBoard_1!=""){
            const data = {
                "event":"result",
                "result":resultBoard_2,
                "boardIndex":1
            }
            connection.current.send(JSON.stringify(data))
        }
    }, [resultBoard_1, resultBoard_2])



    const onNewMove = (newMove:string,board:0|1)=>{
        if(newMove[0]!="w" && newMove[0]!="b" ) throw new Error("Move wrongly formatted : "+ newMove);
        if(connection.current){
            const data = {
                "event":"move",
                "move":newMove,
                "boardIndex":board
            }
            connection.current.send(JSON.stringify(data))
        }
        else{
            throw new Error("Connection to WebSocket lost");    
        }
    }

    const scorePlayer1 = getScorePlayer(colorPlayerBoard_1==="w" ? 1 : 2,resultBoard_1,resultBoard_2)
    const scorePlayer2 = getScorePlayer(colorPlayerBoard_1==="w" ? 2 : 1,resultBoard_1,resultBoard_2)
    console.log("oppoennet ! "+pseudoOpponent)
    return <div style={{width:"100%"}}>
           {isLoading && <LoadingScreenGame resetLoading={resetLoading}/>}
           {!isLoading && 
           <div style={{height:"100vh",display:"flex",width:"100%",flexDirection:"column",placeItems:"center",gap:"10px"}}>
            <div style={{width:"100%",display:"flex",gap:"10px",fontSize:"64px",color:color.primary_color,fontWeight:800}}>
                <div style={{flex:1,display:"flex",flexDirection:"row-reverse"}}>{pseudo}</div>
                <p style={{color:color.primary_extra_bold}}>{scorePlayer1}</p> 
                <div>vs</div> 
                <p style={{color:color.primary_extra_bold}}>{scorePlayer2}</p> 
                <div style={{flex:1}}>{pseudoOpponent}</div>
            </div>0
            <div style={{height:"100%",width:"100%",display:"flex",flexDirection:(colorPlayerBoard_1==="b" ? "row-reverse" : "row"),gap:"50px"}}>
                <ChessGameOnline pieces={piecesBoard_1} 
                                                pseudo={pseudo} 
                                                invert={colorPlayerBoard_1==="b"} 
                                                colorPlayer={colorPlayerBoard_1}
                                                playerToPlay={playerToPlayBoard_1} 
                                                indexBoard={1} 
                                                onlineGame={true} 
                                                onNewMove={(move:string)=>onNewMove(move,0)}
                                                result={resultBoard_1} />
                    <ChessGameOnline pieces={piecesBoard_2} 
                                                pseudo={pseudo} 
                                                invert={colorPlayerBoard_1==="w"} 
                                                colorPlayer={colorPlayerBoard_2}
                                                playerToPlay={playerToPlayBoard_2} 
                                                indexBoard={2} 
                                                onlineGame={true} 
                                                onNewMove={(move:string)=>onNewMove(move,1)}
                                                result={resultBoard_2} />
                </div>
            </div>}
           </div>

}

export default GameRoom