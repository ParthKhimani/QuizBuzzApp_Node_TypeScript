import { Request, Response, NextFunction } from "express";
import Admin from "../Model/admin-user";
import Manager from "../Model/manager-user";
// import Employee from "../Model/employee-user";

export const adminLogin = (req: Request, res: Response, next: NextFunction) => {
  const { emailId, password } = req.body;
  Admin.findOne({ emailId: emailId }).then((result: any) => {
    if (!result) {
      res.status(404).json({ msg: "Admin not found !", status: "404" });
    } else {
      const passCheck = password.localeCompare(result.password);
      if (passCheck == 0) {
        res.status(303).json({ msg: "Admin Logged In !", status: "303" });
      } else {
        res.status(400).json({ msg: "Incorrect Password !", status: "400" });
      }
    }
  });
};

export const managerLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { emailId, password } = req.body;
  Manager.findOne({ emailId: emailId }).then((result: any) => {
    if (!result) {
      res.status(404).json({ msg: "Manager not found !", status: "404" });
    } else {
      const passCheck = password.localeCompare(result.password);
      if (passCheck == 0) {
        res.status(303).json({ msg: "Manager Logged In !", status: "303" });
      } else {
        res.status(400).json({ msg: "Incorrect Password !", status: "400" });
      }
    }
  });
};

// export const employeeLogin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { emailId, password } = req.body;
//   Employee.findOne({ emailId: emailId }).then((result: any) => {
//     if (!result) {
//       res.status(404).json({ msg: "Employee not found !", status: "404" });
//     } else {
//       const passCheck = password.localeCompare(result.password);
//       if (passCheck == 0) {
//         res.status(303).json({ msg: "Employee Logged In !", status: "303" });
//       } else {
//         res.status(400).json({ msg: "Incorrect Password !", status: "400" });
//       }
//     }
//   });
// };
