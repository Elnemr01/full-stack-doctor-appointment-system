import express from "express";
import { createAppointment, deleteAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import { validationCreateAppointmentArr } from "../utlis/validationArr.js";

const appointmentRouter =express.Router();

appointmentRouter.post('/create', validationCreateAppointmentArr(),CheckValidation, createAppointment);
appointmentRouter.get('/all', getUserAppointments);
appointmentRouter.delete('/:id', deleteAppointment);


export default appointmentRouter;