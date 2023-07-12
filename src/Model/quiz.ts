import mongoose, { Document, Model, Schema } from "mongoose";
import { IEmployee } from "./employee-user";

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
  employee: mongoose.Types.ObjectId | IEmployee;
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
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
