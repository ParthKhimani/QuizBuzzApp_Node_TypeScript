import Employee from "../Model/employee-user";
import { Request, Response } from "express";
import { IQuiz } from "../Model/quiz";

export const getQuiz = async (req: Request, res: Response) => {
  const { employee } = req.body;
  const result = await Employee.findOne({ emailId: employee })
    .populate("quizes.quiz")
    .populate("technology");
  res.status(200).json({ quiz: result });
};

export const getQuizData = async (req: Request, res: Response) => {
  const { index, employee } = req.body;
  const result = await Employee.findOne({ emailId: employee }).populate({
    path: "quizes.quiz",
    select: "-questions.answer",
  });
  const quiz = result?.quizes[index - 1].quiz;
  res.status(200).json({ quiz: quiz });
};

export const addScore = async (req: Request, res: Response) => {
  const { employee, answers, quizIndex } = req.body;
  let countFalse = 0;
  let updatedScore = 0;
  const result = await Employee.findOne({ emailId: employee }).populate(
    "quizes.quiz"
  );
  const quiz = result!.quizes[quizIndex - 1].quiz as IQuiz;
  for (let i = 0; i < quiz.questions.length; i++) {
    if (Number(quiz.questions[i].answer) !== Number(answers[i].answer)) {
      countFalse += 1;
    }
  }
  updatedScore = result!.quizes[quizIndex - 1].score - countFalse;
  const filter = { emailId: employee };
  const update = {
    $set: {
      [`quizes.${quizIndex - 1}.scoreGained`]: updatedScore,
      [`quizes.${quizIndex - 1}.attempted`]: true,
    },
  };
  await Employee.findOneAndUpdate(filter, update, {
    new: true,
  });
};
