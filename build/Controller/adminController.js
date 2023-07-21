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
exports.updateEmployee = exports.deleteEmployeeData = exports.getEmployeeData = exports.addQuiz = exports.getEmployees = exports.addEmployee = exports.updateManager = exports.deleteManagerData = exports.getManagerData = exports.addManager = void 0;
const manager_user_1 = __importDefault(require("../Model/manager-user"));
const technology_1 = __importDefault(require("../Model/technology"));
const employee_user_1 = __importDefault(require("../Model/employee-user"));
const quiz_1 = __importDefault(require("../Model/quiz"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const addManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { manager, password, technology } = req.body;
        const existingManager = yield manager_user_1.default.findOne({
            emailId: manager,
        }).populate("technology");
        const existingTechnology = yield technology_1.default.findOne({
            name: technology,
        }).populate("managers");
        const managerTechnology = existingManager === null || existingManager === void 0 ? void 0 : existingManager.technology;
        if (existingManager &&
            managerTechnology.name !== (existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.name)) {
            res.status(400).json({
                msg: "Manager is already assigned to another technology",
                status: "400",
            });
        }
        else if (existingManager &&
            managerTechnology.name === (existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.name)) {
            res.status(402).json({
                msg: "Manager is already assigned to that technology",
                status: "402",
            });
        }
        else if (technology === (existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.name)) {
            const newManager = new manager_user_1.default({
                emailId: manager,
                password: password,
            });
            existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.managers.push(newManager._id);
            newManager.technology = existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology._id;
            yield Promise.all([newManager.save(), existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.save()]);
            res.status(200).json({ msg: "Assignment successful", status: "200" });
        }
        else {
            const newManager = new manager_user_1.default({
                emailId: manager,
                password: password,
            });
            const newTechnology = new technology_1.default({
                name: technology,
            });
            newTechnology.managers.push(newManager._id);
            newManager.technology = newTechnology._id;
            yield Promise.all([newManager.save(), newTechnology.save()]);
            res.status(200).json({ msg: "Assignment successful", status: "200" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Not able to assign", status: "400" });
    }
});
exports.addManager = addManager;
const getManagerData = (req, res, next) => {
    manager_user_1.default.find()
        .populate("technology")
        .then((result) => {
        res.status(200).json({ data: result, status: "200" });
    });
};
exports.getManagerData = getManagerData;
const deleteManagerData = (req, res, next) => {
    const { emailId, _id } = req.body;
    manager_user_1.default.findOneAndDelete({ emailId: emailId }).then(() => {
        technology_1.default.findOneAndUpdate({ managers: _id }, { $pull: { managers: _id } }, { new: true }).then(() => {
            res.status(200).json({ msg: "deleted successfully", status: "200" });
        });
    });
};
exports.deleteManagerData = deleteManagerData;
const updateManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { manager, password, technology } = req.body;
    const existingManager = yield manager_user_1.default.findOne({ emailId: manager }).populate("technology");
    const existingTechnology = existingManager === null || existingManager === void 0 ? void 0 : existingManager.technology;
    const result = yield technology_1.default.findOne({ name: technology });
    if (result) {
        result.managers.push(existingManager === null || existingManager === void 0 ? void 0 : existingManager._id);
        result.save();
        const managerIndex = existingTechnology.managers.indexOf(manager);
        existingTechnology.managers.splice(managerIndex);
        existingManager.technology = result._id;
        yield Promise.all([existingTechnology.save(), existingManager === null || existingManager === void 0 ? void 0 : existingManager.save()]);
        res.status(200).json({ msg: "manager updated!", status: "200" });
    }
    else {
        const newTechnology = new technology_1.default({
            name: technology,
        });
        newTechnology.save();
        existingManager.technology = newTechnology._id;
        yield Promise.all([existingTechnology.save(), existingManager === null || existingManager === void 0 ? void 0 : existingManager.save()]);
        res.status(202).json({ msg: "manager updated!", status: "202" });
    }
});
exports.updateManager = updateManager;
const addEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employee, password, technology } = req.body;
        const existingEmployee = yield employee_user_1.default.findOne({
            emailId: employee,
        }).populate("technology");
        const existingTechnology = yield technology_1.default.findOne({
            name: technology,
        }).populate("employees");
        const employeeTechnology = existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.technology;
        if (existingEmployee &&
            employeeTechnology.name !== (existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.name)) {
            res.status(400).json({
                msg: "Employee is already assigned to another technology",
                status: "400",
            });
        }
        else if (existingEmployee &&
            employeeTechnology.name === (existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.name)) {
            res.status(402).json({
                msg: "Employee is already assigned to that technology",
                status: "402",
            });
        }
        else if (technology === (existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.name)) {
            const newEmployee = new employee_user_1.default({
                emailId: employee,
                password: password,
            });
            existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.employees.push(newEmployee._id);
            newEmployee.technology = existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology._id;
            yield Promise.all([newEmployee.save(), existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology.save()]);
            res.status(200).json({ msg: "Assignment successful", status: "200" });
        }
        else {
            const newEmployee = new employee_user_1.default({
                emailId: employee,
                password: password,
            });
            const newTechnology = new technology_1.default({
                name: technology,
            });
            newTechnology.employees.push(newEmployee._id);
            newEmployee.technology = newTechnology._id;
            yield Promise.all([newEmployee.save(), newTechnology.save()]);
            res.status(200).json({ msg: "Assignment successful", status: "200" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Not able to assign", status: "400" });
    }
});
exports.addEmployee = addEmployee;
const getEmployees = (req, res, next) => {
    employee_user_1.default.find()
        .populate("technology")
        .then((result) => {
        res.status(200).json({ employees: result, status: "200" });
    });
};
exports.getEmployees = getEmployees;
const addQuiz = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { questions, employee } = req.body;
    const existingEmployee = yield employee_user_1.default.findOne({ emailId: employee });
    const newQuiz = new quiz_1.default({
        questions: questions,
        employee: existingEmployee._id,
    });
    yield newQuiz.save().then((result) => {
        existingEmployee.quizes.push({
            quiz: result._id,
            score: questions.length,
        });
        existingEmployee.save();
    });
    let mailTransporter = nodemailer_1.default.createTransport({
        tls: {
            rejectUnauthorized: false,
        },
        service: "gmail",
        auth: {
            user: "parthkhimani48@gmail.com",
            pass: "maatulplnmgqgyio",
        },
    });
    let mailDetails = {
        from: "parthkhimani48@gmail.com",
        to: employee,
        subject: "New Quiz Created!",
        text: "Greetings from QuizBuzz, Your new quiz was created , Login to attend the quiz!",
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent successfully");
            res.status(202).json({ msg: "email sent successfully", status: "202" });
        }
    });
});
exports.addQuiz = addQuiz;
const getEmployeeData = (req, res, next) => {
    employee_user_1.default.find()
        .populate("technology")
        .then((result) => {
        res.status(200).json({ data: result, status: "200" });
    });
};
exports.getEmployeeData = getEmployeeData;
const deleteEmployeeData = (req, res, next) => {
    const { emailId, _id } = req.body;
    employee_user_1.default.findOneAndDelete({ emailId: emailId }).then(() => {
        technology_1.default.findOneAndUpdate({ employees: _id }, { $pull: { employees: _id } }, { new: true }).then(() => {
            res.status(200).json({ msg: "employee deleted", status: "200" });
        });
    });
};
exports.deleteEmployeeData = deleteEmployeeData;
const updateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { employee, password, technology } = req.body;
    const existingEmployee = yield employee_user_1.default.findOne({
        emailId: employee,
    }).populate("technology");
    const existingTechnology = existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.technology;
    const result = yield technology_1.default.findOne({ name: technology });
    if (result) {
        result.employees.push(existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee._id);
        result.save();
        const employeeIndex = existingTechnology.employees.indexOf(employee);
        existingTechnology.employees.splice(employeeIndex);
        existingEmployee.technology = result._id;
        yield Promise.all([existingTechnology.save(), existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.save()]);
        res.status(200).json({ msg: "employee updated!", status: "200" });
    }
    else {
        const newTechnology = new technology_1.default({
            name: technology,
        });
        newTechnology.save();
        existingEmployee.technology = newTechnology._id;
        yield Promise.all([existingTechnology.save(), existingEmployee === null || existingEmployee === void 0 ? void 0 : existingEmployee.save()]);
        res.status(202).json({ msg: "manager updated!", status: "202" });
    }
});
exports.updateEmployee = updateEmployee;
