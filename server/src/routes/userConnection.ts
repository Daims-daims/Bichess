import User from "../models/user.model"

const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';


router.post("/login",(req:Request,res:Response)=>{
    const {pseudo,password} = req.body 
    User.findAll({
      where:{
        pseudo:pseudo
      }
    }).then(userQuery=>{if(userQuery.length===0){
      res.status(401).send("pseudo")
    }else if(userQuery[0].dataValues.password !== password ){
      res.status(401).send("password")
    }else{
      res.status(200).send("ok")
    }
  })
})

router.post("/signup",(req:Request,res:Response)=>{
  console.log("pzdkfnzopifn")
  console.log(req.body)
  const {pseudo,password} = req.body 
  User.findAll({
      where:{
      pseudo:pseudo
      }
  }).then(existingUsers =>{
      if(existingUsers.length>0){
      res.status(409)
      res.send("userAlreadyExists")
      }
      else{
      User.create({
          pseudo:pseudo,
          password:password
      })
      res.status(200)
      res.send(pseudo)
      }
  })
})
export default router