import { Sequelize } from "sequelize";
import "dotenv/config";

// -----------------------DB Connection-------------------------
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
