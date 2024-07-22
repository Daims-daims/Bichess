import { UUID, UUIDV4 } from "sequelize";
import User from "../models/user.model"
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';
import { addDaysToDate } from "../utils/date";
import sequelize from "sequelize/types/sequelize";
import { generateSession, retrieveSession } from "../Services/userLogin";


interface responseAccount{
  message?:string,
  status : "authenticated" | "guest",
  pseudo? : string
}


router.post("/login",(req:Request,res:Response)=>{
    const {pseudo,password} = req.body 

    console.log("login connexion : "+pseudo + "--"+password)

    const response:responseAccount={
      status:"guest"
    }
  
    User.findAll({
      where:{
        pseudo:pseudo
      } 
    }).then(userQuery=>{if(userQuery.length===0){
            response.message = "pseudo not found"
            res.status(401).send(JSON.stringify(response))
          }else if(userQuery[0].dataValues.password !== password ){
            response.message = "Credentials unmatched"
            res.status(401).send(JSON.stringify(response))
          }else{
            const user = userQuery[0]
            const sessionId = generateSession()
            
            user.update({tokenId:sessionId.tokenId,tokenValidity:sessionId.endDate}).then(()=>{
              console.log("token created : "+sessionId.tokenId+"\nUntil : "+sessionId.endDate)
              res.cookie("session_token", sessionId.tokenId, { expires: sessionId.endDate })
              response.pseudo = pseudo 
              response.status = "authenticated"
              res.status(200).send(JSON.stringify(response))
              })
              .catch(()=> res.status(401).send())
          }
  })
})


router.get("/me",(req:Request,res:Response)=>{

  console.log("tentative /me ")
  console.log(req.cookies)
  console.log(req.cookies['session_token'])
  
  const response:responseAccount={
        status:"guest"
      }
  
  if (!req.cookies) {
    response.message ='no Cookies found'
    res.status(401).send(JSON.stringify(response))
    return
  } 

  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
    // If the cookie is not set, return an unauthorized status
    response.message ="no session token found"
    res.status(401).send(JSON.stringify(response))
    return
  }

  retrieveSession(sessionToken).then(sessionInfo=>{
    if(sessionInfo.status===200){
      response.status="authenticated"
      response.pseudo= sessionInfo.user?.getDataValue("pseudo")
    }
    else{
      response.message = sessionInfo.message
    }
    res.status(sessionInfo.status).send(JSON.stringify(response))
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

router.delete("/logout",(req:Request,res:Response)=>{

  console.log("tentative /logout ")
  
  const response:responseAccount={
        status:"guest"
      }

  res.clearCookie("session_token")
  
  res.status(200).send(JSON.stringify(response))
})

export default router