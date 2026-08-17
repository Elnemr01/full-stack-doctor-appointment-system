import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/db.js';
import { sessionConfig } from './config/session.js';
import { corsConfig } from './config/cors.js';
import passport from './config/passport.js';
import responseStatus from './utlis/resStatus.js';
import userRouter from './routers/UserRouter.js';
import doctorRouter from './routers/DoctorRouter.js';
import appointmentRouter from './routers/AppointmentRouter.js';
import departmentRouter from './routers/DepartmentRouter.js';
import { rateLimitOpts } from './config/rateLimiting.js';
import { rateLimit } from 'express-rate-limit'
import passwordRouter from './routers/PasswordRouter.js';
import swaggerDoc from './config/swagger/swagger.js';

configDotenv();
connectDB();

const app = express();

app.use(express.json());
app.set('trust proxy', 1);
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(rateLimit(rateLimitOpts));

app.use(passport.initialize());
app.use(passport.session());

swaggerDoc(app);

app.use("/",()=>{
    res.status(200).json({
        status: responseStatus.success,
        message: 'Welcome to the API',
    });
});
app.use('/users', userRouter);
app.use('/password', passwordRouter);
app.use('/doctors', doctorRouter);
app.use('/appointments', appointmentRouter);
app.use('/departments', departmentRouter);

app.use('*splat', (req, res) => {
    res.status(404).json({
        status: responseStatus.failed,
        message: 'Route Not Found',
    });
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: responseStatus.error,
        message: error.message || 'Internal Server Error',
    });
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });

if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}


export default app;