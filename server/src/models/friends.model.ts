import { DataTypes } from "sequelize";
import databaseConnection  from "../db/databaseConnexion";
import User from "./user.model";

const Friend = databaseConnection.define('friends', {
    requestSenderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'Movies' would also work
        key: 'id',
      },
      primaryKey:true
    },
    requestReceiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'Actors' would also work
        key: 'id',
      },
      primaryKey:true
    },
    pending: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
  });

export default Friend