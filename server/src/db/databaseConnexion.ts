import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import User from "../models/user.model";
import { DatabaseError } from "sequelize";

const databaseConnection = new Sequelize(config.URL)


export default databaseConnection