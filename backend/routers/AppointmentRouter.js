import express from "express";
import { createAppointment, deleteAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import { validationCreateAppointmentArr } from "../utlis/validationArr.js";
import verifyToken from "../middlewares/verifyToken.js";

const appointmentRouter =express.Router();

appointmentRouter.post('/create', validationCreateAppointmentArr(),CheckValidation, verifyToken, createAppointment);
appointmentRouter.get('/all', verifyToken, getUserAppointments);
appointmentRouter.delete('/:id', verifyToken, deleteAppointment);


export default appointmentRouter;