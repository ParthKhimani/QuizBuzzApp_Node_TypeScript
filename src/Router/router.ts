import express from "express";
import {
  adminLogin,
  employeeLogin,
  managerLogin,
} from "../Controller/loginController";
import {
  addEmployee,
  addManager,
  deleteManagerData,
  getEmployees,
  getManagerData,
} from "../Controller/adminController";

const router = express();

router.post("/admin-login", adminLogin);

router.post("/manager-login", managerLogin);

router.post("/employee-login", employeeLogin);

router.post("/add-manager", addManager);

router.post("/add-employee", addEmployee);

router.get("/get-employees", getEmployees);

router.get("/admin-dashboard/manager-data", getManagerData);

router.post("/admin-dashboard/delete-manager-data", deleteManagerData);

export default router;
