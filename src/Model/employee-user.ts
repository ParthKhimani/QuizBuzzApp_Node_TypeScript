import mongoose, { Document, Schema, Types } from "mongoose";
import { ITechnology } from "./technology";
import { IQuiz } from "./quiz";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  technology: mongoose.Types.ObjectId | ITechnology;
  quizes: Array<{
    quiz: mongoose.Types.ObjectId | IQuiz;
    answers?: Array<{ index: number; answer: number }>;
    score: number;
    scoreGained?: number;
    attempted?: boolean;
  }>;
}

const employeeSchema = new Schema<IEmployee>({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
  technology: {
    type: Schema.Types.ObjectId,
    ref: "Technology",
  },
  quizes: [
    {
      quiz: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
      answers: [
        {
          index: Number,
          answer: Number,
        },
      ],
      score: Number,
      scoreGained: Number,
      attempted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
