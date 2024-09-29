import { createRoom } from "../controllers/chessRoomController";
import { app ,wssList} from "../index"

const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';
import generateId from "../Services/generateId";
import { error } from "console";

// find or create a room and send id + first board color 
router.get("/room/:pseudo",(req:Request,res:Response)=>{
    console.log("room")
    const {pseudo} = req.params
    wssList.requestRoom(pseudo)
    .then(({color,roomId})=>{
        res.status(200).json({
            color:color,
            idGames : roomId     
            })
    }).catch(error=>console.log(error))
    }
)

router.post("/room/:pseudo",(req:Request,res:Response)=>{
    console.log("room")
    const {pseudo} = req.params
    const {userInvited} = req.body 
    wssList.createInviteRoom(pseudo,userInvited) // ajouter plus tard notif au joueur
    .then(({color,roomId})=>{
        res.status(200).json({
            color:color,
            idGames : roomId     
            })
    }).catch(error=>console.log(error))
    }
)

router.get("/testCreateRoom",(req:Request,res:Response)=>{ 
    const id  = generateId()
    console.log("creation room : "+id)
    createRoom(id,"oui","non").then(l=>res.status(200).send(l))
})

export default router