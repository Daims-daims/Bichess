import express, { Request, Response } from "express";
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

import { WebSocket } from "ws";

const x=5
const wss = new WebSocket.Server({port:8082})

const l_ws = new Map<string,[string,WebSocket][]>()

/// Représente l'ensemble des web socket sur le port 8082,
/// La clé représente le nom du chat et est unique -> par la suite utiliser l'id
/// La valeur représente une liste de couple : (pseudo,socket)

wss.on("connection",(ws:WebSocket,req:Request)=>{
    const gameId = req.url.split("/")[1]
    const pseudo = req.url.split("/")[2]


    if(l_ws.has(gameId)){
      console.log(pseudo)
      console.log(l_ws.get(gameId)?.filter(elem=>elem[0]===pseudo))
      console.log(l_ws.get(gameId)?.filter(elem=>elem[0]===pseudo).length)
      if( l_ws.get(gameId)?.filter(elem=>elem[0]===pseudo).length===0)l_ws.set(gameId,[...l_ws.get(gameId)!,[pseudo,ws]])
    } 
    else  l_ws.set(gameId,[[pseudo,ws]])
    console.log("nouvelleCo",pseudo)
    console.log(l_ws.get(gameId)?.map(l=>l[0]))
    console.log(l_ws.get(gameId)?.length)
    ws.on("message",(data:string)=>{
      if(! l_ws || ! l_ws.get(gameId)) throw new Error("Chat introuvable "+ gameId);
      l_ws.get(gameId)!.forEach((value,_)=>{
          if(value[0]!==pseudo) value[1].send(""+data) // value[1] == session
      })}
    )
    
    ws.on("close",()=>{
        if(l_ws.has(gameId)) l_ws.set(gameId,l_ws.get(gameId)!.filter(elem=>elem[0]!==pseudo))
        if(l_ws.has(gameId) && l_ws.get(gameId)!.length>0) l_ws.get(gameId)!.forEach((value,_) => value[1].send("Déconnection de "+pseudo))
        else l_ws.delete(gameId)
    });

})

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
  console.log("request")
  console.log(x)
  let id:string  = ""
  let pseudo : string | null = null
  for (let [key, value] of l_ws) {
    console.log(key,value)
    if(value.length===1){
      console.log(value)
      if(!pseudo){
          pseudo = value[0][0]
          console.log(pseudo)
          id = key
      }
      else if (pseudo === value[0][0]){
        console.log({
          pseudo:"azeaze",
          color:"b",
          idGames : [id,key]     
        })
        console.log([id,key] )
        res.status(200).json({
          pseudo:"azeaze",
          color:"b",
          idGames : [id,key]     
        })
        break
      }
    }
  }
  console.log("end",l_ws)
})
console.log(l_ws)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});