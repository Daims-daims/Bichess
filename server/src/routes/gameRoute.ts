import { createRoom } from "../controllers/chessRoomController";
import { app ,wssList} from "../index"

const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';
import generateId from "../Services/generateId";

// find or create a room and send id + first board color 
router.get("/room/:pseudo",(req:Request,res:Response)=>{
    const {pseudo} = req.params
    
    const {color,roomId} = wssList.requestRoom(pseudo)

    res.status(200).json({
    color:color,
    idGames : roomId     
    })}
)

router.get("/testCreateRoom",(req:Request,res:Response)=>{ 
    const id  = generateId()
    console.log("creation room : "+id)
    createRoom(id,"oui","non").then(l=>res.status(200).send(l))
})

export default router