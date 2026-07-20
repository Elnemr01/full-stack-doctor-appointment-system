import { validationResult } from "express-validator";
import responseStatus from "../utlis/resStatus.js";


const CheckValidation=(req,res,next)=> {
    const errors= validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ status:responseStatus.error,errors: errors.array() });
    }

    next();

}

export default CheckValidation;