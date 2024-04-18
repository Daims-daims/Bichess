import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";


const User = databaseConnection.define("Users", {
    pseudo: DataTypes.TEXT,
    mail: {
        type: DataTypes.TEXT,
        },
    elo:{ 
        type:DataTypes.INTEGER,
        defaultValue:1200
    },
    password:DataTypes.TEXT
});


export default User
