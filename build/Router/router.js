"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../Controller/loginController");
const adminController_1 = require("../Controller/adminController");
const quizController_1 = require("../Controller/quizController");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const verifyToken_1 = require("../authentication/verifyToken");
const router = (0, express_1.default)();
router.post("/admin-login", (0, express_async_handler_1.default)(loginController_1.adminLogin));
router.post("/manager-login", (0, express_async_handler_1.default)(loginController_1.managerLogin));
router.post("/employee-login", (0, express_async_handler_1.default)(loginController_1.employeeLogin));
router.post("/employee-register", (0, express_async_handler_1.default)(loginController_1.employeeRegister));
router.post("/add-manager", (0, express_async_handler_1.default)(adminController_1.addManager));
router.post("/update-manager", (0, express_async_handler_1.default)(adminController_1.updateManager));
router.post("/add-employee", (0, express_async_handler_1.default)(adminController_1.addEmployee));
router.post("/update-employee", (0, express_async_handler_1.default)(adminController_1.updateEmployee));
router.get("/get-technologies", (0, express_async_handler_1.default)(adminController_1.getTechnologies));
router.post("/add-quiz", (0, express_async_handler_1.default)(adminController_1.addQuiz));
router.post("/get-quiz", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.getQuiz));
router.post("/get-quiz-by-technology", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.getQuizByTechnology));
router.post("/assign-auiz", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.AssignQuiz));
router.post("/abandon-auiz", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.AbandonQuiz));
router.post("/get-employee-data-to-assign-quiz", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.EmployeeDataToAssignQuiz));
router.post("/get-quiz-data", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.getQuizData));
router.post("/get-quiz-data-with-answers", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(quizController_1.getQuizDataWithAnswers));
router.post("/add-score", (0, express_async_handler_1.default)(quizController_1.addScore));
router.post("/admin-dashboard/manager-data", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(adminController_1.getManagerData));
router.post("/admin-dashboard/employee-data", (0, express_async_handler_1.default)(verifyToken_1.verifyToken), (0, express_async_handler_1.default)(adminController_1.getEmployeeData));
router.post("/admin-dashboard/delete-manager-data", (0, express_async_handler_1.default)(adminController_1.deleteManagerData));
router.post("/admin-dashboard/delete-employee-data", (0, express_async_handler_1.default)(adminController_1.deleteEmployeeData));
exports.default = router;
