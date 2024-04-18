import express, { Request, Response } from "express";
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

// import { WebSocket } from "ws";
import User from "./models/user.model";
import chessRoom from "./models/chessRoom.model";
import chessBoard from "./models/chessBoard.model";
import databaseConnection from "./db/databaseConnexion";


import "./models/association.model"
import { gameRoomWebSocketHandler } from "./Services/webSocketList";
import { json } from "sequelize";
import syncAll from "./models/syncAll";
import { emit } from "process";


const bodyParser = require('body-parser')
 

const wssList = new gameRoomWebSocketHandler(8082)

// sync change to model 
syncAll()


/// Représente l'ensemble des web socket sur le port 8082,
/// La clé représente le nom du chat et est unique -> par la suite utiliser l'id
/// La valeur représente une liste de couple : (pseudo,socket)


const app = express();
const port = 3030;


app.use(cors({ origin: "http://localhost:5173" }))



app.use(express.static(path.join(__dirname, '../../client/dist')))
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (_:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});


app.get("/room/:pseudo",(req:Request,res:Response)=>{
  const {pseudo} = req.params
  console.log(pseudo)
  const {color,roomId} = wssList.requestRoom(pseudo)
  res.status(200).json({
  color:color,
  idGames : roomId     
  })}
)

app.post("/login",(req:Request,res)=>{
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

app.post("/signup",(req:Request,res)=>{
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export {wssList,app}
