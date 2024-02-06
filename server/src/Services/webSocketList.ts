import { WebSocket, WebSocketServer } from "ws";
import { chessRoom } from "./chessRoom";
import { throws } from "assert";


class gameRoomWebSocketHandler {
    wss :WebSocketServer
    listRooms : chessRoom[] = []

    constructor(port:number) {
        this.wss = new WebSocketServer({port:port})
        this.wss.on("connection",(wsConnection:WebSocket,req:Request)=>{
            const room = req.url.split("/")[1]
            const chessBoardIndex = req.url.split("/")[2]

            const currentRoom = this.listRooms.find(l=>l.roomId===room)
            if(!currentRoom){
                throw new Error("Room : "+currentRoom+" introuvable");
            }
            currentRoom.addWs(wsConnection,chessBoardIndex)

            wsConnection.on("message",(data:string)=>{
                if(! currentRoom) throw new Error("Chat introuvable "+ room);
                currentRoom.sendMessage(data,chessBoardIndex)
            })
        })
    }
}

export {gameRoomWebSocketHandler}