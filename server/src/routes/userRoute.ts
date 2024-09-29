const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import User from '../models/user.model';
import { Model, Op } from 'sequelize';
import { userInterface } from '../utils/type';
import chessRoomModel from '../models/chessRoom.model';
import chessBoard from '../models/chessBoard.model';



router.get("/searchUser/:pseudoSearch",[authMiddleware,async (req:Request,res:Response)=>{
    const pseudoSearch = req.params.pseudoSearch
    let response:userInterface[] = []

    User.findAll({
        where:{
            [Op.and]:[{
            pseudo:{
                [Op.like] : '%'+pseudoSearch+'%'
            }},{
            [Op.not]:[{pseudo:res.locals.pseudo}]
        }        
        ]
        },
        // include:["pseudo"]
    }).then(
    l=>{
        response = l.map(formatUser)
        res.status(200).send(JSON.stringify(response))
    }
)
}])




// /searchUser/
function formatUser(user:Model<any,any>):userInterface{
    return {
        "id":user.getDataValue("id"),
        "pseudo":user.getDataValue("pseudo")
    }
}


export default router