import ErrorHandler from "../utlis/ErrorHandler.js";
import User from "../models/UserSchema.js";
import responseStatus from "../utlis/resStatus.js";
import jwt from "jsonwebtoken";

export const verifyToken = ErrorHandler(async (req, res, next) => {
    const token = req.session?.token;

    if (!token) {
        return res.status(401).json({
            status: responseStatus.failed,
            message: "Unauthorized: Please login first"
        });
    }

    const decoded= await jwt.verify(token, process.env.SECRET_KEY);


    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
        req.session.destroy();
        return res.status(401).json({
            status: responseStatus.failed,
            message: "Unauthorized: Please login first"
        });
    }

    req.user = user;
    next();
});

export default verifyToken;