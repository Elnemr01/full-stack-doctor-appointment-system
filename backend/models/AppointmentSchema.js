import mongoose from "mongoose";


const AppointmentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    reason: String,
    date: Date

},{timestamps:true});

const Appointment = mongoose.model("Appointment",AppointmentSchema);

export default Appointment;