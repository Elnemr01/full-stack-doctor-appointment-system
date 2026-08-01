
import express from "express";
import { loginUser, loginUserWithPassport, logoutUser, registerUser } from "../controllers/userController.js";
import CheckValidation from "../middlewares/CheckValidation.js";
import { validationLoginArr, validationRegisterArr } from "../utlis/validationArr.js";
import verifyToken from "../middlewares/verifyToken.js";


const userRouter=express.Router();

userRouter.post("/register",validationRegisterArr(),CheckValidation,registerUser);
// userRouter.post("/login",validationLoginArr(),CheckValidation,loginUser);
userRouter.post("/logout",verifyToken,logoutUser);

// with passport
userRouter.post("/login", validationLoginArr(), CheckValidation, loginUserWithPassport);


export default userRouter;