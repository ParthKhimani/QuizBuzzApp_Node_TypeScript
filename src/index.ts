import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Router/router";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

mongoose.connect(
  "mongodb+srv://parth:P%40rth2005@cluster0.eixcpta.mongodb.net/quiz?retryWrites=true&w=majority"
);
app.listen(3333, () => {
  console.log("connected!");
});
