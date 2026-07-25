import ErrorHandler from "../utlis/ErrorHandler.js";
import Department from "../models/DepartmentSchema.js";
import responseStatus from "../utlis/resStatus.js";




export const getAllDepartments = ErrorHandler(async(req,res)=> {

    const departments = await Department.find({})

    return res.status(200).json({
        status: responseStatus.success,
        message: "Departments fetched successfully",
        data: {
            departments
        }
    })
})


export const addDepartment = ErrorHandler(async(req,res)=> {
    const { name, description } = req.body;
    const image=req.file.filename
    const department = await Department.create({
        name,
        description,
        image
    })

    return res.status(201).json({
        status: responseStatus.success,
        message: "Department added successfully",
        data: {
            department
        }
    })
})