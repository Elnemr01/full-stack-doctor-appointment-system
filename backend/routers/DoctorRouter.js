import express from "express";
import { addDoctor, getAllDoctors, getDoctorById } from "../controllers/doctorController.js";
import { validationAddDoctorArr } from "../utlis/validationArr.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import upload from "../config/multer.js";

const doctorRouter=express.Router();

doctorRouter.post("/add",upload.single("image"),validationAddDoctorArr(),CheckValidation,addDoctor)
doctorRouter.get("/all",getAllDoctors)
doctorRouter.get("/:id",getDoctorById)



export default doctorRouter;