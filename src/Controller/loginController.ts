import { Request, Response } from "express";
import Admin from "../Model/admin-user";
import Manager from "../Model/manager-user";
import Employee from "../Model/employee-user";
import Technology from "../Model/technology";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response) => {
  const { emailId, password } = req.body;
  const result = await Admin.findOne({ emailId: emailId });
  if (!result) {
    res.status(404).json({ msg: "Admin not found !", status: "404" });
  } else {
    const passCheck = password.localeCompare(result.password);
    if (passCheck == 0) {
      const token = jwt.sign({ role: "admin" }, "secretkey", {
        expiresIn: "1h",
      });
      res.status(303).json({ msg: "Admin Logged In !", status: "303", token });
    } else {
      res.status(400).json({ msg: "Incorrect Password !", status: "400" });
    }
  }
};

export const managerLogin = async (req: Request, res: Response) => {
  const { emailId, password } = req.body;
  const result = await Manager.findOne({ emailId: emailId }).populate(
    "technology"
  );
  if (!result) {
    res.status(404).json({ msg: "Manager not found !", status: "404" });
  } else {
    const passCheck = password.localeCompare(result.password);
    if (passCheck == 0) {
      const token = jwt.sign({ role: "manager" }, "secretkey", {
        expiresIn: "1h",
      });
      res.status(303).json({
        msg: "Manager Logged In !",
        manager: result,
        status: "303",
        token,
      });
    } else {
      res.status(400).json({ msg: "Incorrect Password !", status: "400" });
    }
  }
};

export const employeeLogin = async (req: Request, res: Response) => {
  const { emailId, password } = req.body;
  const result = await Employee.findOne({ emailId: emailId });
  if (!result) {
    res.status(404).json({ msg: "Employee not found !", status: "404" });
  } else {
    const passCheck = password.localeCompare(result.password);
    if (passCheck == 0) {
      const token = jwt.sign({ role: "employee" }, "secretkey", {
        expiresIn: "1h",
      });
      res.status(303).json({
        msg: "Employee Logged In !",
        employee: result,
        status: "303",
        token,
      });
    } else {
      res.status(400).json({ msg: "Incorrect Password !", status: "400" });
    }
  }
};

export const employeeRegister = async (req: Request, res: Response) => {
  const { firstName, lastName, emailId, password, technology } = req.body;
  const result = await Employee.findOne({ emailId: emailId });
  if (result != null) {
    res
      .status(400)
      .json({ msg: "employee already registered!", status: "400" });
  } else {
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
    });
    const existingTechnology = await Technology.findOne({ name: technology });
    if (existingTechnology != null) {
      existingTechnology.employees.push(newEmployee._id);
      newEmployee.technology = existingTechnology._id;
      await Promise.all([existingTechnology.save(), newEmployee.save()]);
      res.status(202).json({ msg: "employee registered!", status: "202" });
    } else {
      const newTechnology = new Technology({
        name: technology,
      });
      await newTechnology.save();
      newTechnology.employees.push(newEmployee._id);
      newEmployee.technology = newTechnology._id;
      await Promise.all([newTechnology.save(), newEmployee.save()]);
      res.status(202).json({ msg: "employee registered!", status: "202" });
    }
  }
};
