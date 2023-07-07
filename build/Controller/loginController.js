"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerLogin = exports.adminLogin = void 0;
const admin_user_1 = __importDefault(require("../Model/admin-user"));
const manager_user_1 = __importDefault(require("../Model/manager-user"));
// import Employee from "../Model/employee-user";
const adminLogin = (req, res, next) => {
    const { emailId, password } = req.body;
    admin_user_1.default.findOne({ emailId: emailId }).then((result) => {
        if (!result) {
            res.status(404).json({ msg: "Admin not found !", status: "404" });
        }
        else {
            const passCheck = password.localeCompare(result.password);
            if (passCheck == 0) {
                res.status(303).json({ msg: "Admin Logged In !", status: "303" });
            }
            else {
                res.status(400).json({ msg: "Incorrect Password !", status: "400" });
            }
        }
    });
};
exports.adminLogin = adminLogin;
const managerLogin = (req, res, next) => {
    const { emailId, password } = req.body;
    manager_user_1.default.findOne({ emailId: emailId }).then((result) => {
        if (!result) {
            res.status(404).json({ msg: "Manager not found !", status: "404" });
        }
        else {
            const passCheck = password.localeCompare(result.password);
            if (passCheck == 0) {
                res.status(303).json({ msg: "Manager Logged In !", status: "303" });
            }
            else {
                res.status(400).json({ msg: "Incorrect Password !", status: "400" });
            }
        }
    });
};
exports.managerLogin = managerLogin;
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
