import { User } from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { Op } from "sequelize";

// -----------------------register-------------------------
export const register = async (req, res) => {
  try {
    //User register info
    const reqBody = {
      email: req.body.email,
      username: req.body.username,
    };

    //Check existing email and username in DB if exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: reqBody.email }, { username: reqBody.username }],
      },
    });

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email or username already exists" });
    }

    //Hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //Sequelize - DB create
    await User.create({
      username: reqBody.username,
      email: reqBody.email,
      password: hashedPassword,
    });

    //Status sent
    return res.status(200).json({
      message: "User is registered",
      regUser: { email: reqBody.email, username: reqBody.username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// -----------------------login-------------------------
export const login = async (req, res) => {
  try {
    //User log
    const reqBody = {
      email: req.body.email,
      username: req.body.username,
    };

    //Sequelize - DB find email from DB based on reqBody.email
    const selectDb = await User.findOne({ where: { email: reqBody.email } });
    const dataFromDb = selectDb.dataValues;
    //Create obj only for username, email and password
    const userDb = {
      email: dataFromDb.email,
      username: dataFromDb.username,
    };

    //Bcrypt - Compare hashedPassword
    const isPasswordTrue = bcrypt.compareSync(
      req.body.password,
      dataFromDb.password
    );

    //Compare email, username, password reqBody with userDb
    if (_.isEqual(reqBody, userDb) && isPasswordTrue) {
      //Status sent if OK
      return res.status(200).json({
        message: "Login successful",
        regUser: { email: reqBody.email, username: reqBody.username },
      });
    } else {
      //Status sent if FAILED
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
