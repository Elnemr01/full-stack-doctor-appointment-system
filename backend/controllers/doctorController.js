import Doctor from "../models/DoctorSchema.js";
import ErrorHandler from "../utlis/ErrorHandler.js";
import responseStatus from "../utlis/resStatus.js";


export const addDoctor=ErrorHandler(async(req,res,next)=> {
    const {name,speciality,yearsOfExperience,description}=req.body;

    // add new doctor
    const newDoctor=await Doctor.create({
        name,
        speciality,
        yearsOfExperience,
        description
    })

    const savedDoctor=await newDoctor.save();

    return res.status(201).json({
        status:responseStatus.success,
        message:"Doctor added successfully",
        data:savedDoctor
    })


})

