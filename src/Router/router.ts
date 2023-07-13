import express from "express";
import {
  adminLogin,
  employeeLogin,
  managerLogin,
} from "../Controller/loginController";
import {
  addEmployee,
  addManager,
  addQuiz,
  deleteManagerData,
  getEmployees,
  getManagerData,
  getQuiz,
  getQuizData,
} from "../Controller/adminController";

const router = express();

router.post("/admin-login", adminLogin);

router.post("/manager-login", managerLogin);

router.post("/employee-login", employeeLogin);

router.post("/add-manager", addManager);

router.post("/add-employee", addEmployee);

router.get("/get-employees", getEmployees);

router.post("/add-quiz", addQuiz);

router.post("/get-quiz", getQuiz);

router.post("/get-quiz-data", getQuizData);

router.get("/admin-dashboard/manager-data", getManagerData);

router.post("/admin-dashboard/delete-manager-data", deleteManagerData);

export default router;
