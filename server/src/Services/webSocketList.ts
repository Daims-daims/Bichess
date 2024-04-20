import { WebSocket, WebSocketServer } from "ws";
import { chessRoom } from "./chessRoom";
import { throws } from "assert";
import { pseudoRandomBytes } from "crypto";

const ID_MAX = 256

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
            this.showAllRooms()

            // Recherche de la salle avec l'id correspondant dans la liste des salles
            const currentRoom = this.listRooms.find(l=>l.roomId===room)


            // Si la salle n'est pas trouvé erreur puisque que la room est initialisé au moment de la requête
            if(!currentRoom){
                throw new Error("Room : "+currentRoom+" introuvable");
            }

            currentRoom.addWs(wsConnection,chessBoardIndex,pseudo)

            wsConnection.on("message",(data:string)=>{
                if(! currentRoom) throw new Error("Chat introuvable "+ room);
                currentRoom.sendMessage(data,chessBoardIndex)
            })

            wsConnection.on("close",(data:string)=>{
                console.log("suppression "+pseudo)
                currentRoom.disconnect(pseudo)
                if(currentRoom.isEmpty()){
                    this.deleteRoom(room)
                }
            }
            )
        })
    }

    createRoom(){
        let roomCode = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            roomCode += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        console.log(roomCode);
        
        let idRoom = "room"+roomCode
        const newRoom = new chessRoom(idRoom)
        return newRoom
    }

    requestRoom(pseudo:String){
        console.log("recherche de salle")
        for(var i = 0 ; i < this.listRooms.length ; i++){
            console.log(this.listRooms[i].getRoomId())
            console.log(this.listRooms[i].isFree())
            if(this.listRooms[i].isFree()){
                this.listRooms[i].addPlayer(pseudo)
                return {
                    "pseudo" : this.listRooms[i].getPseudo(1),
                    "color" : "b",
                    "roomId" : this.listRooms[i].getRoomId()
                }
            }
        }
        const newRoom = this.createRoom()
        this.listRooms.push(newRoom)
        this.listRooms[i].addPlayer(pseudo)
        return {
            "pseudo" : "test",
            "color":"w",
            "roomId" : newRoom.getRoomId()
        }
    }

    showAllRooms(){
        console.log(this.listRooms.map(l=>l.roomId))
    }

    deleteRoom(roomId:string){
        const indexRoom = this.listRooms.map(e => e.getRoomId()).indexOf(roomId);
        if(indexRoom >-1) this.listRooms.splice(indexRoom,1)
        this.showAllRooms()
    }
}

export {gameRoomWebSocketHandler}