import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";


const chessBoard = databaseConnection.define("chessBoard", {
    PGN: DataTypes.TEXT,
    result : DataTypes.ENUM('white', 'black', 'draw')
});

export default chessBoard