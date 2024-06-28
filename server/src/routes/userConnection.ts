import { UUID, UUIDV4 } from "sequelize";
import User from "../models/user.model"
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';
import { addDaysToDate } from "../utils/date";
import sequelize from "sequelize/types/sequelize";
import { generateSession, retrieveSession } from "../Services/userLogin";


router.post("/login",(req:Request,res:Response)=>{
    const {pseudo,password} = req.body 

    console.log("login connexion : "+pseudo + "--"+password)
    User.findAll({
      where:{
        pseudo:pseudo
      } 
    }).then(userQuery=>{if(userQuery.length===0){
      res.status(401).send("pseudo")
    }else if(userQuery[0].dataValues.password !== password ){
      res.status(401).send("password")
    }else{
      const user = userQuery[0]
      const sessionId = generateSession()
      
      user.update({tokenId:sessionId.tokenId,tokenValidity:sessionId.endDate}).then(()=>{
        console.log("token created : "+sessionId.tokenId+"\nUntil : "+sessionId.endDate)
        res.cookie("session_token", sessionId.tokenId, { expires: sessionId.endDate })
        res.status(200).send("ok")
        })
        .catch(()=> res.status(401).send("update"))

      
    }
  })
})

router.get("/me",(req:Request,res:Response)=>{

  console.log("tentative /me ")
  
  if (!req.cookies) {
    res.status(401).send("no Cookies found")
    return
  } 

  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
    // If the cookie is not set, return an unauthorized status
    res.status(401).send("no session token found")
    return
  }

  retrieveSession(sessionToken).then(sessionInfo=>{
    if(sessionInfo.status===200){
      res.status(sessionInfo.status).send("Welcome amigo "+sessionInfo.user?.getDataValue("pseudo"))
    }
    else{
      res.status(sessionInfo.status).send(sessionInfo.message)
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