import chessRoomModel from "../models/chessRoom.model";
import chessBoard from "../models/chessBoard.model";
import { Model } from "sequelize";
import User from "../models/user.model";


interface boardResult {
    result: 'white' | 'draw' | 'black'
}

const mapResultToScore = {
    'white': 1,
    'draw': 0.5,
    'black': 0
}


const createRoom = async function (roomId: string, whitePiecePseudo: string, blackPiecePseudo: string) {

    const whitePiece = await User.findAll({
        where:
            { pseudo: whitePiecePseudo }
    })
    const blackPiece = await User.findAll({
        where:
            { pseudo: blackPiecePseudo }
    })
    const firstBoard = await chessBoard.create({
        PGN: '',
    })
    const secondBoard = await chessBoard.create({
        PGN: '',
    })

    const chessRoom = await chessRoomModel.create({
        roomId: roomId,
        whitePiecesId: whitePiece[0].getDataValue('id'),
        blackPiecesId: blackPiece[0].getDataValue('id'),
        firstBoardId: firstBoard.getDataValue('id'),
        secondBoardId: secondBoard.getDataValue('id')
    })
    return chessRoom.toJSON()
    return "chessRoom"
}


const getRoom = async function (roomId: string) {
    return await chessRoomModel.findByPk(roomId,
        {
            include: [
                { model: chessBoard, as: 'firstBoard', attributes: ['id', 'result'] },
                { model: chessBoard, as: 'secondBoard', attributes: ['id', 'result'] },
                { model: User, as: 'whitePieces', attributes: ['id', 'pseudo'] },
                { model: User, as: 'blackPieces', attributes: ['id', 'pseudo'] }]
        })
}

const updatePGNBoard = async function (roomId: string, board: 1 | 2, PGN: string) {

}

const getResultRoom =  function (room: Model<any,any>,user?:number) {

    const firstBoardResult: boardResult = room.getDataValue("firstBoard")
    const secondBoardResult: boardResult = room.getDataValue("secondBoard")

    let rawResult = (mapResultToScore[firstBoardResult.result] + mapResultToScore[secondBoardResult.result]) / 2
    if(rawResult!==0.5)
       rawResult = Math.round(rawResult)

    return { room: room.getDataValue("id"), result: user && user === room.getDataValue("blackPieces").getDataValue("id") ? 1 - rawResult : rawResult  }

}



export { createRoom, getRoom, getResultRoom }
