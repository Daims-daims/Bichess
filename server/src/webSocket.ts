/*
import { WebSocket, WebSocketServer } from "ws"

module.exports = function(wss:WebSocketServer){

    const l_ws = new Map<string,[string,WebSocket][]>()

    /// Représente l'ensemble des web socket sur le port 8082,
    /// La clé représente le nom du chat et est unique -> par la suite utiliser l'id
    /// La valeur représente une liste de couple : (pseudo,socket)

    wss.on("connection",(ws:WebSocket,req:Request)=>{
        const gameId = req.url.split("/")[1]
        const pseudo = req.url.split("/")[2]

        if(l_ws.has(gameId)) l_ws.set(gameId,[...l_ws.get(gameId)!,[pseudo,ws]])
        else  l_ws.set(gameId,[[pseudo,ws]])
        console.log("nouvelleCo")
        ws.on("message",(data:string)=>{
            console.log(pseudo +" : " + data)
            if(! l_ws || ! l_ws.get(gameId)) throw new Error("Chat introuvable "+ gameId);
            l_ws.get(gameId)!.forEach((value,key)=>{
                console.log(gameId,value[0])
                value[1].send(pseudo + ":" + data) // value[1] == session
            })
        })

        ws.on("close",()=>{
            if(l_ws.has(gameId)) l_ws.set(gameId,l_ws.get(gameId)!.filter(elem=>elem[0]!==pseudo))
            if(l_ws.has(gameId) && l_ws.get(gameId)!.length>0) l_ws.get(gameId)!.forEach((value,key) => value[1].send("Déconnection de "+pseudo))
            else l_ws.delete(gameId)
        });

        ws.send("Connection réussie")
    })
}*/