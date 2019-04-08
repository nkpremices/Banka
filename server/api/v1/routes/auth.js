import { Router } from 'express';
import authController from '../controllers/auth';
import validate from '../../../middlewares/validation';

const authRouter = Router();
const { signup } = authController;

authRouter.post('/signup', validate(true, 'createUserAccount'), signup);


export default authRouter;
