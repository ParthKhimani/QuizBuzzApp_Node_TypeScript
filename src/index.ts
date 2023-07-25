import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Router/router";
import { errorHandler } from "./exceptions/errorHandler";
import "dotenv/config";

const app = express();
const PASSWORD = process.env.MONGODB_PASSWORD;
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

mongoose.connect(
  `mongodb+srv://parth:${PASSWORD}@cluster0.eixcpta.mongodb.net/quiz?retryWrites=true&w=majority`
);
app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
