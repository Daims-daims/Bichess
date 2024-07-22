

import { Request, Response, NextFunction } from 'express';
import { retrieveSession } from '../Services/userLogin';

const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    const response={message:";n,"}

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
          res.locals.userId = sessionInfo.user?.getDataValue("id");  
          next()
        }
        else{
          response.message = sessionInfo.message
          res.status(sessionInfo.status).send(JSON.stringify(response))
        }
      })
}

export default authMiddleware;