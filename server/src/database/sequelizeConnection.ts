import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize('mysql://root:asd123@localhost:3306/mydb');

export default sequelizeConnection;