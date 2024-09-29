
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
import { formatFriend, getHistoryFriendFromId } from '../controllers/friendsController';
import { error } from 'console';


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

router.post("/friendsRequest",[authMiddleware,async (req:Request,res:Response)=>{
  const {idFriendRequest,isRequestAccepted} = req.body 
  const userId = res.locals.userId

  Friend.findAll({
    where:{
      requestSenderId : idFriendRequest,
      requestReceiverId : userId
    }
  }).then(friendRequest=>{

    if(!friendRequest || friendRequest.length!==1)
        return res.status(400).send(JSON.stringify({"status":"error","message":"Demande d'ami non trouvée"}))

    if(!isRequestAccepted){
      friendRequest[0].destroy()
      return res.status(200).send(JSON.stringify({"status":"ok"}))
    }
    else{
      friendRequest[0].update({
        pending:false,
        accepted:true
      })
      return res.status(200).send(JSON.stringify({"status":"ok"}))
    }
  }).catch(err=>{
    res.status(400).send(JSON.stringify({"status":"error","message":"Erreur lors du calcul de la demande"}))
    throw new Error("Erreur Requete Ami : "+err)
  })



}])

router.post("/sendFriendRequest",[authMiddleware,async (req:Request,res:Response)=>{
  const {idFriendRequest} = req.body 
  const userId = res.locals.userId

  Friend.findAll({
    where:{
      [Op.and]:[
        {[Op.or]: [
          { requestSenderId: idFriendRequest },
          { requestSenderId: userId }
        ]},
        {[Op.or]: [
          { requestReceiverId: idFriendRequest },
          { requestReceiverId: userId }
        ]}
    ]}
  }).then(friendRequest=>{

    if(friendRequest && friendRequest.length>0)
        return res.status(400).send(JSON.stringify({"status":"error","message":"Demande d'ami déjà existante"}))
    
    else{
      Friend.create({
        requestSenderId:userId,
        requestReceiverId:idFriendRequest,
        pending:true,
        accepted:false
      }).then(_=>
        res.status(200).send(JSON.stringify({"status":"ok","message":"Demande d'ami créée"}))
      ).catch(err=>{
        res.status(400).send(JSON.stringify({"status":"error","message":"Erreur lors de la création de la demande d'ami"}))
        throw new Error("Erreur Requete Ami : "+err)
      })
    }
  }).catch(err=>{
    res.status(400).send(JSON.stringify({"status":"error","message":"Erreur lors de la vérification de la demande"}))
    throw new Error("Erreur Requete Ami : "+err)
  })

}])


router.get("/historyUser/:idSearch",[authMiddleware,async (req:Request,res:Response)=>{
  const idSearch = req.params.idSearch
  const userId = res.locals.userId
  
  getHistoryFriendFromId(userId,parseInt(idSearch))
    .then(listRoomsFormatted=>{
      res.status(200).send(JSON.stringify(listRoomsFormatted))
    })
    .catch(err=>{
      throw new Error("Error retrieving history for : " + userId + " with user : "+idSearch+"\nMessage : "+err)
    })

  

}])

export default router