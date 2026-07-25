import ErrorHandler from "../utlis/ErrorHandler.js";
import responseStatus from "../utlis/resStatus.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utlis/generateJWT.js";
import User from "../models/UserSchema.js";


export const registerUser = ErrorHandler(async (req,res,next)=> {

    const {name,email,password,role}=req.body;
    const isExist= await User.findOne({email});

    if(isExist){
        return res.status(400).json({
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
        password : hashedPassword,
        role
    })

    await user.save();

    // generate token and add session id
    const token=await generateJWT({
        id:user._id,
    })

    req.session.token=token;

    const newUser=await User.findById(user._id).select('-password');

    return res.status(201).json({
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

    const findUser=await User.findOne({email});
    if(!findUser){
        return res.status(404).json({
            status: responseStatus.failed,
            message: "User Not Found"
        })
    }
    // check the password
    const isMatch=await bcrypt.compare(password,findUser.password);

    if(!isMatch){
        return res.status(400).json({
            status: responseStatus.failed,
            message: "Invalid Email or Password"
        })
    }
    // generate token and add session id

    const user=await User.findOne({email}).select('-password');

    const token= await generateJWT({
        name: user.name,
        email: user.email,
        id: user._id
    })
    req.session.token=token;


    return res.status(200).json({
        status: responseStatus.success,
        message: "User Logged In Successfully",
        data: {
            user,
            token
        }
    })
})


export const logoutUser = ErrorHandler(async (req,res,next)=> {

    const token = req.session?.token;

    if(!token){
        return res.status(400).json({
            status: responseStatus.failed,
            message: "User Not Logged In"
        })
    }

    // destroy session
    req.session.destroy((err)=> {
        if(err){
            return res.status(500).json({
                status: responseStatus.error,
                message: "Internal Server Error"
            })
        }
    })

    return res.status(200).json({
        status: responseStatus.success,
        message: "User Logged Out Successfully"
    })
})


