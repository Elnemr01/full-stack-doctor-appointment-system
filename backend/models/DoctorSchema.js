import mongoose from "mongoose";


const DoctorSchema = new mongoose.Schema({

    name: String,
    speciality: String,
    image: {
        type: String,
        default: '/default-pic.jpeg'
    },
    yearsOfExperience: Number,
    description: String,



},{timestamps:true});

const Doctor = mongoose.model("Doctor",DoctorSchema);

export default Doctor;