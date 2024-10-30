import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize('dbConnection',{logging: false});

export default sequelizeConnection;
