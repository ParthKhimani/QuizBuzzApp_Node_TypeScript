import { Request, Response } from "express";
import Manager from "../Model/manager-user";
import Technology, { ITechnology } from "../Model/technology";
import Employee, { IEmployee } from "../Model/employee-user";
import Quiz from "../Model/quiz";
import nodemailer from "nodemailer";

export const addManager = async (req: Request, res: Response) => {
  const { manager, password, technology } = req.body;
  const existingManager = await Manager.findOne({
    emailId: manager,
  }).populate("technology");
  const existingTechnology = await Technology.findOne({
    name: technology,
  }).populate("managers");
  const managerTechnology = existingManager?.technology as ITechnology;
  if (existingManager && managerTechnology.name !== existingTechnology?.name) {
    res.status(400).json({
      msg: "Manager is already assigned to another technology",
      status: "400",
    });
  } else if (
    existingManager &&
    managerTechnology.name === existingTechnology?.name
  ) {
    res.status(402).json({
      msg: "Manager is already assigned to that technology",
      status: "402",
    });
  } else if (technology === existingTechnology?.name) {
    const newManager = new Manager({
      emailId: manager,
      password: password,
    });
    existingTechnology?.managers.push(newManager._id);
    newManager.technology = existingTechnology?._id;
    await Promise.all([newManager.save(), existingTechnology?.save()]);
    res.status(200).json({ msg: "Assignment successful", status: "200" });
  } else {
    const newManager = new Manager({
      emailId: manager,
      password: password,
    });
    const newTechnology = new Technology({
      name: technology,
    });
    newTechnology.managers.push(newManager._id);
    newManager.technology = newTechnology._id;
    await Promise.all([newManager.save(), newTechnology.save()]);
    res.status(200).json({ msg: "Assignment successful", status: "200" });
  }
};

export const getManagerData = async (req: Request, res: Response) => {
  const result = await Manager.find().populate("technology");
  res.status(200).json({ data: result, status: "200" });
};

export const deleteManagerData = async (req: Request, res: Response) => {
  const { emailId, _id } = req.body;
  await Manager.findOneAndDelete({ emailId: emailId });
  await Technology.findOneAndUpdate(
    { managers: _id },
    { $pull: { managers: _id } },
    { new: true }
  );
  res.status(200).json({ msg: "deleted successfully", status: "200" });
};

export const updateManager = async (req: Request, res: Response) => {
  const { manager, password, technology } = req.body;
  const existingManager = await Manager.findOneAndUpdate(
    { emailId: manager },
    { password: password },
    { new: true }
  ).populate("technology");
  const existingTechnology = existingManager?.technology as ITechnology;
  const result = await Technology.findOne({ name: technology });
  if (result) {
    result.managers.push(existingManager?._id);
    result.save();
    const managerIndex = existingTechnology.managers.indexOf(manager);
    existingTechnology.managers.splice(managerIndex);
    existingManager!.technology = result._id;
    await Promise.all([existingTechnology.save(), existingManager?.save()]);
    res.status(200).json({ msg: "manager updated!", status: "200" });
  } else {
    const newTechnology = new Technology({
      name: technology,
    });
    newTechnology.save();
    existingManager!.technology = newTechnology._id;
    await Promise.all([existingTechnology.save(), existingManager?.save()]);
    res.status(202).json({ msg: "manager updated!", status: "202" });
  }
};

