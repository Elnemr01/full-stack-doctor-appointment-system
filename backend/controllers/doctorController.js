import Doctor from "../models/DoctorSchema.js";
import ErrorHandler from "../utlis/ErrorHandler.js";
import responseStatus from "../utlis/resStatus.js";


export const addDoctor=ErrorHandler(async(req,res,next)=> {
    const {name,speciality,yearsOfExperience,description}=req.body;
    const image=req.file?.path;

    // add new doctor
    const newDoctor=await Doctor.create({
        name,
        speciality,
        yearsOfExperience,
        description,
        image
    })

    const savedDoctor=await newDoctor.save();

    return res.status(201).json({
        status:responseStatus.success,
        message:"Doctor added successfully",
        data:savedDoctor
    })


})

export const getAllDoctors=ErrorHandler(async(req,res,next)=> {
    const doctors=await Doctor.find();

    return res.status(200).json({
        status:responseStatus.success,
        message:"Doctors fetched successfully",
        data:doctors
    })
})

export const getDoctorById=ErrorHandler(async(req,res,next)=> {
    const {id}=req.params;

    const doctor=await Doctor.findById(id);

    if(!doctor){
        return res.status(404).json({
            status:responseStatus.failed,
            message:"Doctor not found",
            data:null
        })
    }

    return res.status(200).json({
        status:responseStatus.success,
        message:"Doctor fetched successfully",
        data:doctor
    })
})

