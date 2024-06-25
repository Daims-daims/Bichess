import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";

const chessRoomModel = databaseConnection.define("chessRoom", {
    roomId:{
        type:DataTypes.TEXT,
        primaryKey:true
    },
    onInviteOnly: DataTypes.BOOLEAN
});



export default chessRoomModel
