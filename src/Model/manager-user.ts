import mongoose, { Document, Schema } from "mongoose";
import { ITechnology } from "./technology";

export interface IManager extends Document {
  emailId: string;
  password: string;
  technology: mongoose.Types.ObjectId | ITechnology;
}

const managerSchema: Schema = new Schema({
  emailId: String,
  password: String,
  technology: {
    type: Schema.Types.ObjectId,
    ref: "Technology",
  },
});

const Manager = mongoose.model<IManager>("Manager", managerSchema);

export default Manager;
