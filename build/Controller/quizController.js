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
exports.addScore = exports.getQuizDataWithAnswers = exports.getQuizData = exports.EmployeeDataToAssignQuiz = exports.AbandonQuiz = exports.AssignQuiz = exports.getQuizByTechnology = exports.getQuiz = void 0;
const employee_user_1 = __importDefault(require("../Model/employee-user"));
const quiz_1 = __importDefault(require("../Model/quiz"));
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employee } = req.body;
    const result = yield employee_user_1.default.findOne({ emailId: employee })
        .populate("quizes.quiz")
        .populate("technology");
    res.status(200).json({ quiz: result });
});
exports.getQuiz = getQuiz;
const getQuizByTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { technology } = req.body;
    const result = yield quiz_1.default.find({ technology: technology });
    res.status(200).json({ quiz: result });
});
exports.getQuizByTechnology = getQuizByTechnology;
const AssignQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { quiz, employee } = req.body;
    const result = yield quiz_1.default.findById(quiz)
        .populate("employees")
        .populate("technology");
    const existingEmployee = yield employee_user_1.default.findOne({ emailId: employee });
    existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.quizes.push({
        quiz: result === null || result === void 0 ? void 0 : result._id,
        score: (_a = result === null || result === void 0 ? void 0 : result.questions) === null || _a === void 0 ? void 0 : _a.length,
    });
    yield (existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.save());
    result === null || result === void 0 ? void 0 : result.employees.push(existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee._id);
    yield (result === null || result === void 0 ? void 0 : result.save());
    res.status(200).json({ quiz: result, status: "200" });
});
exports.AssignQuiz = AssignQuiz;
const AbandonQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quiz, employee } = req.body;
    const result = yield quiz_1.default.findById(quiz)
        .populate("employees")
        .populate("technology");
    const existingEmployee = yield employee_user_1.default.findOne({ emailId: employee });
    const quizIndex = existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.quizes.indexOf(result === null || result === void 0 ? void 0 : result._id);
    existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.quizes.splice(quizIndex, 1);
    yield (existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.save());
    const employeeIndex = result === null || result === void 0 ? void 0 : result.employees.indexOf(existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee._id);
    result === null || result === void 0 ? void 0 : result.employees.splice(employeeIndex, 1);
    yield (result === null || result === void 0 ? void 0 : result.save());
    res.status(200).json({ quiz: result, status: "200" });
});
exports.AbandonQuiz = AbandonQuiz;
const EmployeeDataToAssignQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employee } = req.body;
    const existingEmployee = yield employee_user_1.default.findOne({ emailId: employee });
    res.status(200).json({ employee: existingEmployee });
});
exports.EmployeeDataToAssignQuiz = EmployeeDataToAssignQuiz;
const getQuizData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { index, employee } = req.body;
    const result = yield employee_user_1.default.findOne({ emailId: employee }).populate({
        path: "quizes.quiz",
        select: "-questions.answer",
    });
    const quiz = (_b = result === null || result === void 0 ? void 0 : result.quizes[index - 1]) === null || _b === void 0 ? void 0 : _b.quiz;
    res.status(200).json({ quiz: quiz });
});
exports.getQuizData = getQuizData;
const getQuizDataWithAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const { index, employee } = req.body;
    const result = yield employee_user_1.default.findOne({ emailId: employee }).populate({
        path: "quizes.quiz",
    });
    const quiz = (_c = result === null || result === void 0 ? void 0 : result.quizes[index - 1]) === null || _c === void 0 ? void 0 : _c.quiz;
    const questionsLength = (_d = quiz === null || quiz === void 0 ? void 0 : quiz.questions) === null || _d === void 0 ? void 0 : _d.length;
    const answers = [];
    for (let i = 0; i < questionsLength; i++) {
        answers.push(quiz.questions[i].answer);
    }
    const selectedAnswers = (_e = result === null || result === void 0 ? void 0 : result.quizes[index - 1]) === null || _e === void 0 ? void 0 : _e.answers;
    res
        .status(200)
        .json({ quiz: quiz, selectedAnswers: selectedAnswers, answers: answers });
});
exports.getQuizDataWithAnswers = getQuizDataWithAnswers;
const addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            [`quizes.${quizIndex - 1}.answers`]: answers,
        },
    };
    yield employee_user_1.default.findOneAndUpdate(filter, update, {
        new: true,
    });
});
exports.addScore = addScore;
