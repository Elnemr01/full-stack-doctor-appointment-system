import express from "express";
import { addDepartment, getAllDepartments } from "../controllers/departmentController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import { validationAddDepartmentArr } from "../utlis/validationArr.js";
import upload from "../config/multer.js";


const departmentRouter= express.Router();

departmentRouter.get("/",verifyToken,checkRole,getAllDepartments)
departmentRouter.post("/add",upload.single("image"),validationAddDepartmentArr(),CheckValidation,verifyToken,checkRole,addDepartment)

export default departmentRouter;