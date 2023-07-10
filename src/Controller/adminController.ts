import { Request, Response, NextFunction } from "express";
import Manager, { IManager } from "../Model/manager-user";
import Technology, { ITechnology } from "../Model/technology";
import Employee, { IEmployee } from "../Model/employee-user";

export const addManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { manager, password, technology } = req.body;
    const existingManager: IManager | null = await Manager.findOne({
      emailId: manager,
    }).populate("technology");
    const existingTechnology: ITechnology | null = await Technology.findOne({
      name: technology,
    }).populate("managers");
    if (
      existingManager &&
      !existingManager.technology.equals(existingTechnology?._id)
    ) {
      res.status(400).json({
        msg: "Manager is already assigned to another technology",
        status: "400",
      });
    } else if (
      existingManager &&
      existingManager.technology.equals(existingTechnology?._id)
    ) {
      res.status(402).json({
        msg: "Manager is already assigned to that technology",
        status: "402",
      });
    } else {
      const newManager: IManager = new Manager({
        emailId: manager,
        password: password,
      });
      const newTechnology: ITechnology = new Technology({
        name: technology,
      });
      newTechnology.managers.push(newManager._id);
      newManager.technology = newTechnology._id;
      await Promise.all([newManager.save(), newTechnology.save()]);
      res.status(200).json({ msg: "Assignment successful", status: "200" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Not able to assign", status: "400" });
  }
};

export const getManagerData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Manager.find()
    .populate("technology")
    .then((result) => {
      res.status(200).json({ data: result, status: "200" });
    });
};

export const deleteManagerData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const manager = req.body;
  const id = req.body._id;
  Manager.findByIdAndDelete(id).then(() => {
    Technology.findOneAndDelete({ managers: manager }).then(() => {
      res.status(200).json({ msg: "deleted successfully", status: "200" });
    });
  });
};

export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employee, password, technology } = req.body;
    const existingEmployee: IEmployee | null = await Employee.findOne({
      emailId: employee,
    }).populate("technology");
    const existingTechnology: ITechnology | null = await Technology.findOne({
      name: technology,
    }).populate("employees");
    if (
      existingEmployee &&
      !existingEmployee.technology.equals(existingTechnology?._id)
    ) {
      res.status(400).json({
        msg: "Employee is already assigned to another technology",
        status: "400",
      });
    } else if (
      existingEmployee &&
      existingEmployee.technology.equals(existingTechnology?._id)
    ) {
      res.status(402).json({
        msg: "Employee is already assigned to that technology",
        status: "402",
      });
    } else {
      const newEmployee: IEmployee = new Employee({
        emailId: employee,
        password: password,
      });
      const newTechnology: ITechnology = new Technology({
        name: technology,
      });
      newTechnology.employees.push(newEmployee._id);
      newEmployee.technology = newTechnology._id;
      await Promise.all([newEmployee.save(), newTechnology.save()]);
      res.status(200).json({ msg: "Assignment successful", status: "200" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Not able to assign", status: "400" });
  }
};
