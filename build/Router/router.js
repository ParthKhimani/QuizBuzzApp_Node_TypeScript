"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../Controller/loginController");
const adminController_1 = require("../Controller/adminController");
const router = (0, express_1.default)();
router.post("/admin-login", loginController_1.adminLogin);
router.post("/manager-login", loginController_1.managerLogin);
// router.post("/employee-login", employeeLogin);
router.post("/add-manager", adminController_1.addManager);
exports.default = router;
