import { chessRoom } from "../Services/chessRoom";
import chessBoard from "./chessBoard.model";
import chessRoomModel from "./chessRoom.model";
import User from "./user.model";

const syncAll = async ()=>{
    chessRoomModel.sync({ alter: true,logging:false  })
    chessBoard.sync({  alter: true,logging:false  })
    User.sync({  alter: true,logging:false })
}


export default syncAll;