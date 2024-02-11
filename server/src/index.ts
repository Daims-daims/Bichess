import express, { Request, Response } from "express";
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

import { WebSocket } from "ws";
import { gameRoomWebSocketHandler } from "./Services/webSocketList";

const x=5
const wssList = new gameRoomWebSocketHandler(8082)


/// Représente l'ensemble des web socket sur le port 8082,
/// La clé représente le nom du chat et est unique -> par la suite utiliser l'id
/// La valeur représente une liste de couple : (pseudo,socket)


const app = express();
const port = 3030;

app.use(cors({ origin: "http://localhost:5173" }))


app.use(express.static(path.join(__dirname, '../../client/dist')))

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export {wssList,app}