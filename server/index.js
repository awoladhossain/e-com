import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./src/db/db.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
ConnectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
