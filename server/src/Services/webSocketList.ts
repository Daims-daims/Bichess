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

            console.log(room)
            this.showAllRooms()

            // Recherche de la salle avec l'id correspondant dans la liste des salles
            
            const currentRoom = this.listRooms.find(l=>l.roomId===room)
            console.log(room)
            console.log(this.listRooms.map(l=>l.roomId))
            // Si la salle n'est pas trouvé erreur puisque que la room est initialisé au moment de la requête
            if(!currentRoom){
                throw new Error("Room : "+currentRoom+" introuvable");
            }
            console.log("plaer",pseudo)
            currentRoom.addWs(wsConnection,pseudo)

            wsConnection.on("message",(data:string)=>{
                if(! currentRoom) throw new Error("Chat introuvable "+ room);
                currentRoom.receptionMessage(data)
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
        
        let idRoom = roomCode
        const newRoom = new chessRoom(idRoom)
        return newRoom
    }

    requestRoom(pseudo:string){
        console.log("recherche de salle")
        // searching free room through current rooms
        for(var i = 0 ; i < this.listRooms.length ; i++){
            if(this.listRooms[i].isFree()){
                this.listRooms[i].addPlayer(pseudo)
                return {
                    "pseudo" : this.listRooms[i].getPseudo(1),
                    "color" : "b",
                    "roomId" : this.listRooms[i].getRoomId(),
                    "boardStates":this.listRooms[i].getBoardsStates().join('XXX')
                }
            }
        }
        // create a new room
        const newRoom = this.createRoom()
        this.listRooms.push(newRoom)
        newRoom.addPlayer(pseudo)
        return {
            "pseudo" : pseudo,
            "color":"w",
            "roomId" : newRoom.getRoomId(),
            "boardStates":newRoom.getBoardsStates().join('XXX') // we can then split result on frontend
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