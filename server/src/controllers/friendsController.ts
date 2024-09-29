import { Model, Op } from "sequelize"
import chessBoard from "../models/chessBoard.model"
import chessRoomModel from "../models/chessRoom.model"
import User from "../models/user.model"
import { getResultRoom } from "./chessRoomController"
import { chessRoomHistoryInterface, friendInterface, gameResult } from "../utils/type"
import { error } from "console"

export async function formatFriend(friend:Model<any,any>,currentUserId:number):Promise<friendInterface>{
    const userIsReceiver = friend.getDataValue("Receiver").getDataValue("id") === currentUserId
    const userFriend =  userIsReceiver ?  friend.getDataValue("Sender") : friend.getDataValue("Receiver")
    return chessRoomModel.findAll({
        where:{
            [Op.and]:[
                {[Op.or]: [
                            { whitePiecesId: currentUserId },
                            { whitePiecesId: userFriend.getDataValue("id") }
                        ],
                    },
                {[Op.or]: [
                            { blackPiecesId: currentUserId },
                            { blackPiecesId: userFriend.getDataValue("id") }
                        ],
                    }
            ]
        },
        include: [
            { model: chessBoard, as: 'firstBoard', attributes: ['result'] },
            { model: chessBoard, as: 'secondBoard', attributes: ['result'] },
            { model: User, as: 'whitePieces', attributes: ['pseudo'] },
            { model: User, as: 'blackPieces', attributes: ['pseudo'] }]
    }).then(gamePlayed=>{
        return {
            id:userFriend.getDataValue("id"),
            accepted : friend.getDataValue("accepted"),
            pending : friend.getDataValue("pending"),
            pseudo : friend.getDataValue("Receiver").getDataValue("id") === currentUserId ?  friend.getDataValue("Sender").getDataValue("pseudo") : friend.getDataValue("Receiver").getDataValue("pseudo"),
            numberGame : gamePlayed.length,
            score : gamePlayed.reduce((prev,cur)=>prev+getResultRoom(cur).result,0),
            isReceiver : userIsReceiver
        }
    })
}

export async function getHistoryFriendFromId(userId:number,idFriend:number){
    return chessRoomModel.findAll({
        where:{
            [Op.and]:[
                {[Op.or]: [
                            { whitePiecesId: userId },
                            { whitePiecesId: idFriend}
                        ],
                    },
                {[Op.or]: [
                            { blackPiecesId: userId },
                            { blackPiecesId: idFriend }
                        ],
                    }
            ]
        },
        include: [
            { model: chessBoard, as: 'firstBoard', attributes: ['result'] },
            { model: chessBoard, as: 'secondBoard', attributes: ['result'] },
            { model: User, as: 'whitePieces', attributes: ['pseudo'] },
            { model: User, as: 'blackPieces', attributes: ['pseudo'] }]
  
    }).then(listRooms=>{
        if(!listRooms)
            return []
        else{
            return listRooms.map(formatRoom)
        }
    })
}


function formatRoom(room:Model<any,any>):chessRoomHistoryInterface{
    return{
        gameRoomId:room.getDataValue("roomId"),
        whitePieceId:room.getDataValue("whitePiecesId"),
        blackPieceId:room.getDataValue("whitePiecesId"),
        firstBoardResult:convertResultGame(room.getDataValue("firstBoard").getDataValue("result")),
        secondBoardResult:convertResultGame(room.getDataValue("secondBoard").getDataValue("result")),
        dateGame:room.getDataValue('createdAt'),
    }
}

function convertResultGame(result:"white"|"draw"|"black"):gameResult{
    console.log(result)
    if(result ==="white")
        return gameResult.White
    if(result ==="draw")
        return gameResult.Draw
    if(result ==="black")
        return gameResult.Black

    throw new Error("game Result not found");
    
}