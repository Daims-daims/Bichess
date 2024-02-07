import { app ,wssList} from ".."
import { Request,Response } from "express"
import { roomRequest } from "../controllers/gameController"


app.post("/room",(_:Request,res:Response)=>{
    const {pseudo,color,roomId} = wssList.requestRoom()

    res.status(200).json({
    pseudo:pseudo,
    color:color,
    idGames : roomId     
    })}
)
  
  app.get("/room",(_:Request, res:Response) => {
  })