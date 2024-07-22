import express, { Request, Response } from "express";
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");

var cookies = require("cookie-parser");

dotenv.config();

import syncAll from "./models/syncAll";
import "./models/association.model"

import { gameRoomWebSocketHandler } from "./Services/webSocketList";

import userConnection from './routes/userConnection'
import gameRoute from "./routes/gameRoute";
import friendRoute from "./routes/friendsRoute";

const bodyParser = require('body-parser')

const wssList = new gameRoomWebSocketHandler(8082)

// sync change to model 


/// Représente l'ensemble des web socket sur le port 8082,
/// La clé représente le nom du chat et est unique -> par la suite utiliser l'id
/// La valeur représente une liste de couple : (pseudo,socket)


const app = express();
const port = 3030;


app.use(cors({ origin: "http://localhost:5173",
  credentials: true }))

app.use(cookies());


app.use(express.static(path.join(__dirname, '../../client/dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(userConnection)
app.use(gameRoute)
app.use(friendRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export {wssList,app}
