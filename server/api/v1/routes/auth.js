import { Router } from 'express';
import authController from '../controllers/auth';
import validate from '../../../middlewares/validation';

const authRouter = Router();
const { signup, signin } = authController;

authRouter.post('/signup', validate(true, 'createUserAccount'), signup);
authRouter.post('/signin', validate(true, 'signin'), signin);


export default authRouter;
