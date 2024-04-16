import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";


const User = databaseConnection.define("Users", {
    pseudo: DataTypes.TEXT,
    mail: {
        type: DataTypes.TEXT,
        },
    elo: DataTypes.INTEGER
});


export default User

