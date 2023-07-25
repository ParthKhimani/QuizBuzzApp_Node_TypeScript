"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScore = exports.getQuizData = exports.getQuiz = void 0;
const employee_user_1 = __importDefault(require("../Model/employee-user"));
const getQuiz = (req, res) => {
    try {
        const { employee } = req.body;
        employee_user_1.default.findOne({ emailId: employee })
            .populate("quizes.quiz")
            .populate("technology")
            .then((result) => {
            res.status(200).json({ quiz: result });
        });
    }
    catch (_a) {
        throw new Error();
    }
};
exports.getQuiz = getQuiz;
const getQuizData = (req, res) => {
    try {
        const { index, employee } = req.body;
        employee_user_1.default.findOne({ emailId: employee })
            .populate({ path: "quizes.quiz", select: "-questions.answer" })
            .then((result) => {
            const quiz = result === null || result === void 0 ? void 0 : result.quizes[index - 1].quiz;
            res.status(200).json({ quiz: quiz });
        });
    }
    catch (_a) {
        throw new Error();
    }
};
exports.getQuizData = getQuizData;
const addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employee, answers, quizIndex } = req.body;
        let countFalse = 0;
        let updatedScore = 0;
        const result = yield employee_user_1.default.findOne({ emailId: employee }).populate("quizes.quiz");
        const quiz = result.quizes[quizIndex - 1].quiz;
        for (let i = 0; i < quiz.questions.length; i++) {
            if (Number(quiz.questions[i].answer) !== Number(answers[i].answer)) {
                countFalse += 1;
            }
        }
        updatedScore = result.quizes[quizIndex - 1].score - countFalse;
        const filter = { emailId: employee };
        const update = {
            $set: {
                [`quizes.${quizIndex - 1}.scoreGained`]: updatedScore,
                [`quizes.${quizIndex - 1}.attempted`]: true,
            },
        };
        yield employee_user_1.default.findOneAndUpdate(filter, update, {
            new: true,
        });
    }
    catch (_a) {
        throw new Error();
    }
});
exports.addScore = addScore;
