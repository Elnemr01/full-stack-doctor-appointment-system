import ErrorHandler from '../utlis/ErrorHandler.js';
import responseStatus from '../utlis/resStatus.js';
import bcrypt from 'bcryptjs';
import User from '../models/UserSchema.js';
import passport from '../config/passport.js';
import { generateToken, setSessionToken, clearSession, createUserResponse } from '../utlis/session.js';

const createUserSession = async (req, user) => {
    const token = await generateToken({
        name: user.name,
        email: user.email,
        id: user._id,
    });

    setSessionToken(req, token);

    return createUserResponse(user, token);
};

export const registerUser = ErrorHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {
        return res.status(400).json({
            status: responseStatus.failed,
            message: 'User Already Exist',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    await user.save();

    const sessionData = await createUserSession(req, user);

    const newUser = await User.findById(user._id).select('-password');

    return res.status(201).json({
        status: responseStatus.success,
        message: 'User Registered Successfully',
        data: {
            user: newUser,
            ...sessionData,
        },
    });
});


export const loginUser = ErrorHandler(async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (!user) {
            return res.status(403).json({
                status: responseStatus.failed,
                message: info?.message || 'Invalid Email or Password',
            });
        }

        req.login(user, async (loginErr) => {
            if (loginErr) {
                return res.status(500).json({
                    status: responseStatus.error,
                    message: 'Login failed',
                    error: loginErr.message,
                });
            }

            const sessionData = await createUserSession(req, user);

            return res.status(200).json({
                status: responseStatus.success,
                message: 'User Logged In Successfully',
                data: sessionData,
            });
        });
    })(req, res, next);
});

export const loginUserWithGithub = ErrorHandler(async (req, res, next) => {
    await createUserSession(req, req.user);
    res.redirect(`${process.env.FRONTEND_URL}/callback`);
});

export const loginUserWithGoogle = ErrorHandler(async (req, res, next) => {
    await createUserSession(req, req.user);
    res.redirect(`${process.env.FRONTEND_URL}/callback`);
});

export const logoutUser = ErrorHandler(async (req, res, next) => {
    const token = req.session?.token;

    if (!token) {
        return res.status(400).json({
            status: responseStatus.failed,
            message: 'User Not Logged In',
        });
    }

    await clearSession(req);

    return res.status(200).json({
        status: responseStatus.success,
        message: 'User Logged Out Successfully',
    });
});

export const getMe = ErrorHandler(async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: responseStatus.failed,
            message: 'User Not Authenticated',
        });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
        return res.status(404).json({
            status: responseStatus.failed,
            message: 'User Not Found',
        });
    }

    return res.status(200).json({
        status: responseStatus.success,
        message: 'User Fetched Successfully',
        data: { user },
    });
});