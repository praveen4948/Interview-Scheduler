import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import routes from "./Routes/requests.js";
import cors from "cors";
import "./Schema/User.js";
import "./Schema/Interview.js";
import connectDB from "./connectDB.js";
import dotenv from "dotenv";
dotenv.config();
// connectDB();
mongoose
  .connect("URI OVER HERE", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(err);
  });
// console.log(mongoose.find)
// import "./Schema/Interview.js";
const app = express();
app.use(cors());
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());
app.use("/", routes);
// app.get("/", (req, res) => {
//   console.log("Yayy you made a move ");
// });
app.listen(5000, () => {
  console.log("Server is Running at port 5000.");
});
