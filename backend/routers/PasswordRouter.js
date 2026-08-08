import express from 'express';
import { verifyEmail , resetPassword} from '../controllers/passwordController.js';

const passwordRouter = express.Router();


passwordRouter.post('/verify-email',verifyEmail);
passwordRouter.post('/reset-password',resetPassword);



export default passwordRouter;