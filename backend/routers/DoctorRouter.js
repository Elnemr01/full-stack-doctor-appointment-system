import express from "express";
import { addDoctor } from "../controllers/doctorController.js";
import { validationAddDoctorArr } from "../utlis/validationArr.js";
import CheckValidation from "../middlewares/CheckValidation.js";

const doctorRouter=express.Router();

doctorRouter.post("/add",validationAddDoctorArr(),CheckValidation,addDoctor)



export default doctorRouter;