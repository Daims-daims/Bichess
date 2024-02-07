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
            const pseudo = req.url.split("/")[2]
            const chessBoardIndex = req.url.split("/")[3]

            console.log(room,chessBoardIndex)
            console.log(this.listRooms.map(l=>l.roomId))
            const currentRoom = this.listRooms.find(l=>l.roomId===room)
            if(!currentRoom){
                throw new Error("Room : "+currentRoom+" introuvable");
            }
            currentRoom.addWs(wsConnection,chessBoardIndex)

            wsConnection.on("message",(data:string)=>{
                if(! currentRoom) throw new Error("Chat introuvable "+ room);
                currentRoom.sendMessage(data,chessBoardIndex,pseudo)
            })
        })
    }

    createRoom(){
        const nbRoom = this.listRooms.length;
        const newRoom = new chessRoom("room"+nbRoom)
        return newRoom
    }

    requestRoom(){
        for(var i = 0 ; i < this.listRooms.length ; i++){
            if(this.listRooms[i].isFree()){
                //this.listRooms[i].addPlayer()
                return {
                    "pseudo" : this.listRooms[i].getPseudo(1),
                    "color" : "b",
                    "roomId" : this.listRooms[i].getRoomId()
                }
            }
        }
        const newRoom = this.createRoom()
        this.listRooms.push(newRoom)
        return {
            "pseudo" : "test",
            "color":"w",
            "roomId" : newRoom.getRoomId()
        }
    }
}

export {gameRoomWebSocketHandler}