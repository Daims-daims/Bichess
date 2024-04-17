import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";

const chessRoomModel = databaseConnection.define("chessRoom", {
    onInviteOnly: DataTypes.BOOLEAN
});



export default chessRoomModel
