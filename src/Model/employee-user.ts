import mongoose, { Document, Schema, Types } from "mongoose";
import { ITechnology } from "./technology";
import { IQuiz } from "./quiz";

export interface IEmployee extends Document {
  emailId: string;
  password: string;
  technology: mongoose.Types.ObjectId | ITechnology;
  quizes: mongoose.Types.ObjectId[] | Types.Array<IQuiz>;
}

const employeeSchema = new Schema<IEmployee>({
  emailId: String,
  password: String,
  technology: {
    type: Schema.Types.ObjectId,
    ref: "Technology",
  },
  quizes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
