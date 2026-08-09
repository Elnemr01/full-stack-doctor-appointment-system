import Appointment from "../models/AppointmentSchema.js";
import Doctor from "../models/DoctorSchema.js";
import ErrorHandler from "../utlis/ErrorHandler.js";
import responseStatus from "../utlis/resStatus.js";


export const createAppointment = ErrorHandler(async (req, res, next) => {

    const { doctorId, reason, date } = req.body;
    const userId=req.user.id

    const doctor = await Doctor.findById(doctorId);
    if(!doctor) {
        return res.status(404).json({
            status: responseStatus.failed,
            message: "Doctor Not Found",
            date:null
        })
    }

    // check if there is already an appointment for the same doctor and user at the same date and time
    const existingAppointment = await Appointment.findOne({ doctorId, userId, date });

    if(existingAppointment) {
        return res.status(400).json({
            status: responseStatus.failed,
            message: "Appointment already exists for this time slot",
        })
    }

    const createdAppointment= await Appointment.create({
        doctorId,
        userId,
        reason,
        date
    })

    const savedAppointment = await createdAppointment.save()

    res.status(201).json({
        status: responseStatus.success,
        message: "Appointment Created Successfully",
        data: savedAppointment
    })

})

export const deleteAppointment = ErrorHandler(async (req, res, next) => {

    const {id} =req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if(!deletedAppointment) {
        return res.status(404).json({
            status: responseStatus.failed,
            message: "Appointment Not Found",
        })
    }

    res.status(201).json({
        status: responseStatus.success,
        message: "Appointment Deleted Successfully",
    })

})

export const getUserAppointments = ErrorHandler(async (req, res, next) => {
    
    const userId = req.user.id;
    const {page=1, limit=10} = req.query;
    const appointments = await Appointment.find({ userId })
    .populate("doctorId").limit(limit * 1).skip((page - 1) * limit);

    res.status(200).json({
        status: responseStatus.success,
        message: "Appointments Found",
        data: appointments
    })

})

