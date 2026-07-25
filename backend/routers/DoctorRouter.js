import express from "express";
import { addDoctor, getAllDoctors, getDoctorById } from "../controllers/doctorController.js";
import { validationAddDoctorArr } from "../utlis/validationArr.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import upload from "../config/multer.js";
import verifyToken from "../middlewares/verifyToken.js";

const doctorRouter=express.Router();

doctorRouter.post("/add",upload.single("image"),
    validationAddDoctorArr(),
    CheckValidation,
    verifyToken,
    addDoctor)
doctorRouter.get("/all",verifyToken,getAllDoctors)
doctorRouter.get("/:id",verifyToken,getDoctorById)



export default doctorRouter;