export const addEmployee = async (req: Request, res: Response) => {
  const { employee, password, technology } = req.body;
  const existingEmployee = await Employee.findOne({
    emailId: employee,
  }).populate("technology");
  const existingTechnology = await Technology.findOne({
    name: technology,
  }).populate("employees");
  const employeeTechnology = existingEmployee?.technology as ITechnology;
  if (
    existingEmployee &&
    employeeTechnology.name !== existingTechnology?.name
  ) {
    res.status(400).json({
      msg: "Employee is already assigned to another technology",
      status: "400",
    });
  } else if (
    existingEmployee &&
    employeeTechnology.name === existingTechnology?.name
  ) {
    res.status(402).json({
      msg: "Employee is already assigned to that technology",
      status: "402",
    });
  } else if (technology === existingTechnology?.name) {
    const newEmployee = new Employee({
      emailId: employee,
      password: password,
    });
    existingTechnology?.employees.push(newEmployee._id);
    newEmployee.technology = existingTechnology?._id;
    await Promise.all([newEmployee.save(), existingTechnology?.save()]);
    res.status(200).json({ msg: "Assignment successful", status: "200" });
  } else {
    const newEmployee = new Employee({
      emailId: employee,
      password: password,
    });
    const newTechnology = new Technology({
      name: technology,
    });
    newTechnology.employees.push(newEmployee._id);
    newEmployee.technology = newTechnology._id;
    await Promise.all([newEmployee.save(), newTechnology.save()]);
    res.status(200).json({ msg: "Assignment successful", status: "200" });
  }
};

export const getTechnologies = async (req: Request, res: Response) => {
  const result = await Technology.find();
  res.status(200).json({ technologies: result, status: "200" });
};

export const addQuiz = async (req: Request, res: Response) => {
  const { questions, technology } = req.body;
  const existingTechnology = await Technology.findOne({
    name: technology,
  });
  const existingEmployees = existingTechnology!.employees;
  const employees = [];
  for (let i = 0; i < existingEmployees!.length; i++) {
    employees.push(existingEmployees[i]._id);
  }
  const newQuiz = new Quiz({
    questions: questions,
    employees: employees,
    technology: existingTechnology?._id,
  });

  const result = await newQuiz.save();
  const existingEmployee = await Employee.find({
    _id: { $in: existingEmployees },
  });
  for (let i = 0; i < existingEmployees!.length; i++) {
    existingEmployee![i].quizes.push({
      quiz: result._id,
      score: questions.length,
    });
    await existingEmployee![i].save();
  }
  //sending mail to all the candidates in the technology selected
  for (let i = 0; i < existingEmployees!.length; i++) {
    let mailTransporter = nodemailer.createTransport({
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
      auth: {
        user: "parthkhimani48@gmail.com",
        pass: "maatulplnmgqgyio",
      },
    });

    let mailDetails = {
      from: "parthkhimani48@gmail.com",
      to: existingEmployee![i].emailId,
      subject: "New Quiz Created!",
      text: "Greetings from QuizBuzz, Your new quiz was created , Login to attend the quiz!",
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
        res.status(202).json({ msg: "email sent successfully", status: "202" });
      }
    });
  }
};

export const getEmployeeData = async (req: Request, res: Response) => {
  const result = await Employee.find().populate("technology");
  res.status(200).json({ data: result, status: "200" });
};

export const deleteEmployeeData = async (req: Request, res: Response) => {
  const { emailId, _id } = req.body;
  await Employee.findOneAndDelete({ emailId: emailId });
  await Technology.findOneAndUpdate(
    { employees: _id },
    { $pull: { employees: _id } },
    { new: true }
  );
  res.status(200).json({ msg: "employee deleted", status: "200" });
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { employee, password, technology } = req.body;
  const existingEmployee = await Employee.findOneAndUpdate(
    { emailId: employee },
    { password: password },
    { new: true }
  ).populate("technology");
  const existingTechnology = existingEmployee?.technology as ITechnology;
  const result = await Technology.findOne({ name: technology });
  if (result) {
    result.employees.push(existingEmployee?._id);
    result.save();
    const employeeIndex = existingTechnology.employees.indexOf(employee);
    existingTechnology.employees.splice(employeeIndex);
    existingEmployee!.technology = result._id;
    await Promise.all([existingTechnology.save(), existingEmployee?.save()]);
    res.status(200).json({ msg: "employee updated!", status: "200" });
  } else {
    const newTechnology = new Technology({
      name: technology,
    });
    newTechnology.save();
    existingEmployee!.technology = newTechnology._id;
    await Promise.all([existingTechnology.save(), existingEmployee?.save()]);
    res.status(202).json({ msg: "manager updated!", status: "202" });
  }
};
