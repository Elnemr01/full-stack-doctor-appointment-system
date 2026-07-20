import ErrorHandler from "../utlis/ErrorHandler.js";
import User from "../models/UserSchema.js";
import responseStatus from "../utlis/resStatus.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utlis/generateJWT.js";


export const registerUser = ErrorHandler(async (req,res,next)=> {

    const {name,email,password}=req.body;
    const isExist= await User.findOne({email});

    if(isExist){
        res.status(400).json({
            status: responseStatus.failed,
            message: "User Already Exist"
        })
    }

    // hash the password
    const hashedPassword=await bcrypt.hash(password,10);

    // add new user
    const user=await User.create({
        name,
        email,
        password : hashedPassword
    })

    // generate token
    const token=await generateJWT({
        name,
        email,
        id:user._id
    })

    const newUser=await User.findById(user._id).select('-password');

    res.status(201).json({
        status: responseStatus.success,
        message: "User Registered Successfully",
        data: {
            newUser,
            token
        }
    }) 


})


export const loginUser = ErrorHandler(async (req,res,next)=> {
    const {email,password}=req.body;

    const user=await User.findOne({email}).select('-password');

    if(!user){
        res.status(404).json({
            status: responseStatus.failed,
            message: "User Not Found"
        })
    }

    // check the password
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(400).json({
            status: responseStatus.failed,
            message: "Invalid Email "
        })
    }

    // generate token
    const token=await generateJWT({
        name: user.name,
        email: user.email,
        id: user._id
    })

    res.status(200).json({
        status: responseStatus.success,
        message: "User Logged In Successfully",
        data: {
            user,
            token
        }
    })
})