import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validate from '../../../middlewares/validation';

const accountsRouter = Router();
const { createAccount } = accountsController;

accountsRouter
    .post('', validate(true, 'createBankAccount'), createAccount);

export default accountsRouter;
