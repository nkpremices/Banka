import { Router } from 'express';
import authController from '../controllers/auth';
import validateBody from '../../../middlewares/validate.body';
import validateRoutes from '../../../middlewares/validate.routes';

const authRouter = Router();
const { signup, signin } = authController;

authRouter.post('/signup',
    validateBody(true, 'createUserAccount'),
    validateRoutes.signup,
    signup);

authRouter.post('/signin',
    validateBody(true, 'signin'),
    signin);


export default authRouter;
