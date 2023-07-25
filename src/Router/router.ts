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
import expressAsyncHandler from "express-async-handler";

const router = express();

router.post("/admin-login", expressAsyncHandler(adminLogin));

router.post("/manager-login", expressAsyncHandler(managerLogin));

router.post("/employee-login", expressAsyncHandler(employeeLogin));

router.post("/employee-register", expressAsyncHandler(employeeRegister));

router.post("/add-manager", expressAsyncHandler(addManager));

router.post("/update-manager", expressAsyncHandler(updateManager));

router.post("/add-employee", expressAsyncHandler(addEmployee));

router.post("/update-employee", expressAsyncHandler(updateEmployee));

router.get("/get-technologies", expressAsyncHandler(getTechnologies));

router.post("/add-quiz", expressAsyncHandler(addQuiz));

router.post("/get-quiz", expressAsyncHandler(getQuiz));

router.post("/get-quiz-data", expressAsyncHandler(getQuizData));

router.post("/add-score", expressAsyncHandler(addScore));

router.get(
  "/admin-dashboard/manager-data",
  expressAsyncHandler(getManagerData)
);

router.get(
  "/admin-dashboard/employee-data",
  expressAsyncHandler(getEmployeeData)
);

router.post(
  "/admin-dashboard/delete-manager-data",
  expressAsyncHandler(deleteManagerData)
);

router.post(
  "/admin-dashboard/delete-employee-data",
  expressAsyncHandler(deleteEmployeeData)
);

export default router;
