import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Router/router";
import { errorHandler } from "./exceptions/errorHandler";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

mongoose.connect(
  `mongodb+srv://parth:${process.env.MONGODB_PASSWORD}@cluster0.eixcpta.mongodb.net/quiz?retryWrites=true&w=majority`
);
app.listen(process.env.PORT, () => {
  console.log(`server started at port: ${process.env.PORT}`);
});

export default app;
