import mongoose, { Document, Schema } from "mongoose";
import { ITechnology } from "./technology";

export interface IEmployee extends Document {
  emailId: string;
  password: string;
  technology: mongoose.Types.ObjectId | ITechnology;
}

const employeeSchema: Schema = new Schema({
  emailId: String,
  password: String,
  technology: {
    type: Schema.Types.ObjectId,
    ref: "Technology",
  },
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
