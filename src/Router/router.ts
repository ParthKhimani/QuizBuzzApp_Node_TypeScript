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
import {
  AbandonQuiz,
  AssignQuiz,
  EmployeeDataToAssignQuiz,
  addScore,
  getQuiz,
  getQuizByTechnology,
  getQuizData,
  getQuizDataWithAnswers,
} from "../Controller/quizController";
import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../authentication/verifyToken";

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

router.get(
  "/get-quiz",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(getQuiz)
);

router.get(
  "/get-quiz-by-technology",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(getQuizByTechnology)
);

router.get(
  "/assign-auiz",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(AssignQuiz)
);

router.post(
  "/abandon-auiz",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(AbandonQuiz)
);

router.post(
  "/get-employee-data-to-assign-quiz",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(EmployeeDataToAssignQuiz)
);

router.post(
  "/get-quiz-data",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(getQuizData)
);

router.post(
  "/get-quiz-data-with-answers",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(getQuizDataWithAnswers)
);

router.post("/add-score", expressAsyncHandler(addScore));

router.get(
  "/admin-dashboard/manager-data",
  expressAsyncHandler(verifyToken),
  expressAsyncHandler(getManagerData)
);

router.get(
  "/admin-dashboard/employee-data",
  expressAsyncHandler(verifyToken),
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
