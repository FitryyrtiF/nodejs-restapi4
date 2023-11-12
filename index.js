import express from "express";
import apiRoutes from "./routes/index.js";
import "dotenv/config";
import { dbInit } from "./database/index.js";

const app = express();
const PORT = process.env.SERVER_PORT;

dbInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is RUNNING on port ${PORT}`);
});
