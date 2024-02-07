import { WebSocket } from "ws"


class chessRoom {

    roomId:String
    player1:null | String = "Jean"
    player2:null | String = "John"
    protected wsRoom1:WebSocket[] = []
    protected wsRoom2:WebSocket[] = []

    constructor(roomId:String) {
        this.roomId = roomId
    }

    addWs(ws:WebSocket,index:String){
        console.log("- newWs - RoomId : "+this.roomId,index)
        if(index==='1'){
            this.wsRoom1.push(ws)
        }
        else{
            this.wsRoom2.push(ws)
        }
    }

    getPseudo(indexPlayer : 1 | 2 ){
        if(indexPlayer === 1 ) return this.player1
        return this.player2
    }

    sendMessage(data:String,index:String,pseudo:string){
        console.log("sendMsg : "+data,index,pseudo,this.player1,this.player2)
        if(index==='1'){
            if(pseudo == this.player1){
                this.wsRoom1[0].send(JSON.stringify(data))
            }
            else if(pseudo==this.player2){
                this.wsRoom1[1].send(JSON.stringify(data))
            }
        }
        else{
            if(pseudo == this.player1){
                this.wsRoom2[1].send(JSON.stringify(data))
            }
            else if(pseudo==this.player2){
                this.wsRoom2[0].send(JSON.stringify(data))
            }
        }
    }

    addPlayer(pseudo : String){
        this.player2=pseudo;
    }

    getRoomId(){
        return this.roomId
    }

    isFree(){
        return this.player2 === null
    }
}

export {chessRoom};