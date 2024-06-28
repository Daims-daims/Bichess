import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";


const User = databaseConnection.define("user", {
    pseudo: {type:DataTypes.TEXT},
    mail: {
        type: DataTypes.TEXT,
        },
    elo:{ 
        type:DataTypes.INTEGER,
        defaultValue:1200
    },
    password:DataTypes.TEXT,
    tokenId:DataTypes.UUID,
    tokenValidity:DataTypes.UUID
});


export default User

