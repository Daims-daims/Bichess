import { WebSocket } from "ws"


class chessRoom {

    roomId:String
    player1:null | String = null
    player2:null | String = null
    protected wsRoom1:WebSocket[] = []
    protected wsRoom2:WebSocket[] = []

    constructor(roomId:String) {
        this.roomId = roomId
    }

    addWs(ws:WebSocket,index:String,pseudo : String){
        if(index==='1'){
            this.wsRoom1.push(ws)
        }
        else{
            this.wsRoom2.push(ws)
        }
        if(this.wsRoom1.length===2 && this.wsRoom2.length === 2 ){
            console.log("start Game")
            this.sendMessage("start","1")
            this.sendMessage("start","2")
        }
    }

    getPseudo(indexPlayer : 1 | 2 ){
        if(indexPlayer === 1 ) return this.player1
        return this.player2
    }

    addPlayer(pseudo : String){
        this.player1 == null ? this.player1 = pseudo : this.player2 = pseudo
    }

    sendMessage(data:String,index:String){
        if(index==='1'){
            this.wsRoom1[0].send(JSON.stringify(data))
            this.wsRoom1[1].send(JSON.stringify(data))
        }
        else{
            this.wsRoom2[0].send(JSON.stringify(data))
            this.wsRoom2[1].send(JSON.stringify(data))
        }
    }

    getRoomId(){
        return this.roomId
    }

    isFree(){
        console.log(this.player2)
        return this.player2 === null
    }
}

export {chessRoom};