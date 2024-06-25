import { error, log } from "console"
import { WebSocket } from "ws"
import { createRoom } from "../controllers/chessRoomController"
import { Model } from "sequelize-typescript"
import { updatePGNBoard, updateResultBoard } from "../controllers/chessBoardController"


interface messageReceivedWs{
    event:string
    boardIndex : 0|1,
    move : string,
    remainingTime:number, 
    FENState : string,
    color : "w" | "b",
    result:'white'|'draw'|'black'    
}

interface player{
    pseudo:string|null,
    connected: boolean,
    wsClient : WebSocket|null
}

interface IchessRoomInfo{
    roomId:string,
    whitePiecesId:number,
    blackPiecesId:number,
    firstBoardId:number,
    secondBoardId:number
}

class chessRoom {

    roomId:string
    player1: player = {pseudo:null,connected:false,wsClient:null}
    player2: player = {pseudo:null,connected:false,wsClient:null}
    chessRoomInfo: IchessRoomInfo|null = null

    // protected boardStates:string[]=['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    // 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']
    protected boardStates:string[]=['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR']
    protected PGNGames:string[]=["",""]


    constructor(roomId:string) {
        this.roomId = roomId
    }

    allPlayerConnected(){
        console.log(this.player1.wsClient===null)
        console.log(this.player2.wsClient===null)
        return this.player1.wsClient!== null && this.player2.wsClient!== null
    }

    addWs(ws:WebSocket,pseudo : String){
        console.log(pseudo)
        if(this.player1.pseudo===pseudo && this.player1.wsClient===null){
            this.player1.wsClient=ws
        }
        if(this.player2.pseudo===pseudo){ // rajouter else pour unificication joueur
            this.player2.wsClient=ws
        }
        if(this.allPlayerConnected()){
            this.startRoom()
        }
    }

    startRoom(){
        console.log("start Game")
        if(this.player1.pseudo && this.player2.pseudo){
            createRoom(this.roomId,this.player1.pseudo,this.player2.pseudo).then((l:IchessRoomInfo)=>this.chessRoomInfo=l)

            // Send game starting message to players
            const msg = {
                            event : "start",
                            FENBoard1 : this.boardStates[0],
                            FENBoard2 : this.boardStates[1],
                            color:"",
                            opponent:""
                        }
            msg.color="w"
            msg.opponent = this.player2.pseudo
            this.sendMessage(JSON.stringify(msg),this.player1.pseudo)
            msg.color="b"
            msg.opponent = this.player1.pseudo
            this.sendMessage(JSON.stringify(msg),this.player2.pseudo)
        }
    }

    getPseudo(indexPlayer : 1 | 2 ){
        if(indexPlayer === 1 ) return this.player1
        return this.player2
    }

    addPlayer(pseudo : string){
        this.player1.pseudo == null ? 
            this.player1 = {
                pseudo:pseudo,
                connected:true,
                wsClient:null
            } : 
            this.player2 = {
                pseudo:pseudo,
                connected:true,
                wsClient:null
            }
    }

    receptionMessage(data:string){
        const dataJson:messageReceivedWs = JSON.parse(data)
        this.sendAllMessage(JSON.stringify(dataJson))
        console.log("Room "+this.roomId+" PGN board "+dataJson.boardIndex+" :")
        console.log(dataJson );
        console.log()
        if(dataJson.event==="move"){
            this.boardStates[dataJson.boardIndex] = dataJson.FENState
            this.addMoveToPGN(dataJson.move,dataJson.boardIndex)
        }
        else if(dataJson.event ==="result"){
            this.gameOver(dataJson.boardIndex,dataJson.result)
        }
    }

    addMoveToPGN(move:string,indexBoard:0|1){
        let moveFormatted = ""
        console.log(this.PGNGames)
        console.log(indexBoard)
        if(move[0]==="w"){
            const turn = Math.floor(this.PGNGames[indexBoard].split(" ").length/2)+1
            moveFormatted+=turn+"."
        }
        moveFormatted += move.substring(1)
        this.PGNGames[indexBoard] =this.PGNGames[indexBoard] +" " +moveFormatted
        if(this.chessRoomInfo){
            updatePGNBoard(indexBoard==0 ? this.chessRoomInfo.firstBoardId : this.chessRoomInfo.secondBoardId,this.PGNGames[indexBoard])
        }
        console.log("Room "+this.roomId+" PGN board "+indexBoard+" :")
        console.log(this.PGNGames[indexBoard] );
        console.log()
    }

    sendAllMessage(data:string){
        this.sendMessage(data,this.player1.pseudo)
        this.sendMessage(data,this.player2.pseudo)
    }

    sendMessage(data:string,pseudoClient:string|null){
        if(!pseudoClient) console.error("Room "+this.roomId+" player not found to send message")
        if(this.player1.pseudo===pseudoClient){
            this.player1.wsClient?.send(data)
        }
        if(this.player2.pseudo===pseudoClient){// rajouter else pour unificication joueur
            this.player2.wsClient?.send(data)
        }
    }

    gameOver(boardIndex:0|1,result:'white'|'draw'|'black'){
        if(this.chessRoomInfo){
            if(boardIndex===0){
                updateResultBoard(this.chessRoomInfo.firstBoardId,result)
            }
            else{
                updateResultBoard(this.chessRoomInfo.secondBoardId,result)
            }
        }
        else{
            console.error("room : " + this.roomId+" chessRoomInfo not found");
            
        }
    }

    getRoomId(){
        return this.roomId
    }

    isFree(){
        return this.player2.pseudo === null || this.player1.pseudo === null 
    }

    isEmpty(){
        return !this.player1.connected && !this.player2.connected
    }

    getBoardsStates(){
        return this.boardStates
    }

    disconnect(pseudo:string){
        if(this.player1.pseudo===pseudo) this.player1.connected = false
        if(this.player2.pseudo===pseudo) this.player2.connected = false
    }
}

export {chessRoom};