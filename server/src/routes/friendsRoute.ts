
const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import Friend from '../models/friends.model';
import { Model, Op } from 'sequelize';
import User from '../models/user.model';
import chessRoomModel from '../models/chessRoom.model';
import chessBoard from '../models/chessBoard.model';
import { getResultRoom } from '../controllers/chessRoomController';

interface friendInterface{
    pseudo : string,
    numberGame : number,
    score : number,
    pending : boolean,
    accepted:boolean,
    isReceiver:boolean
}

router.get("/friends",[authMiddleware,async (req:Request,res:Response)=>{

    const userId = res.locals.userId
    Friend.findAll({
        where: {
          [Op.or]: [
            { requestSenderId: userId },
            { requestReceiverId: userId }
          ]
        },
        attributes: ['accepted', 'pending'],
        include: [
          {
            model: User,
            as: 'Sender',
            attributes: ['id','pseudo']
          },
          {
            model: User,
            as: 'Receiver',
            attributes: ['id','pseudo']
          },
        ],
        limit: 20
      }).then(async friends => {
        const response = await Promise.all(friends.map(async l=> formatFriend(l,userId)))
        res.status(200).send(JSON.stringify(response))
        // res.status(200).send("test")
        // console.log(friends[0]);
        // console.log(friends.length)
      }).catch(error => {
        console.error('Error fetching friends:', error);
      });
}])


async function formatFriend(friend:Model<any,any>,currentUserId:number):Promise<friendInterface>{
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
            accepted : friend.getDataValue("accepted"),
            pending : friend.getDataValue("pending"),
            pseudo : friend.getDataValue("Receiver").getDataValue("id") === currentUserId ?  friend.getDataValue("Sender").getDataValue("pseudo") : friend.getDataValue("Receiver").getDataValue("pseudo"),
            numberGame : gamePlayed.length,
            score : gamePlayed.reduce((prev,cur)=>prev+getResultRoom(cur).result,0),
            isReceiver : userIsReceiver
        }
    })
}


export default router