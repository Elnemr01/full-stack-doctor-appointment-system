import ErrorHandler from '../utlis/ErrorHandler.js';
import responseStatus from '../utlis/resStatus.js';
import User from '../models/UserSchema.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';


export const verifyEmail= ErrorHandler(async (req, res, next) => {

    const {email}=req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: responseStatus.failed,
            message: 'User Not Found',
        });
    }

    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    const emailOptions={
        from:process.env.EMAIL_USER,
        to:user.email,
        subject:'Password Change Request',
        html:`<p>Hello ${user.name},</p><p>We received a request to change your password.
        If you did not make this request, please ignore this email.</p><p>To change your password,
        please click the link below:</p><p><a target="_blank" href="${process.env.FRONTEND_URL}/reset-password?email=${user.email}">
        Reset Password</a></p><p>Best regards,<br>The Team</p>`,
    };

    await transporter.sendMail(emailOptions,(error,info)=>{
        if(error){
            console.error('Error sending email:',error);
        }else{
            console.log('Email sent:',info.response);
        }
    });

    return res.status(200).json({
        status: responseStatus.success,
        message: 'Email Sent Successfully, Please Check Your Email To Change Password',
    });

});

export const resetPassword= ErrorHandler(async (req, res, next) => {

    const {email,newPassword}=req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: responseStatus.failed,
            message: 'User Not Found',
        });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password=hashedPassword;
    await user.save();

    return res.status(200).json({
        status: responseStatus.success,
        message: 'Password Changed Successfully',
    });

});