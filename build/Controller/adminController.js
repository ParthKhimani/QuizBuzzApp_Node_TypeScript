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
exports.addManager = void 0;
const manager_user_1 = __importDefault(require("../Model/manager-user"));
const technology_1 = __importDefault(require("../Model/technology"));
const addManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { manager, password, technology } = req.body;
        const existingManager = yield manager_user_1.default.findOne({
            emailId: manager,
        }).populate("technology");
        const existingTechnology = yield technology_1.default.findOne({
            name: technology,
        }).populate("managers");
        if (existingManager &&
            !existingManager.technology.equals(existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology._id)) {
            res.status(400).json({
                msg: "Manager is already assigned to another technology",
                status: "400",
            });
        }
        else if (existingManager &&
            existingManager.technology.equals(existingTechnology === null || existingTechnology === void 0 ? void 0 : existingTechnology._id)) {
            res.status(402).json({
                msg: "Manager is already assigned to that technology",
                status: "402",
            });
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
