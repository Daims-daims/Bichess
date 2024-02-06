import express, { Request, Response } from "express";
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

import { WebSocket } from "ws";
import { gameRoomWebSocketHandler } from "./Services/webSocketList";

const x=5
const wssList = new gameRoomWebSocketHandler(8082)

const l_ws = new Map<string,[string,WebSocket][]>()

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

app.post("/room",(_:Request, res:Response) => {
  console.log("test")
  res.status(200).json({
    pseudo:"azerty",
    color:"w",
    idGames : [l_ws.size+1000,l_ws.size+1001]     
  })
})

app.get("/room",(_:Request, res:Response) => {
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});