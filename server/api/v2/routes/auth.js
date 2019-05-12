import { Router } from 'express';
import authController from '../controllers/auth';
import validateBody from '../../../middlewares/validate.body';
import validateAuthRoutes from '../../../middlewares/validate.auth.routes';

const authRouter = Router();
const { signup, signin } = authController;

authRouter.post('/signup',
    validateBody(true, 'createUserAccount'),
    validateAuthRoutes.signup,
    signup);

authRouter.post('/signin',
    validateBody(true, 'signin'),
    signin);


export default authRouter;
