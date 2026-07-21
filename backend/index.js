import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import responseStatus from './utlis/resStatus.js'
import userRouter from "./routers/UserRouter.js";
import session from "express-session";
import MongoStore from "connect-mongodb-session";
import doctorRouter from "./routers/DoctorRouter.js";

configDotenv();

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

connectDB();

// create session store

const SessionDBStore = MongoStore(session);
const store = new SessionDBStore({
    uri: process.env.DATABASE_URL,
    collection: "sessions"
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
}))

// app routing

app.use("/users", userRouter);
app.use("/doctors", doctorRouter);

app.use("*splat", (req, res) => {
    res.status(404).json({
        status: responseStatus.failed,
        message: "Route Not Found"
    })
})

app.use((error,req,res,next)=> {
    res.status(error.statusCode || 500).json({
        status: responseStatus.error,
        message: error.message || "Internal Server Error"
    })
})







app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})



