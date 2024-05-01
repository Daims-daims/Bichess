import { useEffect, useRef, useState } from "react"
import LoadingScreenGame from "./LoadingScreenGame"
import { useNavigate } from "react-router-dom"
import useChessBoard from "../../hooks/useChessBoard"
import ChessGameTest from "../../components/ChessGameTest"

interface Props{
    pseudo:string
}

interface gameMessage{
    event : string,
    boardIndex : 0|1,
    move? : string,
    FEN? : string,
    FENBoard1? : string,
    FENBoard2? : string,
    remainingTime? : string
}

const GameRoom = ({pseudo}:Props)=>{
    const navigate = useNavigate()
    
    const idRoom = location.pathname.split("/")[2]
    const [isLoading,setIsLoading] = useState(true)
    const [piecesBoard_1,playerToPlayBoard_1,colorPlayerBoard_1,applyNewMoveBoard_1,initBoard_1] = useChessBoard();
    const [piecesBoard_2,playerToPlayBoard_2,colorPlayerBoard_2,applyNewMoveBoard_2,initBoard_2] = useChessBoard();

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
                }
                if(msg.event === "move"){
                    if(msg.boardIndex === 0 ){
                        applyNewMoveBoard_1(msg.move)
                    }
                    else{
                        console.log()
                        applyNewMoveBoard_2(msg.move)
                    }
                }
            })
            connection.current = socket
        }
        // return () => {if(connection.current) connection.current.close()}
    }, [pseudo])

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


    return <div>
           {isLoading && <LoadingScreenGame resetLoading={resetLoading}/>}
           {!isLoading && <div style={{display:"flex",gap:"50px"}}>
            <ChessGameTest pieces={piecesBoard_1} 
                                            pseudo={pseudo} 
                                            invert={colorPlayerBoard_1==="b"} 
                                            colorPlayer={colorPlayerBoard_1}
                                            playerToPlay={playerToPlayBoard_1} 
                                            indexBoard={1} 
                                            onlineGame={true} 
                                            onNewMove={(move:string)=>onNewMove(move,0)} />
                <ChessGameTest pieces={piecesBoard_2} 
                                            pseudo={pseudo} 
                                            invert={colorPlayerBoard_1==="w"} 
                                            colorPlayer={colorPlayerBoard_2}
                                            playerToPlay={playerToPlayBoard_2} 
                                            indexBoard={2} 
                                            onlineGame={true} 
                                            onNewMove={(move:string)=>onNewMove(move,1)} />
            </div>}
           </div>

}

export default GameRoom