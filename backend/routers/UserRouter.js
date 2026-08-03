import express from 'express';
import {
    getMe,
    loginUser,
    loginUserWithGithub,
    loginUserWithGoogle,
    logoutUser,
    registerUser,
} from '../controllers/userController.js';
import CheckValidation from '../middlewares/CheckValidation.js';
import { validationLoginArr, validationRegisterArr } from '../utlis/validationArr.js';
import verifyToken from '../middlewares/verifyToken.js';
import passport from '../config/passport.js';

const userRouter = express.Router();

userRouter.post('/register', validationRegisterArr(), CheckValidation, registerUser);
userRouter.post('/login', validationLoginArr(), CheckValidation, loginUser);
userRouter.post('/logout', verifyToken, logoutUser);

// with Github
userRouter.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
userRouter.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: true }),
    loginUserWithGithub
);

// with Google scope
userRouter.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] }));
userRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: true }),
    loginUserWithGoogle
);

userRouter.get('/me', verifyToken, getMe);

export default userRouter;