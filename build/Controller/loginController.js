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
exports.employeeRegister = exports.employeeLogin = exports.managerLogin = exports.adminLogin = void 0;
const admin_user_1 = __importDefault(require("../Model/admin-user"));
const manager_user_1 = __importDefault(require("../Model/manager-user"));
const employee_user_1 = __importDefault(require("../Model/employee-user"));
const technology_1 = __importDefault(require("../Model/technology"));
const adminLogin = (req, res) => {
    try {
        const { emailId, password } = req.body;
        admin_user_1.default.findOne({ emailId: emailId }).then((result) => {
            if (!result) {
                res.status(404).json({ msg: "Admin not found !", status: "404" });
            }
            else {
                const passCheck = password.localeCompare(result.password);
                if (passCheck == 0) {
                    res.status(303).json({ msg: "Admin Logged In !", status: "303" });
                }
                else {
                    res.status(400).json({ msg: "Incorrect Password !", status: "400" });
                }
            }
        });
    }
    catch (_a) {
        throw new Error();
    }
};
exports.adminLogin = adminLogin;
const managerLogin = (req, res) => {
    try {
        const { emailId, password } = req.body;
        manager_user_1.default.findOne({ emailId: emailId }).then((result) => {
            if (!result) {
                res.status(404).json({ msg: "Manager not found !", status: "404" });
            }
            else {
                const passCheck = password.localeCompare(result.password);
                if (passCheck == 0) {
                    res.status(303).json({ msg: "Manager Logged In !", status: "303" });
                }
                else {
                    res.status(400).json({ msg: "Incorrect Password !", status: "400" });
                }
            }
        });
    }
    catch (_a) {
        throw new Error();
    }
};
exports.managerLogin = managerLogin;
const employeeLogin = (req, res) => {
    try {
        const { emailId, password } = req.body;
        employee_user_1.default.findOne({ emailId: emailId }).then((result) => {
            if (!result) {
                res.status(404).json({ msg: "Employee not found !", status: "404" });
            }
            else {
                const passCheck = password.localeCompare(result.password);
                if (passCheck == 0) {
                    res.status(303).json({ msg: "Employee Logged In !", status: "303" });
                }
                else {
                    res.status(400).json({ msg: "Incorrect Password !", status: "400" });
                }
            }
        });
    }
    catch (_a) {
        throw new Error();
    }
};
exports.employeeLogin = employeeLogin;
const employeeRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, emailId, password, technology } = req.body;
        const result = yield employee_user_1.default.findOne({ emailId: emailId });
        if (result != null) {
            res
                .status(400)
                .json({ msg: "employee already registered!", status: "400" });
        }
        else {
            const newEmployee = new employee_user_1.default({
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                password: password,
            });
            const existingTechnology = yield technology_1.default.findOne({ name: technology });
            if (existingTechnology != null) {
                existingTechnology.employees.push(newEmployee._id);
                newEmployee.technology = existingTechnology._id;
                yield Promise.all([existingTechnology.save(), newEmployee.save()]);
                res.status(202).json({ msg: "employee registered!", status: "202" });
            }
            else {
                const newTechnology = new technology_1.default({
                    name: technology,
                });
                yield newTechnology.save();
                newTechnology.employees.push(newEmployee._id);
                newEmployee.technology = newTechnology._id;
                yield Promise.all([newTechnology.save(), newEmployee.save()]);
                res.status(202).json({ msg: "employee registered!", status: "202" });
            }
        }
    }
    catch (_a) {
        throw new Error();
    }
});
exports.employeeRegister = employeeRegister;
