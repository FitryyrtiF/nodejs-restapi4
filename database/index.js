import { User } from "../models/usersModel.js";
import { sequelize } from "./connection.js";

// -----------------------DBinit-------------------------
export const dbInit = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection SUCCESSFUL");
    await User.sync();
  } catch (error) {
    console.error("DB connection FAILED", error);
    process.exit(1);
  }
};
