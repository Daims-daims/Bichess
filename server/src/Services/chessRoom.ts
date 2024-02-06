import { WebSocket } from "ws"


class chessRoom {

    roomId:String
    player1:null | String = null
    player2:null | String = null
    protected wsRoom1:WebSocket[] = []
    protected wsRoom2:WebSocket[] = []

    constructor(roomId:String,player1 :String ,player2 : String,portRoom1 : String, portRoom2 : number) {
        this.roomId = roomId
        this.player1 = player1 
    }

    addWs(ws:WebSocket,index:String){
        if(index==='1'){
            this.wsRoom1.push(ws)
        }
        else{
            this.wsRoom2.push(ws)
        }
    }

    sendMessage(data:String,index:String){
        if(index==='1'){
            this.wsRoom1.forEach(ws=>ws.send(data))
        }
        else{
            this.wsRoom2.forEach(ws=>ws.send(data))
        }
    }
}

export {chessRoom};