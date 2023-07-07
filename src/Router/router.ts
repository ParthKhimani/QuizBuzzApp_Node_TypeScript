import express from "express";
import {
  adminLogin,
  managerLogin,
  //   employeeLogin,
} from "../Controller/loginController";
import {
  addManager,
  deleteManagerData,
  getManagerData,
} from "../Controller/adminController";

const router = express();

router.post("/admin-login", adminLogin);

router.post("/manager-login", managerLogin);

// router.post("/employee-login", employeeLogin);

router.post("/add-manager", addManager);

router.get("/admin-dashboard/manager-data", getManagerData);

router.post("/admin-dashboard/delete-manager-data", deleteManagerData);

export default router;
