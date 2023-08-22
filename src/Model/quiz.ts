import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { IEmployee } from "./employee-user";
import { ITechnology } from "./technology";

interface Option {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
  answer: string;
}

export interface IQuiz extends Document {
  questions: Question[];
  employees: mongoose.Types.ObjectId[] | Types.Array<IEmployee>;
  technology: mongoose.Types.ObjectId | ITechnology;
}

const quizSchema = new Schema<IQuiz>({
  questions: [
    {
      id: String,
      question: String,
      options: [
        {
          id: String,
          value: String,
        },
      ],
      answer: String,
    },
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  technology: {
    type: Schema.Types.ObjectId,
    ref: "Technology",
  },
});

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
