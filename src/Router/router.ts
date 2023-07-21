import express from "express";
import {
  adminLogin,
  employeeLogin,
  employeeRegister,
  managerLogin,
} from "../Controller/loginController";
import {
  addEmployee,
  addManager,
  addQuiz,
  deleteEmployeeData,
  deleteManagerData,
  getEmployeeData,
  getManagerData,
  getTechnologies,
  updateEmployee,
  updateManager,
} from "../Controller/adminController";
import { addScore, getQuiz, getQuizData } from "../Controller/quizController";

const router = express();

router.post("/admin-login", adminLogin);

router.post("/manager-login", managerLogin);

router.post("/employee-login", employeeLogin);

router.post("/employee-register", employeeRegister);

router.post("/add-manager", addManager);

router.post("/update-manager", updateManager);

router.post("/add-employee", addEmployee);

router.post("/update-employee", updateEmployee);

router.get("/get-technologies", getTechnologies);

router.post("/add-quiz", addQuiz);

router.post("/get-quiz", getQuiz);

router.post("/get-quiz-data", getQuizData);

router.post("/add-score", addScore);

router.get("/admin-dashboard/manager-data", getManagerData);

router.get("/admin-dashboard/employee-data", getEmployeeData);

router.post("/admin-dashboard/delete-manager-data", deleteManagerData);

router.post("/admin-dashboard/delete-employee-data", deleteEmployeeData);

export default router;
