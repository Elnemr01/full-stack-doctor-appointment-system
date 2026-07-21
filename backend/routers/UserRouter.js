
import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import { validationLoginArr, validationRegisterArr } from "../utlis/validationArr.js";

const userRouter=express.Router();

userRouter.post("/register",validationRegisterArr(),CheckValidation,registerUser);
userRouter.post("/login",validationLoginArr(),CheckValidation,loginUser);
userRouter.post("/logout",logoutUser);


export default userRouter;